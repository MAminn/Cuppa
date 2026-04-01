import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WhatsAppIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
  </svg>
);

function SectionDivider() {
  return (
    <div className='section-divider'>
      <div className='section-divider-line' />
      <div className='section-divider-diamond' />
      <div className='section-divider-line' />
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='min-h-screen'>
      {/* Nav */}
      <motion.nav
        className={`nav${scrolled ? " nav-scrolled" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}>
        <div
          className='flex justify-between items-center'
          style={{
            maxWidth: 1200,
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px 32px",
          }}>
          <img src='/cesro-logo.png' alt='Cesro' className='nav-logo' />
          <a
            href='https://wa.me/201XXXXXXXXX'
            target='_blank'
            rel='noopener noreferrer'
            className='nav-cta'>
            Contact Us
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section
        className='hero-gradient relative overflow-hidden'
        style={{ height: "100vh" }}>
        <img src='/public/landing page.png' alt='' className='hero-bg-image' />
        <div className='hero-overlay' />

        <div className='hero-content-wrapper'>
          <motion.h1
            className='hero-title'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}>
            Cesro
          </motion.h1>

          <motion.p
            className='hero-tagline'
            style={{ marginTop: 24 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}>
            Premium Denim Distribution &mdash; Cairo, Egypt
          </motion.p>

          <motion.div
            style={{
              width: 60,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.15)",
              marginTop: 40,
              opacity: 0.4,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          />

          <motion.a
            href='#contact'
            className='cta-button'
            style={{ marginTop: 48 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}>
            <WhatsAppIcon />
            Get in Touch
          </motion.a>
        </div>

        <motion.div
          className='hero-scroll-bottom'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}>
          <motion.span
            className='uppercase'
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "var(--color-muted)",
            }}>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              Scroll
            </motion.span>
          </motion.span>
          <SectionDivider />
        </motion.div>
      </section>

      {/* About */}
      <section
        className='flex flex-col items-center text-center'
        style={{
          paddingTop: 120,
          paddingBottom: 120,
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
        }}>
        <motion.span
          className='section-label'
          style={{ marginBottom: 32 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          Our Story
        </motion.span>

        <motion.h2
          className='about-heading'
          style={{ marginBottom: 32 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}>
          Crafted for Those Who Know Denim
        </motion.h2>

        <motion.p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--color-muted)",
            maxWidth: 600,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          Cesro is Cairo&apos;s premier destination for wholesale premium denim.
          We partner with retailers and boutiques across Egypt and the region,
          delivering curated collections that set the standard for quality and
          style.
        </motion.p>

        <motion.p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--color-muted)",
            maxWidth: 600,
            marginTop: 24,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.45 }}>
          From raw selvedge to modern stretch fits, every piece in our catalogue
          is selected with the discerning buyer in mind. Our commitment is
          simple &mdash; exceptional denim, reliable partnerships, seamless
          service.
        </motion.p>

        <motion.div
          style={{
            width: 60,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.15)",
            marginTop: 48,
            opacity: 0.4,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </section>

      <SectionDivider />

      {/* WhatsApp CTA */}
      <section
        id='contact'
        className='flex flex-col items-center text-center'
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
        }}>
        <motion.span
          className='section-label'
          style={{ marginBottom: 32 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          Get in Touch
        </motion.span>

        <motion.h2
          className='cta-heading'
          style={{ marginBottom: 16 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}>
          Let&apos;s Talk Denim
        </motion.h2>

        <motion.p
          style={{
            fontSize: 16,
            color: "var(--color-muted)",
            lineHeight: 1.7,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 48,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          Whether you&apos;re stocking a boutique or supplying a chain &mdash;
          we&apos;d love to hear from you.
        </motion.p>

        <motion.a
          href='https://wa.me/201XXXXXXXXX'
          target='_blank'
          rel='noopener noreferrer'
          className='cta-button'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          whileHover={{ scale: 1.02 }}>
          <WhatsAppIcon />
          Start a Conversation
        </motion.a>
      </section>

      {/* Footer */}
      <footer
        className='footer'
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24,
        }}>
        <span className='footer-brand'>Cesro</span>
        <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
          Cairo, Egypt
        </span>
        <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
          &copy; 2025 Cesro. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
