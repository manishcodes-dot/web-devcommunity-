import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const defaultFaqs = [
  {
    id: 'faq-1',
    question: 'What is OVERSTACK?',
    answer: 'OVERSTACK is an open community publishing platform designed for developers, engineers, and curious builders. Just like Medium and DEV Community, it allows anyone to discover deep technical details they didn’t know and share their knowledge with the global tech ecosystem.'
  },
  {
    id: 'faq-2',
    question: 'Is reading and publishing articles completely free?',
    answer: 'Yes! Reading articles, saving bookmarks, following creators, and publishing your own developer notes is 100% free. There are no paywalls or gated reads.'
  },
  {
    id: 'faq-3',
    question: 'What kind of technical topics can I write about?',
    answer: 'From production post-mortems and obscure framework bugs to full architectural breakdowns (React, Go, Rust, Node, AI/ML, DevOps), you can write about any engineering topic, lesson learned, or tutorial.'
  },
  {
    id: 'faq-4',
    question: 'How do following authors and saved posts work?',
    answer: 'When you follow a writer, they appear in your sidebar Following list so you never miss their new publications. You can also bookmark any article to your Saved Posts library to access it instantly later.'
  },
  {
    id: 'faq-5',
    question: 'Can I cross-post from my personal blog or Medium?',
    answer: 'Absolutely. You retain 100% copyright and ownership of all your content. You can publish original technical notes or cross-post articles from Medium, Substack, or your personal blog.'
  }
];

export function Faq6({
  badge = "FAQs",
  title = "Frequently Asked Questions",
  faqs = defaultFaqs,
  className,
  isDarkMode = false,
}) {
  return (
    <section className={cn('relative w-full overflow-hidden transition-colors duration-300 py-16 md:py-24 px-6 flex flex-col items-center justify-center', 
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]',
      className
    )}>
      {/* Background Grid Pattern */}
      <div className={`absolute inset-0 z-0 h-full w-full pointer-events-none bg-[size:3.5rem_3.5rem] ${
        isDarkMode
          ? 'bg-[linear-gradient(to_right,rgba(238,238,238,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,238,238,0.12)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,rgba(34,40,49,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,40,49,0.15)_1px,transparent_1px)]'
      }`} />

      <div className={`relative z-10 container mx-auto max-w-6xl rounded-3xl p-6 md:p-10 backdrop-blur-sm ${
        isDarkMode ? 'bg-[#393e46] border border-[#393e46]' : 'bg-white border border-[#393e46]/20 shadow-sm'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
          {/* Left Title Box */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-start">
            {badge && (
              <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2FA084] font-extrabold">
                {badge}
              </span>
            )}
            <h2 className={`text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-tight ${
              isDarkMode ? 'text-[#eeeeee]' : 'text-[#222831]'
            }`}>
              {title}
            </h2>
          </div>

          {/* Right Accordion List */}
          <div className="md:col-span-8 lg:col-span-7 relative">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className={`rounded-2xl px-6 py-1 transition-all ${
                    isDarkMode ? 'bg-[#222831] border border-[#393e46]' : 'bg-white border border-slate-200 shadow-xs'
                  }`}
                >
                  <AccordionTrigger className="group flex items-center py-5 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden cursor-pointer">
                    <div className="flex flex-1 items-center gap-4 md:gap-6">
                      <span className={`text-xs font-semibold tracking-widest ${
                        isDarkMode ? 'text-[#eeeeee]/60' : 'text-slate-400'
                      }`}>
                        Q{index + 1}
                      </span>
                      <span className={`text-left text-base font-medium md:text-lg transition-colors group-hover:text-[#2FA084] ${
                        isDarkMode ? 'text-[#eeeeee]' : 'text-slate-900'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isDarkMode
                        ? 'bg-[#393e46] text-[#eeeeee] group-hover:bg-[#2FA084] group-hover:text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-[#2FA084] group-hover:text-white'
                    }`}>
                      <FaPlus className="block h-3 w-3 group-data-[state=open]:hidden" />
                      <FaMinus className="hidden h-3 w-3 group-data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-10 md:pl-12 pr-6">
                    <p className={`text-sm leading-relaxed md:text-base ${
                      isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                    }`}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq6;
