"use client";
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';
import { useRouter } from 'next/navigation';

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    if (loading) return;
    setLoading(true);
    setServerError(null);

    try {
      const payload = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Login failed";
        try {
          const body: { error?: string } = await res.json();
          msg = body?.error ?? msg;
        } catch {
          /* ignore parse errors */
        }
        setServerError(msg);
        setLoading(false);
        return;
      }

      // Redirect to Student Dashboard after successful login
      router.replace("/student-dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setServerError(msg);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
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
            />
            <ErrorMsg error={errors.email?.message} />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-input-box mb-20">
          <div className="form-input-title">
            <label htmlFor="password">Password <span>*</span></label>
          </div>
          <div className="form-input">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              id="password"
              type="password"
              placeholder="Your Password"
              autoComplete="true"
            />
            <ErrorMsg error={errors.password?.message} />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="d-flex-between flex-wrap mb-20">
          <div className="checkout-option">
            <input id="rememberMe" type="checkbox" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="sign-forgot underline">
            <Link href="/forgot" className="sign-link">Forgot Password?</Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bd-sign-btn">
          <button type="submit" className="bd-btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {serverError && <ErrorMsg error={serverError} />}
        </div>
      </form>
    </>
  );
};

export default SignInForm;