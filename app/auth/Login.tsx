import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "@/query/Auth.queries";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {

  const inputRef = useRef<Record<string, HTMLInputElement | null>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);
  const loginMutation = useLoginMutation();


  const handleSubmit = () => {
    loginMutation.mutate(loginFormik.values);
  };
  let loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (!loginFormik.isSubmitting) return;
    let firstElement = Object.keys(loginFormik.errors)[0]
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [loginFormik.errors, loginFormik.isSubmitting])


  // server error
  useEffect(() => {
    if (!loginMutation.isError) return;
    const error: any = loginMutation.error;
    loginFormik.setErrors(error.fieldErrors ?? "");
  }, [loginMutation.isError])


  const resetPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Reset password data:", values);

    },
  })




  return (
    <div className="max-w-5xl mx-3 sm:mx-auto w-full bg-white rounded-xl shadow-2xl shadow-purple-900/5 overflow-hidden flex flex-col md:flex-row ">

      {/* Left image section */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent z-10" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSl71E_Nxy_SZHmwbT2q53088nx64gq7ib-IyneQwW0QLL7BfehdD-RaG1Hr87r_k_B551OyeL_nLFB8lI15KL5lEaYSrBl5Zwp2Uj6CyOhHFNfNYOuELl9SoP8Xu1xo5CGQBnQqhMxtGxjoeMQwN0O8wSiEavI5yFg4Kmh9t5bFI71bZdg3-hmwosiSBGsWrwU09BKyB1AAo31Cu5Xrfwl9Ol_yCHw-cG3pPYeCmqqiGtIPQlzbKLMlsUEHn1IYr3jaRedXS2YEOG"
          alt="Modern poultry farm facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-end p-12 text-white h-full">
          <h2 className="text-4xl font-extrabold mb-4">
            Sohana Poultry Farm
          </h2>
          <p className="text-white/80 text-lg max-w-sm">
            Streamlining livestock operations with intelligent data analytics.
          </p>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-16">
        <div className="w-full mx-auto overflow-hidden">
          <h1 className="text-2xl font-bold mb-2">{step === 0 ? "Admin Login" : "Reset Password"}</h1>
          <p className="text-gray-500 text-sm mb-8">
            Please enter your credentials.
          </p>

          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${step * 100}%)` }}>
            <form onSubmit={loginFormik.handleSubmit} className="space-y-5 min-w-full" >

              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  ref={(el) => { el && (inputRef.current["email"] = el) }}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                  placeholder="admin@poultryfarm.com"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                />
                {loginFormik.touched.email && loginFormik.errors.email ? (
                  <span className="text-red-500 text-sm">{loginFormik.errors.email}</span>
                ) : null}
              </div>


              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={(el) => { el && (inputRef.current["password"] = el) }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3 text-gray-400"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {loginFormik.touched.password && loginFormik.errors.password ? (
                  <span className="text-red-500 text-sm">{loginFormik.errors.password}</span>
                ) : null}
              </div>


              <div className="flex items-center justify-between">
                <Field orientation="horizontal" className="">
                  <Checkbox
                    id="terms-checkbox"
                    checked={loginFormik.values.remember}
                    onCheckedChange={(checked) => loginFormik.setFieldValue("remember", checked)}
                  />
                  <FieldLabel htmlFor="terms-checkbox" className="cursor-pointer">
                    Remember me
                  </FieldLabel>
                </Field>
                <button type="button" onClick={() => setStep(1)} className="w-full text-end text-sm bg-transparent hover:bg-transparent font-semibold text-primary h-fit p-0 cursor-pointer hover:text-primary/80">
                  Forgot password?
                </button>
              </div>


              <button

                type="submit"
                className="cursor-pointer w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/80"
              >
               {loginMutation.isPending ? "Logging in..." : "Log In →"}
              </button>
            </form>
            <form onSubmit={handleSubmit} className="space-y-5 min-w-full" >
              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={resetPasswordFormik.values.email}
                  onChange={resetPasswordFormik.handleChange}
                  placeholder="admin@poultryfarm.com"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/80"
              >
                Reset Password
              </button>
              <Button onClick={() => setStep(0)} className="h-fit w-full text-center text-sm bg-transparent hover:bg-transparent font-semibold text-primary  cursor-pointer hover:text-primary/80">
                <ArrowLeftIcon /> Back to Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
