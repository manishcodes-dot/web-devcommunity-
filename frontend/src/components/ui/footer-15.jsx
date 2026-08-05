import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

const defaultColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Updates', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Twitter / X', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const navStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

const riseItem = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
};

const linkStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const linkItem = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4, bounce: 0 },
  },
};

const heroBrandVariant = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.1, bounce: 0 },
  },
};

const ctaVariant = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.5, bounce: 0 },
  },
};

export function Footer15({
  logoIcon,
  brandName = 'NEWSLETTER',
  description = 'Craft adaptive financial systems, enhance results,\nand send payments globally and effortlessly.',
  ctaLabel = 'Explore now',
  ctaHref = '#',
  columns = defaultColumns,
  heroBrandName = 'NEWSLETTER',
  isDarkMode = false,
}) {
  return (
    <footer className="w-full overflow-hidden rounded-t-3xl md:rounded-t-[3rem] font-sans antialiased mt-12 transition-colors duration-300 bg-[#222831] text-[#eeeeee]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 pt-12 pb-6 sm:px-10 sm:pt-16 lg:px-16 lg:pt-20"
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <motion.div
            variants={riseItem}
            className="flex shrink-0 flex-col gap-5 lg:max-w-[280px]"
          >
            <div className="flex items-center gap-2.5">
              {logoIcon ?? (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2FA084] text-white font-extrabold text-lg shadow-md">
                  N
                </div>
              )}
              <span className="text-xl font-bold tracking-wider text-white uppercase select-none">
                {brandName}
              </span>
            </div>

            <p className="text-sm leading-relaxed font-normal text-pretty whitespace-pre-line text-[#eeeeee]/70">
              {description}
            </p>

            <motion.a
              href={ctaHref}
              variants={ctaVariant}
              whileTap={{ scale: 0.96 }}
              className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-[#2FA084] py-1 pr-1.5 pl-6 text-white font-bold text-sm transition-all duration-200 hover:bg-[#268068] hover:shadow-xl cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#222831] text-white transition-transform duration-200 group-hover:translate-x-0.5">
                <FaArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          </motion.div>

          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid w-full max-w-[600px] grid-cols-2 gap-y-8 sm:grid-cols-4"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem}>
                <h3 className="text-base font-semibold tracking-wide text-white mb-4">
                  {col.title}
                </h3>
                <motion.ul
                  variants={linkStagger}
                  className="flex flex-col gap-3"
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkItem}>
                      <a
                        href={link.href}
                        className="inline-block text-sm font-normal text-[#eeeeee]/70 transition-colors duration-200 hover:text-[#2FA084]"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.nav>
        </div>
      </motion.div>

      {/* Large Hero Brand Text */}
      <motion.div
        variants={heroBrandVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative flex items-end justify-center overflow-hidden px-4 pt-8 pb-4 sm:px-6 md:pt-14"
      >
        <svg
          className="h-auto w-full translate-y-2 select-none md:translate-y-4"
          viewBox={`0 0 ${Math.max(heroBrandName.length * 90, 400)} 110`}
          preserveAspectRatio="xMidYMid meet"
          aria-label={heroBrandName}
        >
          <text
            x="50%"
            y="100%"
            dominantBaseline="alphabetic"
            textAnchor="middle"
            textLength="95%"
            lengthAdjust="spacing"
            className="fill-zinc-800/60 font-sans font-extrabold tracking-tighter"
            fontSize="150"
          >
            {heroBrandName}
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}

export default Footer15;
