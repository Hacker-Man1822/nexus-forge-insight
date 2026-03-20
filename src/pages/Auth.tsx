import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { loginSchema, signupSchema, LoginFormData, SignupFormData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Factory, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const form = isLogin ? loginForm : signupForm;

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/");
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email to confirm your account!");
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    signupForm.reset();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary flex-col justify-between p-12" style={{ background: 'var(--gradient-dark)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Factory className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-heading text-lg font-bold text-secondary-foreground tracking-tight">
            FactoryIQ
          </span>
        </div>
        <div>
          <h1 className="font-heading text-4xl font-bold text-secondary-foreground leading-tight mb-4">
            Manufacturing<br />Excellence Portal
          </h1>
          <p className="text-sidebar-foreground text-lg max-w-md">
            End-to-end visibility, collaboration, and operational control across your entire manufacturing lifecycle.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["Real-time Production", "Quality & Compliance", "Supply Chain", "Analytics"].map((item) => (
            <div key={item} className="border border-sidebar-border rounded-lg p-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow mb-2" />
              <span className="text-sm text-sidebar-foreground font-body">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Factory className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">FactoryIQ</span>
          </div>

          <h2 className="font-heading text-2xl font-bold mb-1">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "Sign in to access your dashboard" : "Get started with FactoryIQ"}
          </p>

          <form onSubmit={isLogin ? loginForm.handleSubmit(handleLogin) : signupForm.handleSubmit(handleSignup)} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" {...signupForm.register("fullName")} className="mt-1.5" />
                {signupForm.formState.errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{signupForm.formState.errors.fullName.message}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...(isLogin ? loginForm.register("email") : signupForm.register("email"))}
                className="mt-1.5"
              />
              {(isLogin ? loginForm.formState.errors.email : signupForm.formState.errors.email) && (
                <p className="text-destructive text-sm mt-1">
                  {(isLogin ? loginForm.formState.errors.email : signupForm.formState.errors.email)?.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...(isLogin ? loginForm.register("password") : signupForm.register("password"))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {(isLogin ? loginForm.formState.errors.password : signupForm.formState.errors.password) && (
                <p className="text-destructive text-sm mt-1">
                  {(isLogin ? loginForm.formState.errors.password : signupForm.formState.errors.password)?.message}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...signupForm.register("confirmPassword")}
                  className="mt-1.5"
                />
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={switchMode} className="text-primary hover:underline font-medium">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
