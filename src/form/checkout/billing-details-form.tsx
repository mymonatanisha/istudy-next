import React from 'react';
//import { countryData } from '@/data/dropdown-data';
//import NiceSelect from '@/components/elements/nice-select/NiceSelect';

interface BillingDetailsFormProps {
    formData: {
        fullName: string;
        phone: string;
        email: string;
        password: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        fullName: string;
        phone: string;
        email: string;
        password: string;
    }>>;
    isLoggedIn: boolean;
}

const BillingDetailsForm = ({ formData, setFormData, isLoggedIn }: BillingDetailsFormProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <form action="#">
                <div className="checkout-bill-inner">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="checkout-input">
                                <label>Full Name <span>*</span></label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    placeholder="Full Name" 
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        
                        <div className="col-md-12">
                            <div className="checkout-input">
                                <label>Phone <span>*</span></label>
                                <input 
                                    type="text" 
                                    name="phone"
                                    placeholder="Your whatsapp number" 
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="checkout-input">
                                <label>Email address <span>*</span></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email address" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {!isLoggedIn && (
                            <div className="col-md-12">
                                <div className="checkout-input">
                                    <label>Password <span>*</span></label>
                                    <input 
                                        type="password" 
                                        name="password"
                                        placeholder="Create a password for your account" 
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        minLength={8}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                      
                        <div className="col-md-12">
                          
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
};

export default BillingDetailsForm;