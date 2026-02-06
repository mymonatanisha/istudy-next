"use client";
import React from 'react';
import ForgotPasswordBg from '../../../../../public/assets/images/contact/forgot-password-bg.webp';
import ResetArea from '@/components/pages/page-layout-five/reset/ResetArea';
import { useSearchParams } from 'next/navigation';

const Reset = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    if (!token) {
        return (
            <section className="bd-authentication-cover-main ">
                <div className="row h100vh mx-0">
                    <div className="col-xxl-6 col-xl-5 col-lg-12 d-xl-block d-none px-0">
                        <div className="bd-authentication-cover overflow-hidden" style={{ backgroundImage: `url(${ForgotPasswordBg.src})` }}>
                            <div className="bd-authentication-cover-content d-flex-center d-none">
                                <div className="bd-section-title-wrapper">
                                    <h2 className="bd-section-title mb-20">Set New Password</h2>
                                    <p className="bd-section-paragraph">Enter your new password to regain access to your account.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-7">
                        <div className="row justify-content-center align-items-center h100p">
                            <div className="col-xxl-7 col-xl-9 col-lg-6 col-md-6 col-sm-8 col-12">
                                <div className="bd-authentication-form-wrapper">
                                    <h3 className="title mb-10 text-danger">Invalid Reset Link</h3>
                                    <p className="subtitle">The password reset link is missing or invalid. Please request a new reset link.</p>
                                    <a href="/forgot" className="bd-btn btn-primary w-100 mt-3">Back to Forgot Password</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* -- reset password form area start -- */}
            <section className="bd-authentication-cover-main ">
                <div className="row h100vh mx-0">
                    <div className="col-xxl-6 col-xl-5 col-lg-12 d-xl-block d-none px-0">
                        <div className="bd-authentication-cover overflow-hidden" style={{ backgroundImage: `url(${ForgotPasswordBg.src})` }}>
                            <div className="bd-authentication-cover-content d-flex-center d-none">
                                <div className="bd-section-title-wrapper">
                                    <h2 className="bd-section-title mb-20">Set New Password</h2>
                                    <p className="bd-section-paragraph">Enter your new password to regain access to your account.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ResetArea token={token} />
                </div>
            </section>
            {/* -- reset password form area end -- */}
        </>
    );
};

export default Reset;
