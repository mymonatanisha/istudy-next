"use client"
import Breadcrumbs from '@/components/common/Breadcrumb/Breadcrumbs';
import Wrapper from '@/layout/DefaultWrapper';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ThankYouPage = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <Wrapper>
            <main>
                <Breadcrumbs breadcrumbTitle='Thank You' />
                <section className="bd-contact-area section-space">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="contact-form text-center">
                                    <div className="mb-40">
                                        <div className="mb-30">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="100" 
                                                height="100" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                                className="text-success mx-auto"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                        </div>
                                        <h2 className="contact-form-title mb-20">Thank You for Your Order! 🎉</h2>
                                        <p className="mb-20">
                                            Your order has been successfully placed and is now being processed.
                                        </p>
                                        {orderId && (
                                            <div className="alert alert-success" role="alert">
                                                <strong>Order ID:</strong> {orderId}
                                            </div>
                                        )}
                                        <p className="mb-30">
                                            We will review your payment and get back to you shortly via email. 
                                            Please check your inbox for order confirmation and next steps.
                                        </p>
                                        <div className="d-flex gap-3 justify-content-center">
                                            <Link href="/" className="bd-btn btn-primary">
                                                <span className="bd-btn-inner">
                                                    <span className="bd-btn-normal">Back to Home</span>
                                                    <span className="bd-btn-hover">Back to Home</span>
                                                </span>
                                            </Link>
                                            <Link href="/courses" className="bd-btn btn-outline-primary">
                                                <span className="bd-btn-inner">
                                                    <span className="bd-btn-normal">Browse More Courses</span>
                                                    <span className="bd-btn-hover">Browse More Courses</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Wrapper>
    );
};

export default ThankYouPage;
