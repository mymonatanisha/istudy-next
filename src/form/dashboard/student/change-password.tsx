import ErrorMsg from '@/form/auth/ErrorMsg';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = {
    studentCurrentPassword: string;
    studentNewPassword: string;
    studentConfirmPassword: string;
};

const ChangePasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }, 
        reset
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: data.studentCurrentPassword,
                    newPassword: data.studentNewPassword,
                    confirmPassword: data.studentConfirmPassword,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Password updated successfully');
                reset();
            } else {
                toast.error(result.error || 'Failed to update password');
            }
        } catch (error) {
            console.error('Password change error:', error);
            toast.error('An error occurred while changing password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="row g-30">
                <div className="col-lg-12">
                    <div className="form-group">
                        <input
                            {...register("studentCurrentPassword", { required: "Current Password is required" })}
                            id="studentPassword"
                            type="password"
                            placeholder="Current Password"
                            disabled={isSubmitting}
                        />
                        <ErrorMsg error={errors?.studentCurrentPassword?.message} />
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="form-group">
                        <input
                            {...register("studentNewPassword", {
                                required: "New Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                            })}
                            id="studentNewPassword"
                            type="password"
                            placeholder="New Password"
                            disabled={isSubmitting}
                        />
                        <ErrorMsg error={errors?.studentNewPassword?.message} />
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="form-group">
                        <input
                            {...register("studentConfirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === watch("studentNewPassword") || "Passwords do not match",
                            })}
                            id="studentConfirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            disabled={isSubmitting}
                        />
                        <ErrorMsg error={errors?.studentConfirmPassword?.message} />
                    </div>
                </div>

                <div className="col-lg-12">
                    <button type="submit" className="bd-btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ChangePasswordForm;