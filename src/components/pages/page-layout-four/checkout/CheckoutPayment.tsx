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

const CheckoutPayment = () => {
    const [isBankTransferOpen, setIsBankTransferOpen] = useState<boolean>(false);
    const [isBkashOpen, setIsBkashOpen] = useState<boolean>(false);
    const [isNagadOpen, setIsNagadOpen] = useState<boolean>(false);
    const [isRocketOpen, setIsRocketOpen] = useState<boolean>(false);
    const [isUpayOpen, setIsUpayOpen] = useState<boolean>(false);

    return (
        <>
            <div className="checkout-payment">
                <div className="checkout-payment-item">
                    <input type="radio" id="back_transfer" name="payment" />
                    <label onClick={() => setIsBankTransferOpen(!isBankTransferOpen)} htmlFor="back_transfer" data-bs-toggle="direct-bank-transfer">Direct Bank
                        Transfer <Image src={paymentOptionImgSC} alt="image" /> </label>
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
                                    <p>Please make payment directly into our bank account and use payment reference as the Order ID. <br /><br />
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
                    <input type="radio" id="bKash_transfer" name="payment" />
                 
                    <label onClick={() => setIsBkashOpen(!isBkashOpen)} htmlFor="bKash_transfer" data-bs-toggle="direct-bank-transfer">bKash Personal
                        Transfer <Image src={paymentOptionImgbKash} alt="image" /> </label>
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
                                    <p>To complete your purchase, please Send Money to our bKash account. Once the transaction is successful, enter Transaction ID in the box below and click Place Order button. <br /><br />
                                    <strong>bKash Personal Number:</strong>01721186833<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="checkout-payment-item paypal-payment">
                    <input type="radio" id="nagad_transfer" name="payment" />
                     <label onClick={() => setIsNagadOpen(!isNagadOpen)} htmlFor="nagad_transfer" data-bs-toggle="direct-bank-transfer">Nagad Personal
                        Transfer <Image src={paymentOptionImgNagad} alt="image" /> </label>



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
                                    <p>To complete your purchase, please Send Money to our Nagad account. Once the transaction is successful, enter Transaction ID in the box below and click Place Order button. <br /><br />
                                    <strong>Nagad Personal Number:</strong>01721186833<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>   


                </div>

                <div className="checkout-payment-item paypal-payment">
                    <input type="radio" id="rocket_transfer" name="payment" />
                    <label onClick={() => setIsRocketOpen(!isRocketOpen)} htmlFor="rocket_transfer" data-bs-toggle="direct-bank-transfer">Rocket Personal
                        Transfer <Image src={paymentOptionImgRocket} alt="image" /> </label>
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
                                    <p>To complete purchase, please Send Money to our Rocket account. Once the transaction is successful, enter Transaction ID in the box below and click Place Order button. <br /><br />
                                    <strong>Rocket Personal Number:</strong>017211868331<br />
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="checkout-payment-item paypal-payment">
                    <input type="radio" id="upay_transfer" name="payment" />
                    <label onClick={() => setIsUpayOpen(!isUpayOpen)} htmlFor="upay_transfer" data-bs-toggle="direct-bank-transfer">uPay Personal <Image src={paymentOptionImgUpay} alt="image" /> </label>
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
                                    <p>To complete purchase, please Send Money to our uPay account. Once the transaction is successful, enter Transaction ID in the box below and click Place Order button. <br /><br />
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