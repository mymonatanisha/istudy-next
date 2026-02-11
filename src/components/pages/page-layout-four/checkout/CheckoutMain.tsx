"use client"
import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import BillingDetailsForm from '@/form/checkout/billing-details-form';
import React, { useState, useEffect } from 'react';
import CouponCode from '../../../../form/checkout/coupon-code';
import CustomerLogin from '@/form/checkout/customer-login-form';
import CheckoutPayment from './CheckoutPayment';
import SlideToggleTwo from '@/utils/SlideToggleTwo';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'sonner';
import useGlobalContext from '@/hooks/useContexts';
import { useSearchParams, useRouter } from 'next/navigation';

interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

const CheckoutMain = () => {
    const { toggleOpen, isOpen } = useGlobalContext();
    const [isCouponOpen, setIsCouponOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseId = searchParams.get('courseId') || '';
    
    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [transactionId, setTransactionId] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    
    // Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    // Pre-fill form data from user profile
                    if (data.user) {
                        setFormData(prev => ({
                            ...prev,
                            fullName: data.user.name || '',
                            phone: data.user.phone || '',
                            email: data.user.email || '',
                            password: '', // Keep empty for logged-in users
                        }));
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setIsLoadingUser(false);
            }
        };
        
        fetchUser();
    }, []); // Empty dependency array is correct - only fetch once on mount
    
    //const [shippingCost, setShippingCost] = useState(0);
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );
    const totalPrice = cartProducts.reduce((total, product) => {
        if (typeof product.price === 'number' && product.price !== 0) {
            return total + (product.price ?? 0) * (product.quantity ?? 0);
        }
        return total;
    }, 0);

    const handlePlaceOrder = async () => {
        // Validation
        if (!formData.fullName || !formData.phone || !formData.email) {
            toast.error("Please fill in all billing details");
            return;
        }

        // Validate password for non-logged-in users
        if (!user && !formData.password) {
            toast.error("Password is required");
            return;
        }

        // Validate password length
        if (!user && formData.password && formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        if (!selectedPaymentMethod) {
            toast.error("Please select a payment method");
            return;
        }

        if (!transactionId || transactionId.trim() === '') {
            toast.error("Transaction ID is required");
            return;
        }

        if (!courseId) {
            toast.error("Course ID is missing. Please add ?courseId=XX to the URL");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password, // Include password for guest users
                    courseId: courseId,
                    paymentMethod: selectedPaymentMethod,
                    transactionId: transactionId,
                    userId: user ? user.id : null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Your order has been placed successfully! 🎉");
                // Optional: Redirect to thank-you page or clear form
                setTimeout(() => {
                    router.push(`/thank-you?orderId=${encodeURIComponent(data.orderId)}`);
                }, 1500);
            } else {
                toast.error(data.error || "Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Order submission error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Breadcrumbs breadcrumbTitle='Checkout' />
            {/* -- checkout area start -- */}
            <section className="bd-shop-details-area section-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            {!isLoadingUser && (
                                <>
                                    {!user ? (
                                        <div className="checkout-verify mb-30">
                                            <div className="checkout-verify-item">
                                                <p className="checkout-verify-reveal">Returning customer?
                                                    <button onClick={toggleOpen} type="button" className="checkout-login-form-reveal-btn">Click here to login</button>
                                                </p>
                                                <SlideToggleTwo>
                                                    <div className={`return-customer ${isOpen ? 'd-block' : 'd-none'}`}>
                                                        <CustomerLogin />
                                                    </div>
                                                </SlideToggleTwo>
                                            </div>
                                            <div className="checkout-verify-item">
                                                <p className="checkout-verify-reveal">Have a coupon?
                                                    <button onClick={() => setIsCouponOpen(!isCouponOpen)}
                                                        type="button" className="checkout-coupon-form-reveal-btn">Click here to enter your code
                                                    </button>
                                                </p>
                                                <AnimatePresence>
                                                    {isCouponOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.6, ease: "easeInOut" }}>
                                                            <div className={`return-customer ${isCouponOpen ? 'd-block' : 'd-none'}`}>
                                                                <CouponCode />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="checkout-verify mb-30">
                                            <div className="alert alert-info d-flex align-items-center">
                                                <i className="fas fa-user-check me-2"></i>
                                                <span>Logged in as <strong>{user.email}</strong></span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="checkout-bill-area">
                                <h3 className="checkout-bill-title">Billing Details</h3>
                                <div className="checkout-bill-form">
                                    <BillingDetailsForm formData={formData} setFormData={setFormData} isLoggedIn={!!user} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            {/* -- checkout place order -- */}
                            <div className="checkout-place sidebar-right sidebar-sticky">
                                <h3 className="checkout-place-title mb-20">Your Order</h3>
                                <div className="order-info-list">
                                    <ul>
                                        {/* -- header -- */}
                                        <li className="order-info-list-header">
                                            <h4>Product</h4>
                                            <h4>Total</h4>
                                        </li>
                                        {/* -- item list -- */}
                                        {cartProducts.map((item) => (
                                            <li className="order-info-list-desc" key={item.id}>
                                                <p>{item?.title}<span> x {item?.quantity}</span></p>
                                                <span>{item?.quantity && item?.price ? `${(Number(item.quantity) * Number(item.price)).toFixed(2)}` : 'N/A'}</span>
                                            </li>
                                        ))}
                                        
                                        {/*

                                        <li className="order-info-list-subtotal">
                                            <span>Subtotal</span>
                                            <span>{totalPrice.toFixed(2)}</span>
                                        </li>
                                         -- shipping -- 
                                        <li className="order-info-list-shipping">
                                            <span>Shipping</span>
                                            <div className="order-info-list-shipping-item d-flex flex-column align-items-start">
                                                <span>
                                                    <input onClick={() => setShippingCost(20)} id="flat_rate" type="radio" name="shipping" />
                                                    <label htmlFor="flat_rate">Flat rate: <span>20.00</span></label>
                                                </span>
                                                <span>
                                                    <input onClick={() => setShippingCost(25)} id="local_pickup" type="radio" name="shipping" />
                                                    <label htmlFor="local_pickup">Local pickup: <span>25.00</span></label>
                                                </span>
                                                <span>
                                                    <input onClick={() => setShippingCost(0)} id="free_shipping" type="radio" name="shipping" />
                                                    <label htmlFor="free_shipping">Free shipping</label>
                                                </span>
                                            </div>
                                        </li>
                                        */}

                                        {/* -- total -- */}
                                        <li className="order-info-list-total">
                                            <span>Total</span>
                                            <span>{(totalPrice ).toFixed(2)}</span>
                                        </li>
                                    </ul>
                                </div>
                                <CheckoutPayment 
                                    selectedPaymentMethod={selectedPaymentMethod} 
                                    setSelectedPaymentMethod={setSelectedPaymentMethod} 
                                />
                                <div className="checkout-agree">
                                <div className="checkout-input mb-0">
                                <label>Transaction ID <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="Transaction ID or Reference Number" 
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    required
                                />
                                </div>
                                </div>
                                <div className="checkout-btn-wrapper">
                                    <button 
                                        onClick={handlePlaceOrder} 
                                        type="submit" 
                                        className="bd-btn btn-outline-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Processing...' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* -- checkout area end -- */}
        </>
    );
};

export default CheckoutMain;