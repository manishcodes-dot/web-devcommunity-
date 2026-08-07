import React, { useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

const defaultPlans = [
  {
    name: "Starter",
    price: "50",
    yearlyPrice: "40",
    period: "month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects.",
    buttonText: "Start Free Trial",
    href: "#",
  },
  {
    name: "Professional",
    price: "99",
    yearlyPrice: "79",
    period: "month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support & Team collaboration",
    ],
    description: "Ideal for growing teams and businesses.",
    buttonText: "Get Started",
    href: "#",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "299",
    yearlyPrice: "239",
    period: "month",
    features: [
      "Everything in Professional",
      "Custom solutions & integrations",
      "Dedicated account manager",
      "SSO Authentication & Advanced security",
    ],
    description: "For large organizations with specific needs.",
    buttonText: "Contact Sales",
    href: "#",
  },
];

export function PricingSection({
  title = "Find the Perfect Plan",
  description = "Select the ideal package for your needs and start building today.",
  plans = defaultPlans,
  className,
  isDarkMode = true,
}) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-300 py-16 md:py-24 px-6 flex flex-col items-center justify-center",
        isDarkMode ? "bg-[#222831] text-[#eeeeee]" : "bg-[#eeeeee] text-[#222831]",
        className
      )}
    >
      {/* Background Grid Pattern matching FAQ & Features */}
      <div
        className={`absolute inset-0 z-0 h-full w-full pointer-events-none bg-[size:3.5rem_3.5rem] ${
          isDarkMode
            ? "bg-[linear-gradient(to_right,rgba(238,238,238,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,238,238,0.12)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(34,40,49,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,40,49,0.15)_1px,transparent_1px)]"
        }`}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2FA084] font-extrabold">
            Pricing Plans
          </span>
          <h2
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
              isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed",
                isDarkMode ? "text-[#eeeeee]/80" : "text-[#393e46]"
              )}
            >
              {description}
            </p>
          )}

          {/* Monthly / Annual Toggle Switch */}
          <div className="pt-4 flex justify-center items-center">
            <div
              className={cn(
                "inline-flex items-center p-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all shadow-inner",
                isDarkMode
                  ? "bg-[#393e46] border-[#393e46]"
                  : "bg-white border-[#393e46]/20 shadow-xs"
              )}
            >
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={cn(
                  "px-5 py-2 rounded-full transition-all duration-200 cursor-pointer font-semibold",
                  !isAnnual
                    ? "bg-[#2FA084] text-white shadow-md"
                    : isDarkMode
                    ? "text-[#eeeeee]/70 hover:text-white"
                    : "text-[#393e46] hover:text-[#222831]"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={cn(
                  "px-5 py-2 rounded-full transition-all duration-200 cursor-pointer font-semibold flex items-center gap-2",
                  isAnnual
                    ? "bg-[#2FA084] text-white shadow-md"
                    : isDarkMode
                    ? "text-[#eeeeee]/70 hover:text-white"
                    : "text-[#393e46] hover:text-[#222831]"
                )}
              >
                <span>Annual</span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    isAnnual
                      ? "bg-white text-[#2FA084]"
                      : isDarkMode
                      ? "bg-[#222831] text-[#2FA084]"
                      : "bg-[#eeeeee] text-[#2FA084]"
                  )}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto pt-2">
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular;
            const currentPrice = isAnnual
              ? plan.yearlyPrice || plan.price
              : plan.price;

            return (
              <div
                key={plan.name || index}
                className={cn(
                  "relative flex flex-col justify-between rounded-3xl p-6 lg:p-8 backdrop-blur-sm transition-all duration-300",
                  isPopular
                    ? isDarkMode
                      ? "bg-[#393e46] border-2 border-[#2FA084] shadow-2xl shadow-[#2FA084]/10 ring-1 ring-[#2FA084]"
                      : "bg-white border-2 border-[#2FA084] shadow-xl ring-1 ring-[#2FA084]"
                    : isDarkMode
                    ? "bg-[#393e46] border border-[#393e46] hover:border-[#2FA084] shadow-md"
                    : "bg-white border border-[#393e46]/20 hover:border-[#2FA084] shadow-md"
                )}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-extrabold shadow-md uppercase tracking-wider bg-[#2FA084] text-white">
                      <FaStar className="w-3 h-3 text-amber-300 fill-amber-300" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Description */}
                  <div className="text-center pt-2">
                    <h3
                      className={cn(
                        "text-xl font-bold tracking-tight",
                        isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                      )}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={cn(
                        "text-xs mt-1.5 min-h-[32px] line-clamp-2 leading-relaxed",
                        isDarkMode ? "text-zinc-400" : "text-slate-600"
                      )}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="text-center my-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span
                        className={cn(
                          "text-3xl lg:text-4xl font-extrabold tracking-tight",
                          isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                        )}
                      >
                        US${currentPrice}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isDarkMode ? "text-zinc-400" : "text-slate-500"
                        )}
                      >
                        / {plan.period || "month"}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-[11px] font-semibold mt-1 uppercase tracking-wider",
                        isDarkMode ? "text-zinc-400" : "text-slate-500"
                      )}
                    >
                      {isAnnual ? "Billed Annually" : "Billed Monthly"}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 my-6 pt-4 border-t border-[#393e46]/40 dark:border-[#222831]/60">
                    {plan.features?.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-3 text-xs leading-relaxed"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#2FA084]">
                          <FaCheck className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            isDarkMode ? "text-[#eeeeee]/90" : "text-[#222831]"
                          )}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-4 mt-auto">
                  <a
                    href={plan.href || "#"}
                    className={cn(
                      "block w-full text-center py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]",
                      isPopular
                        ? "bg-[#2FA084] hover:bg-[#268068] text-white"
                        : isDarkMode
                        ? "bg-[#222831] hover:bg-[#2FA084] text-[#eeeeee] hover:text-white border border-[#393e46]"
                        : "bg-[#eeeeee] hover:bg-[#2FA084] text-[#222831] hover:text-white border border-[#393e46]/20"
                    )}
                  >
                    {plan.buttonText || "Get Started"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
