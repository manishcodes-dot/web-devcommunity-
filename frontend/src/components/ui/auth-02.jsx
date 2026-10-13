import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Particles from "@/components/ui/particles";

import {
  MdPerson,
  MdEmail,
  MdLock,
  MdArrowForward,
  MdArrowBack,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { FaGoogle, FaApple } from "react-icons/fa";

export function Auth2({
  heading = "Create your account",
  subheading = "Join thousands of developers and designers building the future.",
  submitLabel = "Create Account",
  signInPromptText = "Already have an account?",
  signInLinkText = "Sign in",
  onSignInClick,
  onSubmit,
  onBackToHome,
  isDarkMode = false,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ firstName, lastName, email, password });
    } else {
      alert(`Account created for ${firstName} ${lastName} (${email})`);
    }
  };

  return (
    <div className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden transition-colors duration-300 px-4 py-12 ${
      isDarkMode ? "bg-[#222831] text-[#eeeeee]" : "bg-[#eeeeee] text-[#222831]"
    }`}>
      {/* Web Home Background Particles */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Particles
          particleColors={isDarkMode ? ["#2FA084", "#eeeeee", "#393e46"] : ["#2FA084", "#222831", "#393e46"]}
          particleCount={250}
          particleSpread={12}
          speed={0.15}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Web Home Background Grid Pattern */}
      <div className={`absolute inset-0 z-0 h-full w-full pointer-events-none bg-[size:3.5rem_3.5rem] ${
        isDarkMode
          ? 'bg-[linear-gradient(to_right,rgba(238,238,238,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,238,238,0.12)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,rgba(34,40,49,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,40,49,0.15)_1px,transparent_1px)]'
      }`}>
        {/* Subtle Radial Glow */}
        <div className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-[radial-gradient(circle_600px_at_50%_50%,rgba(47,160,132,0.35),transparent)]'
            : 'bg-[radial-gradient(circle_600px_at_50%_50%,rgba(47,160,132,0.22),transparent)]'
        }`}></div>
      </div>

      {/* Back to Home Button */}
      {onBackToHome && (
        <button
          type="button"
          onClick={onBackToHome}
          className={`absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all cursor-pointer z-20 backdrop-blur-md ${
            isDarkMode
              ? "bg-zinc-900/80 border-zinc-700/60 text-zinc-200 hover:text-white hover:bg-zinc-800"
              : "bg-white/80 border-slate-200 text-slate-800 hover:text-emerald-600 shadow-sm"
          }`}
        >
          <MdArrowBack className="h-4 w-4" />
          <span>Back to home</span>
        </button>
      )}

      {/* Frosted Glass Blurred Signup Card */}
      <div className="relative z-10 w-full max-w-lg space-y-4">
        <div className={`rounded-3xl p-4 shadow-2xl backdrop-blur-2xl transition-all ${
          isDarkMode
            ? "border border-white/10 bg-[#09090b]/75 shadow-black/80 text-white"
            : "border border-slate-200/80 bg-white/80 shadow-slate-300/50 text-slate-900"
        }`}>
          <div className={`rounded-2xl p-6 sm:p-8 ${
            isDarkMode ? "bg-zinc-950/60" : "bg-white/60"
          }`}>
            <div className="mb-6 space-y-1 text-center">
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                {heading}
              </h1>
              <p className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>
                {subheading}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => alert("Sign up with Google")}
                className={`h-11 w-full gap-2 text-sm font-semibold cursor-pointer rounded-xl transition-colors ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-700/80 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FaGoogle className="h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => alert("Sign up with Apple")}
                className={`h-11 w-full gap-2 text-sm font-semibold cursor-pointer rounded-xl transition-colors ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-700/80 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <FaApple className="h-4 w-4" />
                Apple
              </Button>
            </div>

            <div className="my-5 flex items-center gap-3">
              <Separator className={`flex-1 ${isDarkMode ? "bg-zinc-800" : "bg-slate-200"}`} />
              <span className={`shrink-0 text-xs font-semibold uppercase ${
                isDarkMode ? "text-zinc-400" : "text-slate-500"
              }`}>
                Or continue with
              </span>
              <Separator className={`flex-1 ${isDarkMode ? "bg-zinc-800" : "bg-slate-200"}`} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className={isDarkMode ? "text-zinc-300 text-xs font-semibold" : "text-slate-700 text-xs font-semibold"}>
                    First Name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-[#2FA084] absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Alex"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`pl-10 h-11 rounded-xl transition-all ${
                        isDarkMode
                          ? "bg-zinc-900/90 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-[#2FA084]"
                          : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className={isDarkMode ? "text-zinc-300 text-xs font-semibold" : "text-slate-700 text-xs font-semibold"}>
                    Last Name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-[#2FA084] absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Rivera"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`pl-10 h-11 rounded-xl transition-all ${
                        isDarkMode
                          ? "bg-zinc-900/90 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-[#2FA084]"
                          : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                      }`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className={isDarkMode ? "text-zinc-300 text-xs font-semibold" : "text-slate-700 text-xs font-semibold"}>
                  Email Address
                </Label>
                <div className="relative">
                  <MdEmail className="text-[#2FA084] absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 h-11 rounded-xl transition-all ${
                      isDarkMode
                        ? "bg-zinc-900/90 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-[#2FA084]"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className={isDarkMode ? "text-zinc-300 text-xs font-semibold" : "text-slate-700 text-xs font-semibold"}>
                  Password
                </Label>
                <div className="relative">
                  <MdLock className="text-[#2FA084] absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 h-11 rounded-xl transition-all ${
                      isDarkMode
                        ? "bg-zinc-900/90 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-[#2FA084]"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="h-4 w-4" />
                    ) : (
                      <MdVisibility className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#2FA084] hover:bg-[#268068] text-white font-bold rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer gap-2 mt-2"
              >
                <span>{submitLabel}</span>
                <MdArrowForward className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-xs font-medium ${isDarkMode ? "text-zinc-400" : "text-slate-500"}`}>
                {signInPromptText}{" "}
                <button
                  type="button"
                  onClick={onSignInClick}
                  className="font-bold text-[#2FA084] hover:underline cursor-pointer ml-1"
                >
                  {signInLinkText}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth2;
