"use client";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResetFormData = {
    password: string;
    confirmPassword: string;
};

interface ResetFormProps {
    token: string;
}

const ResetForm = ({ token }: ResetFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetFormData>();

    const password = watch("password");

    const onSubmit = async (data: ResetFormData) => {
        setLoading(true);
        setMessage("");
        setIsError(false);
        
        try {
            const response = await fetch('/api/auth/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    token,
                    newPassword: data.password 
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Password reset successful! Redirecting...");
                setIsError(false);
                toast.success("Password reset successful!");
                
                // Redirect to sign-in page after 1.5 seconds
                setTimeout(() => {
                    router.push("/sign-in");
                }, 1500);
            } else {
                setMessage(result.error || "Something went wrong");
                setIsError(true);
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            console.error('Reset password error:', error);
            setMessage("Network error. Please try again.");
            setIsError(true);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Password Field */}
                <div className="form-input-box mb-20">
                    <div className="form-input-title">
                        <label htmlFor="password">New Password <span>*</span></label>
                    </div>
                    <div className="form-input">
                        <input
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })}
                            id="password"
                            type="password"
                            placeholder="New Password"
                            disabled={loading}
                        />
                        <ErrorMsg error={errors.password?.message} />
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div className="form-input-box mb-20">
                    <div className="form-input-title">
                        <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                    </div>
                    <div className="form-input">
                        <input
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            disabled={loading}
                        />
                        <ErrorMsg error={errors.confirmPassword?.message} />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="bd-sign-btn">
                    <button className="bd-btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                    {message && <div className={`mt-3 text-center ${isError ? "text-danger" : "text-success"}`}>{message}</div>}
                </div>
            </form>
        </>
    );
};

export default ResetForm;
