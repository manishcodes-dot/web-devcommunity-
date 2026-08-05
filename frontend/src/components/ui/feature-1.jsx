import { Card, CardContent } from "@/components/ui/card";
import {
  HiLightBulb,
  HiShieldCheck,
  HiSupport,
  HiDatabase,
  HiSwitchHorizontal,
} from "react-icons/hi";

export default function Features1({ isDarkMode = false }) {
  const cardStyle = isDarkMode
    ? "bg-[#393e46] border-[#393e46] hover:border-[#2FA084] shadow-md"
    : "bg-white border border-[#393e46]/20 shadow-md hover:shadow-xl hover:border-[#2FA084]";

  const iconBoxStyle = "bg-[#2FA084] text-white";

  const badgeStyle = isDarkMode
    ? "bg-[#222831] text-[#2FA084]"
    : "bg-[#eeeeee] text-[#2FA084] border border-[#393e46]/20";

  return (
    <section
      className={`relative w-full overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#222831] text-[#eeeeee]" : "bg-[#eeeeee] text-[#222831]"
      } py-16 md:py-24 px-6 flex flex-col items-center justify-center`}
    >
      {/* Background Grid Pattern */}
      <div className={`absolute inset-0 z-0 h-full w-full pointer-events-none bg-[size:3.5rem_3.5rem] ${
        isDarkMode
          ? 'bg-[linear-gradient(to_right,rgba(238,238,238,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,238,238,0.12)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,rgba(34,40,49,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,40,49,0.15)_1px,transparent_1px)]'
      }`} />

      <div className="relative z-10 container mx-auto max-w-6xl flex flex-col items-center">
        <h2
          className={`mb-12 max-w-3xl text-center text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl ${
            isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
          }`}
        >
          Send and receive money anytime, anywhere
        </h2>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiLightBulb className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Smart issue detection
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Identify and resolve payment issues instantly with intelligent monitoring and automated diagnosis.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Real-time alerts
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiDatabase className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Fast transactions
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Experience smooth, lightning-quick transfers across all regions with zero latency delays.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Avg speed &lt; 1.5s
              </div>
            </CardContent>
          </Card>

          {/* Card 3 (Featured) */}
          <Card className={`md:row-span-2 flex flex-col justify-between rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiShieldCheck className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Secure & reliable payments
              </h3>
              <p className={`mb-6 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Built with military-grade encryption and 24/7 automated monitoring to keep every transaction safe.
              </p>

              <div className="space-y-3">
                <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs ${
                  isDarkMode ? "bg-zinc-800/40" : "bg-slate-100"
                }`}>
                  <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>Encryption</span>
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>AES-256</span>
                </div>
                <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs ${
                  isDarkMode ? "bg-zinc-800/40" : "bg-slate-100"
                }`}>
                  <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>Fraud detection</span>
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Active</span>
                </div>
                <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs ${
                  isDarkMode ? "bg-zinc-800/40" : "bg-slate-100"
                }`}>
                  <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>Uptime</span>
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>99.99%</span>
                </div>
              </div>
            </CardContent>

            <div className="px-6 pb-6">
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Monitored continuously
              </div>
            </div>
          </Card>

          {/* Card 4 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiSwitchHorizontal className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Effortless transfers
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Move funds between multiple accounts instantly with an intuitive, frictionless interface.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                No hidden delays
              </div>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiSupport className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Always-on support
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Get assistance around the clock with responsive customer support and live assistance.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                24/7 availability
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
