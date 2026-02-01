import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
//import { countryData } from '@/data/dropdown-data';
//import NiceSelect from '@/components/elements/nice-select/NiceSelect';
const BillingDetailsForm = () => {
    const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
   // const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
    //const selectHandler = () => { }
    return (
        <>
            <form action="#">
                <div className="checkout-bill-inner">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="checkout-input">
                                <label>Full Name <span>*</span></label>
                                <input type="text" placeholder="Full Name" />
                            </div>
                        </div>
                        
                        
                        <div className="col-md-12">
                            <div className="checkout-input">
                                <label>Phone <span>*</span></label>
                                <input type="text" placeholder="Your whatsapp number" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="checkout-input">
                                <label>Email address <span>*</span></label>
                                <input type="email" placeholder="Email address" />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="checkout-option-wrapper create-acc">
                                <div className="checkout-option mb-15">
                                    <input id="cbox" type="checkbox" />
                                    <label onClick={() => setIsPasswordOpen(!isPasswordOpen)} htmlFor="cbox">Create an account?</label>
                                </div>
                                <AnimatePresence>
                                    {isPasswordOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className='overflow-hidden'
                                        >
                                            <div className={`checkout-input create-account ${isPasswordOpen ? 'd-block' : 'd-none'}`}>
                                                <p>Create an account by entering the information below. If you
                                                    are a
                                                    returning
                                                    customer please login at the top of the page.</p>
                                                <label>Account Password <span>*</span></label>
                                                <input type="password" placeholder="Password" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                      
                        <div className="col-md-12">
                          
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
};

export default BillingDetailsForm;