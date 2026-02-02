"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMsg from './auth/ErrorMsg';

interface FormData {
    firstName: string;
    email: string;
    subject?: string;
    message: string;
    privacyPolicy: boolean;
}

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const onSubmit = async (data: FormData) => {
        if (!data.privacyPolicy) {
            setSubmitStatus({
                type: 'error',
                message: 'Please accept the privacy policy to continue',
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: data.firstName,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: result.message || 'Message sent successfully!',
                });
                reset();
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: result.error || 'Failed to send message',
                });
            }
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row gy-30">
                {/* Status Message */}
                {submitStatus.type && (
                    <div className="col-md-12">
                        <div
                            className={`alert ${
                                submitStatus.type === 'success'
                                    ? 'alert-success'
                                    : 'alert-danger'
                            }`}
                            role="alert"
                        >
                            {submitStatus.message}
                        </div>
                    </div>
                )}

                {/* Full Name */}
                <div className="col-md-12">
                    <div className="form-input-box">
                        <div className="form-input-title">
                            <label htmlFor="firstName">Full Name<span>*</span></label>
                        </div>
                        <div className="form-input">
                            <input
                                {...register("firstName", { required: "Full Name is required" })}
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                disabled={isSubmitting}
                            />
                              <ErrorMsg error={errors?.firstName?.message} />
                        </div>
                    </div>
                </div>

                {/* Email Address */}
                <div className="col-md-12">
                    <div className="form-input-box">
                        <div className="form-input-title">
                            <label htmlFor="email">Email Address<span>*</span></label>
                        </div>
                        <div className="form-input">
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                disabled={isSubmitting}
                            />
                            <ErrorMsg error={errors?.email?.message} />
                        </div>
                    </div>
                </div>

                {/* Subject (Optional) */}
                <div className="col-md-12">
                    <div className="form-input-box">
                        <div className="form-input-title">
                            <label htmlFor="subject">Subject</label>
                        </div>
                        <div className="form-input">
                            <input 
                                {...register("subject")} 
                                id="subject" 
                                type="text" 
                                placeholder="Subject"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="col-xxl-12">
                    <div className="form-input-box mb-15">
                        <div className="form-input-title">
                            <label htmlFor="message">Message<span>*</span></label>
                        </div>
                        <div className="form-input">
                            <textarea
                                {...register("message", { required: "Message is required" })}
                                id="message"
                                placeholder="Message"
                                disabled={isSubmitting}
                            ></textarea>
                            <ErrorMsg error={errors?.message?.message} />
                        </div>
                    </div>

                    {/* Privacy Policy Checkbox */}
                    <div className="checkbox-option">
                        <input 
                            {...register("privacyPolicy", { required: true })}
                            id="course-check-1" 
                            type="checkbox"
                            disabled={isSubmitting}
                        />
                        <label htmlFor="course-check-1">
                            You agree to our friendly{" "}
                            <span className="text-border-highlights">
                                <Link href="/privacy-policy">privacy policy</Link>
                                <span className="theme-black h-1px bottom-0"></span>
                            </span>
                            .
                        </label>
                        {errors?.privacyPolicy && (
                            <ErrorMsg error="You must accept the privacy policy" />
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-xxl-12">
                    <div className="bd-contact-form-btn">
                        <button 
                            className="bd-btn btn-primary w-100" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
