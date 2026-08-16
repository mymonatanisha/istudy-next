 "use client"
 import Image from 'next/image';
 import React from 'react';
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

    const handlePaymentSelect = (method: string) => {
         setSelectedPaymentMethod(method);
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
                        onChange={() => handlePaymentSelect('bank_transfer')}
                     />

                    <label htmlFor="back_transfer" data-bs-toggle="direct-bank-transfer">Bank Transfer (Manual Payment)
                         <Image src={paymentOptionImgSC} alt="image" /> </label>
                     <AnimatePresence>
                        {selectedPaymentMethod === 'bank_transfer' && (
                             <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeInOut" }}
                                 className='overflow-hidden'
                             >
                                <div className={`checkout-payment-desc direct-bank-transfer ${selectedPaymentMethod === 'bank_transfer' ? 'd-block' : 'd-none'}`}>
                                     
                                     <strong>Bank Name:</strong> Standard Chartered Bank<br />
                                     <strong>Account Name:</strong> MOHAMMAD ENAMUL HUQ<br />
                                     <strong>Account Number:</strong> 18655476301<br />
                                     <strong>Branch Name: </strong> Gulshan-1 Branch, Dhaka<br />
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
                        onChange={() => handlePaymentSelect('bkash')}
                     />
                  
                    <label htmlFor="bKash_transfer" data-bs-toggle="direct-bank-transfer">bKash (Send Money) <Image src={paymentOptionImgbKash} alt="image" /> </label>
                     <AnimatePresence>
                        {selectedPaymentMethod === 'bkash' && (
                             <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeInOut" }}
                                 className='overflow-hidden'
                             >
                                <div className={`checkout-payment-desc direct-bank-transfer ${selectedPaymentMethod === 'bkash' ? 'd-block' : 'd-none'}`}>
                                     
                                     <strong>bKash Personal Number:</strong>01721186833<br />
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
                        onChange={() => handlePaymentSelect('nagad')}
                     />
                     <label htmlFor="nagad_transfer" data-bs-toggle="direct-bank-transfer"> Nagad (Send Money) <Image src={paymentOptionImgNagad} alt="image" /> </label>
 
 
 
                      <AnimatePresence>
                        {selectedPaymentMethod === 'nagad' && (
                             <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeInOut" }}
                                 className='overflow-hidden'
                             >
                               <div className={`checkout-payment-desc direct-bank-transfer ${selectedPaymentMethod === 'nagad' ? 'd-block' : 'd-none'}`}>
                                 
                                     <strong>Nagad Personal Number:</strong>01721186833<br />
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
                        onChange={() => handlePaymentSelect('rocket')}
                     />
                    <label htmlFor="rocket_transfer" data-bs-toggle="direct-bank-transfer">Rocket (Send Money) <Image src={paymentOptionImgRocket} alt="image" /> </label>
                     <AnimatePresence>
                        {selectedPaymentMethod === 'rocket' && (
                             <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeInOut" }}
                                 className='overflow-hidden'
                             >
                                <div className={`checkout-payment-desc direct-bank-transfer ${selectedPaymentMethod === 'rocket' ? 'd-block' : 'd-none'}`}>
                                
                                     <strong>Rocket Personal Number:</strong>017211868331<br />
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
                        onChange={() => handlePaymentSelect('upay')}
                     />
                    <label htmlFor="upay_transfer" data-bs-toggle="direct-bank-transfer">uPay (Send Money) <Image src={paymentOptionImgUpay} alt="image" /> </label>
                     <AnimatePresence>
                        {selectedPaymentMethod === 'upay' && (
                             <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeInOut" }}
                                 className='overflow-hidden'
                             >
                                <div className={`checkout-payment-desc direct-bank-transfer ${selectedPaymentMethod === 'upay' ? 'd-block' : 'd-none'}`}>
                                    
                                     <strong>uPay Personal Number:</strong>01721186833<br />
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
