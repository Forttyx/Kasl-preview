const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ChevronDown, Phone } from 'lucide-react';

const heroImg = 'https://media.db.com/images/public/6a455dc3488de20d7fc3df9b/b149c36b9_generated_image.png';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollToContent = () => {
    const el = document.querySelector('#about');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img src={heroImg} alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,138,154,0.88) 0%, rgba(14,138,154,0.65) 50%, rgba(26,35,126,0.82) 100%)' }} />
      </motion.div>

      <div className="absolute inset-0 z-0 opacity-[0.12]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <motion.path
            d="M600 50 Q580 200 620 350 Q660 500 600 650 Q540 720 580 800"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <motion.path
            d="M560 50 Q540 200 580 350 Q620 500 560 650"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.path
            d="M640 50 Q660 200 620 350 Q580 500 640 650"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.6 }}
          />
          {[
            { cx: 600, cy: 200 },
            { cx: 600, cy: 350 },
            { cx: 600, cy: 500 },
            { cx: 600, cy: 650 },
          ].map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r="4"
              fill="white"
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 frosted text-white text-sm font-semibold font-heading mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            Ortopedická ordinace · Plzeň
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
            MUDr. Jan Kasl,<br />Ph.D.
          </h1>
          <p className="mt-4 text-white/90 text-lg sm:text-xl md:text-2xl font-heading font-semibold tracking-tight">
            Ortopedie a traumatologie pohybového ústrojí
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/15 frosted text-white"
          >
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <span className="font-heading font-semibold text-sm sm:text-base">
              Husova 1509/18, 301 00 Plzeň
            </span>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#kontakt');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className="px-7 py-3.5 rounded-full bg-white text-primary font-heading font-bold text-base hover:bg-white/90 transition-all shadow-lg shadow-black/10"
            >
              Objednat se
            </a>
            <a
              href="tel:+420377321061"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/40 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              +420 377 321 061
            </a>
          </div>
        </motion.div>
      </div>

      <motion.button
        style={{ opacity }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Posunout dolů"
      >
        <span className="text-xs font-heading font-semibold uppercase tracking-wider">Více</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}