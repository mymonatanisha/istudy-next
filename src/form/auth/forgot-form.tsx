"use client";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import { toast } from "sonner";

type ForgotFormData = {
    email: string;
};

const ForgotForm = () => {
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormData>();

    const onSubmit = async (data: ForgotFormData) => {
        setLoading(true);
        setMessage("");
        
        try {
            const response = await fetch('/api/auth/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("If your email exists, a reset link has been sent!");
                toast.success("Reset link sent! Check your email.");
            } else {
                setMessage(result.error || "Something went wrong");
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            setMessage("Network error. Please try again.");
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="form-input-box mb-20">
                    <div className="form-input-title">
                        <label htmlFor="emailAddress">Email Address <span>*</span></label>
                    </div>
                    <div className="form-input">
                        <input
                            {...register("email", { 
                                required: "Email is required", 
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
                            })}
                            id="emailAddress"
                            type="email"
                            placeholder="Email Address"
                            disabled={loading}
                        />
                        <ErrorMsg error={errors.email?.message} />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="bd-sign-btn">
                    <button className="bd-btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Reset Password"}
                    </button>
                    {message && <div className={`mt-3 text-center ${message.includes("error") || message.includes("wrong") ? "text-danger" : "text-success"}`}>{message}</div>}
                </div>
            </form>
        </>
    );
};

export default ForgotForm;
