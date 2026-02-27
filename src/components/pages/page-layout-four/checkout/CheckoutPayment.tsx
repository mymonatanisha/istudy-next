"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import paymentOptionImgUpay from '../../../../../public/assets/images/shape/payment-option_Upay.webp';
import paymentOptionImgSC from '../../../../../public/assets/images/shape/payment-option_sc.webp';
import paymentOptionImgbKash from '../../../../../public/assets/images/shape/payment-option_bkash.webp';
import paymentOptionImgNagad from '../../../../../public/assets/images/shape/payment-option_Nagad.webp';
import paymentOptionImgRocket from '../../../../../public/assets/images/shape/payment-option_Rocket.webp';

//import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

interface CheckoutPaymentProps {
    selectedPaymentMethod: string;
    setSelectedPaymentMethod: (method: string) => void;
}

const CheckoutPayment = ({ selectedPaymentMethod, setSelectedPaymentMethod }: CheckoutPaymentProps) => {
    const [isBankTransferOpen, setIsBankTransferOpen] = useState<boolean>(false);
    const [isBkashOpen, setIsBkashOpen] = useState<boolean>(false);
    const [isNagadOpen, setIsNagadOpen] = useState<boolean>(false);
    const [isRocketOpen, setIsRocketOpen] = useState<boolean>(false);
    const [isUpayOpen, setIsUpayOpen] = useState<boolean>(false);

    const handlePaymentSelect = (method: string, toggleFunc: (value: boolean) => void, currentState: boolean) => {
        setSelectedPaymentMethod(method);
        toggleFunc(!currentState);
    };

    return (
        <>
            <div className="checkout-payment">
                <div className="checkout-payment-item">
                    <input 
                        type="radio" 
                        id="back_transfer" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'bank_transfer'}
                        onChange={() => handlePaymentSelect('bank_transfer', setIsBankTransferOpen, isBankTransferOpen)}
                    />
                    <label onClick={() => handlePaymentSelect('bank_transfer', setIsBankTransferOpen, isBankTransferOpen)} htmlFor="back_transfer" data-bs-toggle="direct-bank-transfer">Bank Transfer (Manual Payment)
                        <Image src={paymentOptionImgSC} alt="image" /> </label>
                    <AnimatePresence>
                        {isBankTransferOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='overflow-hidden'
                            >
                                <div className={`checkout-payment-desc direct-bank-transfer ${isBankTransferOpen ? 'd-block' : 'd-none'}`}>
                                    
                                    <strong>Bank Name:</strong> Standard Chartered Bank<br />
                                    <strong>Account Name:</strong> MOHAMMAD ENAMUL HUQ<br />
                                    <strong>Account Number:</strong> 18655476301<br />
                                    <strong>Branch Name: </strong> Gulshan-1 Branch, Dhaka<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                <div className="checkout-payment-item paypal-payment">
                    <input 
                        type="radio" 
                        id="bKash_transfer" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'bkash'}
                        onChange={() => handlePaymentSelect('bkash', setIsBkashOpen, isBkashOpen)}
                    />
                 
                    <label onClick={() => handlePaymentSelect('bkash', setIsBkashOpen, isBkashOpen)} htmlFor="bKash_transfer" data-bs-toggle="direct-bank-transfer">bKash (Send Money) <Image src={paymentOptionImgbKash} alt="image" /> </label>
                    <AnimatePresence>
                        {isBkashOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='overflow-hidden'
                            >
                                <div className={`checkout-payment-desc direct-bank-transfer ${isBkashOpen ? 'd-block' : 'd-none'}`}>
                                    
                                    <strong>bKash Personal Number:</strong>01721186833<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="checkout-payment-item paypal-payment">
                    <input 
                        type="radio" 
                        id="nagad_transfer" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'nagad'}
                        onChange={() => handlePaymentSelect('nagad', setIsNagadOpen, isNagadOpen)}
                    />
                     <label onClick={() => handlePaymentSelect('nagad', setIsNagadOpen, isNagadOpen)} htmlFor="nagad_transfer" data-bs-toggle="direct-bank-transfer"> Nagad (Send Money) <Image src={paymentOptionImgNagad} alt="image" /> </label>



                     <AnimatePresence>
                        {isNagadOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='overflow-hidden'
                            >
                                <div className={`checkout-payment-desc direct-bank-transfer ${isNagadOpen ? 'd-block' : 'd-none'}`}>
                                
                                    <strong>Nagad Personal Number:</strong>01721186833<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>   


                </div>

                <div className="checkout-payment-item paypal-payment">
                    <input 
                        type="radio" 
                        id="rocket_transfer" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'rocket'}
                        onChange={() => handlePaymentSelect('rocket', setIsRocketOpen, isRocketOpen)}
                    />
                    <label onClick={() => handlePaymentSelect('rocket', setIsRocketOpen, isRocketOpen)} htmlFor="rocket_transfer" data-bs-toggle="direct-bank-transfer">Rocket (Send Money) <Image src={paymentOptionImgRocket} alt="image" /> </label>
                    <AnimatePresence>
                        {isRocketOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='overflow-hidden'
                            >
                                <div className={`checkout-payment-desc direct-bank-transfer ${isRocketOpen ? 'd-block' : 'd-none'}`}>
                               
                                    <strong>Rocket Personal Number:</strong>017211868331<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="checkout-payment-item paypal-payment">
                    <input 
                        type="radio" 
                        id="upay_transfer" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'upay'}
                        onChange={() => handlePaymentSelect('upay', setIsUpayOpen, isUpayOpen)}
                    />
                    <label onClick={() => handlePaymentSelect('upay', setIsUpayOpen, isUpayOpen)} htmlFor="upay_transfer" data-bs-toggle="direct-bank-transfer">uPay (Send Money) <Image src={paymentOptionImgUpay} alt="image" /> </label>
                    <AnimatePresence>
                        {isUpayOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='overflow-hidden'
                            >
                                <div className={`checkout-payment-desc direct-bank-transfer ${isUpayOpen ? 'd-block' : 'd-none'}`}>
                                   
                                    <strong>uPay Personal Number:</strong>01721186833<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                

            </div>
        </>
    );
};

export default CheckoutPayment;
