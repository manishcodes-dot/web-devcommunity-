import { Card, CardContent } from "@/components/ui/card";
import {
  HiLightBulb,
  HiCode,
  HiBookOpen,
  HiUserGroup,
  HiSparkles,
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
        {/* Section Badge */}
        <div className={`mb-3 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-bold font-mono uppercase tracking-wider ${badgeStyle}`}>
          ✦ Built for Knowledge Sharing
        </div>

        <h2
          className={`mb-4 max-w-3xl text-center text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl ${
            isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
          }`}
        >
          Discover what you didn't know. Share what you've learned.
        </h2>

        <p className={`mb-12 max-w-2xl text-center text-base md:text-lg leading-relaxed ${
          isDarkMode ? "text-zinc-400" : "text-slate-600"
        }`}>
          Inspired by Medium and DEV Community, OVERSTACK is an open space where programmers uncover tricky solutions, learn architectural insights, and publish what they know.
        </p>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiLightBulb className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Uncover Tricky Solutions
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Find production post-mortems, obscure framework quirks, and architectural breakdowns that official documentation rarely explains.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Learn faster
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiCode className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Frictionless Publishing
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Write your developer notes with distraction-free Markdown, rich code snippets, auto-generated summaries, and instant community publishing.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Share in 1 click
              </div>
            </CardContent>
          </Card>

          {/* Card 3 (Featured) */}
          <Card className={`md:row-span-2 flex flex-col justify-between rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiUserGroup className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Community-Driven Hub
              </h3>
              <p className={`mb-6 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Follow authors who inspire you, curate your personal feed, bookmark articles to your Saved Posts library, and participate in thoughtful technical discussions.
              </p>

              <div className="space-y-3">
                <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs ${
                  isDarkMode ? "bg-zinc-800/40" : "bg-slate-100"
                }`}>
                  <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>Access</span>
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>100% Free • No Paywalls</span>
                </div>
                <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs ${
                  isDarkMode ? "bg-zinc-800/40" : "bg-slate-100"
                }`}>
                  <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>Follow Writers</span>
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Live Feed Sync</span>
                </div>
                <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs ${
                  isDarkMode ? "bg-zinc-800/40" : "bg-slate-100"
                }`}>
                  <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>Saved Posts</span>
                  <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Personal Reading List</span>
                </div>
              </div>
            </CardContent>

            <div className="px-6 pb-6">
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Built for builders & thinkers
              </div>
            </div>
          </Card>

          {/* Card 4 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiBookOpen className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Saved Posts Library
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Bookmark any insightful post with one click. Build your personal technical handbook to revisit whenever you face that bug again.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Never lose an answer
              </div>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className={`rounded-3xl backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
            <CardContent className="p-6">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconBoxStyle}`}>
                <HiSparkles className="h-5 w-5" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Author Stats & Analytics
              </h3>
              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-slate-600"}`}>
                Track your article reads, community likes, reader responses, and growth in your personal creator dashboard.
              </p>
              <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
                Real engagement
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
