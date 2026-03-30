import {
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const ease = [0.16, 1, 0.3, 1];

/* ─── Shared reveal wrapper ───────────────────────────────────────────── */
function Reveal({ children, className = "", delay = 0, y = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease }}>
      {children}
    </motion.div>
  );
}

/* ─── WhatsApp SVG icon ───────────────────────────────────────────────── */
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
    </svg>
  );
}

/* ─── Arrow icon (↗) ──────────────────────────────────────────────────── */
function ArrowIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5' />
    </svg>
  );
}

/* ─── Section label (line + text) ─────────────────────────────────────── */
function SectionLabel({ text, variant = "dark" }) {
  const isDark = variant === "dark";
  return (
    <div className='flex items-center gap-3'>
      <div className={`h-px w-8 ${isDark ? "bg-black/15" : "bg-white/15"}`} />
      <span
        className={`text-[10px] font-medium tracking-[0.4em] uppercase ${
          isDark ? "text-black/30" : "text-white/25"
        }`}>
        {text}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  INTRO LOADER                                                          *
 * ═══════════════════════════════════════════════════════════════════════ */
function IntroLoader({ onComplete }) {
  const [phase, setPhase] = useState("fade-in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 500);
    const t2 = setTimeout(() => setPhase("exit"), 1300);
    const t3 = setTimeout(() => onComplete(), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className='fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center'
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={
        phase === "exit" ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } : {}
      }>
      <motion.span
        className='text-[16px] font-semibold tracking-[0.6em] text-white uppercase'
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "fade-in" ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}>
        CUPPA
      </motion.span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  1. NAVIGATION                                                         *
 * ═══════════════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const threshold =
      typeof window !== "undefined" ? window.innerHeight * 0.85 : 600;
    setScrolled(v > threshold);
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
      }`}>
      <div className='flex items-center justify-between px-6 md:px-12 lg:px-16 py-5'>
        <a
          href='#'
          className='text-[30px] font-semibold tracking-[0.5em] text-white uppercase no-underline'>
          CUPPA
        </a>
        <a
          href='#connect'
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("connect")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className='text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase no-underline hover:text-white transition-colors duration-300 cursor-pointer'>
          CONTACT
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  2. HERO                                                               *
 * ═══════════════════════════════════════════════════════════════════════ */
const headlineLines = [
  { text: "THE NEW", accent: false },
  { text: "STANDARD IN", accent: false },
  { text: "PREMIUM DENIM", accent: false },
  { text: "Distribution", accent: true },
];

function Hero() {
  return (
    <section className='relative min-h-screen flex flex-col justify-end bg-[#0a0a0a] overflow-hidden px-6 md:px-12 lg:px-16 pb-32 md:pb-44'>
      {/* Background texture */}
      <div
        className='absolute inset-0 pointer-events-none opacity-20'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582655299221-2b6bff351df0?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "luminosity",
        }}
      />
      {/* Ambient radial gradient */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className='relative z-10 max-w-6xl'>
        {/* Location label */}
        <motion.p
          className='text-[10px] font-medium tracking-[0.5em] text-white/20 uppercase mb-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}>
          EST. CAIRO, EGYPT
        </motion.p>
        <div className='h-px w-16 bg-white/10 mb-8' />

        {/* Headline — clip-mask staggered reveal */}
        <h1 className='text-[clamp(2.6rem,8.5vw,9rem)] font-[200] leading-[0.92] tracking-tight text-white uppercase'>
          {headlineLines.map((line, i) => (
            <div key={i} className='overflow-hidden'>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.1,
                  ease,
                }}
                className={
                  line.accent
                    ? "font-serif italic text-white/15 normal-case"
                    : ""
                }>
                {line.text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Tagline + CTA row */}
        <motion.div
          className='mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8'
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}>
          <p className='text-[11px] font-light tracking-[0.25em] text-white/30 uppercase'>
            Selvedge sourcing &amp; distribution&ensp;&middot;&ensp;Cairo, Egypt
          </p>

          <motion.a
            href='https://wa.me/20XXXXXXXXXX'
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-3 bg-white text-black px-12 py-5 border-0 outline-none ring-0 focus:outline-none focus:ring-0 no-underline w-full sm:w-auto justify-center shrink-0 shadow-[0_2px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.12)] transition-shadow duration-300'
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}>
            <WhatsAppIcon className='w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
            <span className='text-[12px] font-medium tracking-[0.25em] uppercase'>
              Start a Conversation
            </span>
            <ArrowIcon className='w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-4 left-1/2 -translate-x-1/2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}>
        <motion.div
          className='w-px h-6 bg-white/10'
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  3. MARQUEE                                                            *
 * ═══════════════════════════════════════════════════════════════════════ */
function Marquee() {
  const content =
    "SELVEDGE \u00B7 RAW DENIM \u00B7 DISTRIBUTION \u00B7 MENA \u00B7 CAIRO \u00B7 JAPAN \u00B7 ITALY \u00B7 TURKEY \u00B7 ";
  const repeated = content.repeat(6);

  return (
    <div className='bg-[#0a0a0a] border-t border-b border-white/[0.04] py-4 overflow-hidden select-none'>
      <motion.div
        className='flex whitespace-nowrap'
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        <span className='text-[10px] tracking-[0.5em] text-white/[0.06] uppercase font-light'>
          {repeated}
        </span>
        <span className='text-[10px] tracking-[0.5em] text-white/[0.06] uppercase font-light'>
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  4. ABOUT — THE HOUSE                                                  *
 * ═══════════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section className='relative bg-[#f8f7f5] border-t border-black/[0.06] py-32 md:py-48 px-6 md:px-12 lg:px-16 overflow-hidden'>
      {/* Decorative 01 */}
      <span className='absolute top-8 left-6 md:left-12 text-[8rem] md:text-[12rem] font-[100] text-black/[0.03] select-none pointer-events-none leading-none'>
        01
      </span>

      <div className='relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16'>
        <div className='md:col-span-3'>
          <Reveal>
            <SectionLabel text='THE HOUSE' variant='dark' />
          </Reveal>
        </div>

        <div className='md:col-span-9'>
          <Reveal>
            <h2 className='text-[clamp(1.5rem,3.2vw,2.8rem)] font-[300] leading-[1.2] tracking-[-0.01em] text-[#1a1a1a]'>
              We source the highest-grade selvedge and raw denim from Japan,
              Italy &amp; Turkey — and place it precisely where it belongs.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className='h-px w-16 bg-black/10 mt-10 mb-10' />
          </Reveal>
          <Reveal delay={0.18}>
            <p className='text-[13px] md:text-[14px] font-light leading-[1.9] text-black/40 max-w-xl'>
              Cuppa is a Cairo-based distribution house specializing in premium
              denim textiles. Every roll is graded for indigo saturation,
              tensile integrity, and weave consistency before entering our
              supply chain. We serve manufacturers and ateliers across the MENA
              region.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  5. CAPABILITIES                                                       *
 * ═══════════════════════════════════════════════════════════════════════ */
const capabilities = [
  {
    num: "01",
    title: "SELVEDGE & RAW",
    desc: "Shuttle-loom fabrics, 12\u201321 oz weight range, rope-dyed indigo.",
  },
  {
    num: "02",
    title: "STRETCH COMPOSITES",
    desc: "Dual-core elastane blends engineered for recovery and hand-feel.",
  },
  {
    num: "03",
    title: "SUSTAINABLE LOTS",
    desc: "BCI-certified cotton, recycled fiber blends, waterless finishing.",
  },
  {
    num: "04",
    title: "BESPOKE SOURCING",
    desc: "Custom mill runs, exclusive colorways, minimum 2,000m per SKU.",
  },
];

function Capabilities() {
  return (
    <section className='bg-[#0a0a0a] py-28 md:py-40 px-6 md:px-12 lg:px-16'>
      <div className='max-w-6xl mx-auto'>
        <Reveal>
          <div className='mb-14 md:mb-20'>
            <SectionLabel text='CAPABILITIES' variant='light' />
          </div>
        </Reveal>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {capabilities.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 0.08}>
              <div
                className={`group pt-8 pb-12 pr-8 border-t border-white/[0.06] lg:border-t-0 ${
                  i > 0
                    ? "lg:border-l lg:border-white/[0.1] lg:pl-8"
                    : "lg:border-l-0 lg:pl-0"
                }`}>
                <p className='text-[10px] font-light tracking-[0.25em] text-white/15 mb-6 group-hover:text-white/40 transition-colors duration-300'>
                  {num}
                </p>
                <p className='text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase mb-4'>
                  {title}
                </p>
                <p className='text-[12px] font-light leading-[1.8] text-white/25'>
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  6. CONNECT                                                            *
 * ═══════════════════════════════════════════════════════════════════════ */
function Connect() {
  return (
    <section
      id='connect'
      className='relative bg-white py-36 md:py-52 px-6 md:px-12 lg:px-16 overflow-hidden'>
      {/* Decorative 02 */}
      <span className='absolute top-12 md:top-16 right-6 md:right-12 text-[8rem] md:text-[12rem] font-[100] text-black/[0.03] select-none pointer-events-none leading-none'>
        02
      </span>

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16'>
        <div className='md:col-span-3'>
          <Reveal>
            <SectionLabel text='CONNECT' variant='dark' />
          </Reveal>
        </div>

        <div className='md:col-span-9'>
          <Reveal>
            <h2 className='text-[clamp(2rem,4.5vw,4rem)] font-[200] leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] mb-10'>
              Let&rsquo;s Talk
              <br />
              <span className='font-serif italic font-normal'>Denim.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className='flex items-center gap-2 mb-8'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
              </span>
              <span className='text-[12px] font-light tracking-[0.08em] text-black/40'>
                We respond within 24 hours
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className='text-[13px] md:text-[14px] font-light leading-[1.9] text-black/35 max-w-lg mb-10'>
              We work exclusively with manufacturers, fashion houses, and
              ateliers who demand selvedge-grade precision and supply chain
              transparency. If you&rsquo;re sourcing premium denim in the MENA
              region — we should talk.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.a
              href='https://wa.me/20XXXXXXXXXX'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-3 bg-[#0a0a0a] text-white px-12 py-5 border-0 outline-none ring-0 focus:outline-none focus:ring-0 no-underline w-full sm:w-auto justify-center'
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: "easeOut" }}>
              <WhatsAppIcon className='w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
              <span className='text-[12px] font-medium tracking-[0.25em] uppercase'>
                Start a Conversation
              </span>
              <ArrowIcon className='w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
            </motion.a>
          </Reveal>

          <Reveal delay={0.26}>
            <div className='mt-14 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row gap-6 md:gap-12'>
              <div>
                <p className='text-[9px] font-medium tracking-[0.35em] text-black/20 uppercase mb-2'>
                  EMAIL
                </p>
                <a
                  href='mailto:info@cuppa-denim.com'
                  className='text-[13px] font-light text-black/50 no-underline hover:text-black/70 transition-colors duration-300'>
                  info@cuppa-denim.com
                </a>
              </div>
              <div>
                <p className='text-[9px] font-medium tracking-[0.35em] text-black/20 uppercase mb-2'>
                  PHONE
                </p>
                <a
                  href='tel:+20XXXXXXXXXX'
                  className='text-[13px] font-light text-black/50 no-underline hover:text-black/70 transition-colors duration-300'>
                  +20 XX XXXX XXXX
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  7. FOOTER                                                            *
 * ═══════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className='bg-[#0a0a0a] text-white border-t border-white/[0.06] px-6 md:px-12 lg:px-16 py-16 md:py-24 text-center'>
      <div className='h-px w-12 bg-white/10 mx-auto mb-8' />
      <p className='text-[12px] font-semibold tracking-[0.5em] uppercase mb-5'>
        CUPPA
      </p>
      <p className='text-[11px] font-light tracking-[0.08em] text-white/30 mb-4'>
        info@cuppa-denim.com&ensp;&middot;&ensp;+20 XX XXXX XXXX
      </p>
      <p className='text-[9px] font-light tracking-[0.25em] text-white/15 uppercase'>
        &copy; 2026 Cuppa for Trading &amp; Distribution
        L.L.C.&ensp;&middot;&ensp;Cairo, Egypt
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  8. FLOATING WHATSAPP FAB                                              *
 * ═══════════════════════════════════════════════════════════════════════ */
function WhatsAppFab({ connectInView, pastHero }) {
  const show = pastHero && !connectInView;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href='https://wa.me/20XXXXXXXXXX'
          target='_blank'
          rel='noopener noreferrer'
          className='fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-black/20 no-underline'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.35, ease }}
          whileHover={{ scale: 1.1 }}>
          <WhatsAppIcon className='w-5 h-5 md:w-6 md:h-6 text-white' />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ *
 *  APP                                                                    *
 * ═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);
  const connectRef = useRef(null);
  const connectInView = useInView(connectRef, {
    margin: "-50% 0px 0px 0px",
  });
  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setPastHero(v > (typeof window !== "undefined" ? window.innerHeight : 600));
  });

  return (
    <>
      <AnimatePresence>
        {loading && <IntroLoader onComplete={handleLoaded} />}
      </AnimatePresence>
      <div className='grain'>
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Capabilities />
        <div className='relative'>
          <div
            ref={connectRef}
            className='absolute inset-0 pointer-events-none'
            aria-hidden='true'
          />
          <Connect />
        </div>
        <Footer />
        <WhatsAppFab connectInView={connectInView} pastHero={pastHero} />
      </div>
    </>
  );
}
