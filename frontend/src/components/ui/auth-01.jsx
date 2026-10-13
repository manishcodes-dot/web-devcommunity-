import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdLock, MdEmail, MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md";
import { FaGithub, FaMicrosoft, FaSlack } from "react-icons/fa";
import Particles from "@/components/ui/particles";

const DEFAULT_SOCIAL_PROVIDERS = [
  {
    name: "GitHub",
    icon: <FaGithub className="h-4 w-4" />,
  },
  {
    name: "Microsoft",
    icon: <FaMicrosoft className="h-4 w-4" />,
  },
  {
    name: "Slack",
    icon: <FaSlack className="h-4 w-4" />,
  },
];

export function Auth1({
  heading = "Access your workspace",
  subheading = "Connect with your team and deploy with confidence.",
  submitLabel = "Continue to workspace",
  socialProviders = DEFAULT_SOCIAL_PROVIDERS,
  dividerText = "or use your credentials",
  bottomPromptText = "Don't have an account?",
  bottomPromptLinkText = "Create new account",
  onBottomPromptClick,
  onSubmit,
  onBackToHome,
  onDemoLogin,
  isDarkMode = false,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    } else {
      alert(`Logging in with: ${email}`);
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

      {/* Frosted Glass Blurred Login Card */}
      <div className="relative z-10 w-full max-w-md space-y-5">
        <Card className={`rounded-3xl p-4 shadow-2xl backdrop-blur-2xl transition-all ${
          isDarkMode
            ? "border border-white/10 bg-[#09090b]/75 shadow-black/80 text-white"
            : "border border-slate-200/80 bg-white/80 shadow-slate-300/50 text-slate-900"
        }`}>
          <div className={`h-full w-full rounded-2xl px-4 py-6 ${
            isDarkMode ? "bg-zinc-950/60" : "bg-white/60"
          }`}>
            <CardHeader className="space-y-3 pb-4 text-center">
              <div className="space-y-1">
                <CardTitle className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>
                  {heading}
                </CardTitle>
                <CardDescription className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>
                  {subheading}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <MdEmail className="text-[#2FA084] absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="Auth1-email"
                      type="text"
                      placeholder="Email or username"
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

                  <div className="relative">
                    <MdLock className="text-[#2FA084] absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="Auth1-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
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
                  className="w-full h-11 bg-[#2FA084] hover:bg-[#268068] text-white font-bold rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  {submitLabel}
                </Button>

                {onDemoLogin && (
                  <button
                    type="button"
                    onClick={onDemoLogin}
                    className={`w-full h-11 border border-dashed rounded-xl font-bold transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs ${
                      isDarkMode
                        ? "border-emerald-500/70 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                        : "border-emerald-600/70 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    <span>⚡ Quick Dev Login (1-Click Bypass)</span>
                  </button>
                )}
              </form>

              {socialProviders && socialProviders.length > 0 && (
                <>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className={isDarkMode ? "bg-zinc-800" : "bg-slate-200"} />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className={`px-2 text-xs font-semibold ${
                        isDarkMode ? "bg-zinc-950 text-zinc-400" : "bg-white text-slate-500"
                      }`}>
                        {dividerText}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {socialProviders.map((provider) => (
                      <Button
                        key={provider.name}
                        variant="outline"
                        type="button"
                        onClick={() => alert(`Sign in with ${provider.name}`)}
                        className={`h-11 w-full gap-2 text-xs font-semibold rounded-xl cursor-pointer transition-colors ${
                          isDarkMode
                            ? "bg-zinc-900 border-zinc-700/80 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {provider.icon}
                        <span className="hidden sm:inline">{provider.name}</span>
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </CardContent>

            {bottomPromptText && (
              <CardFooter className="pt-2 pb-0 flex justify-center">
                <p className={`text-xs font-medium ${isDarkMode ? "text-zinc-400" : "text-slate-500"}`}>
                  {bottomPromptText}{" "}
                  <button
                    type="button"
                    onClick={onBottomPromptClick}
                    className="font-bold text-[#2FA084] hover:underline cursor-pointer ml-1"
                  >
                    {bottomPromptLinkText}
                  </button>
                </p>
              </CardFooter>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Auth1;
