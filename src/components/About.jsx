const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { Bone, Stethoscope, Award, Microscope } from 'lucide-react';

const portrait = 'https://media.db.com/images/public/6a455dc3488de20d7fc3df9b/f7da23bd2_generated_image.png';

const expertisePillars = [
  { icon: Microscope, title: 'Artroskopické operace', desc: 'Minimálně invazivní výkony s rychlejší rekonvalescencí a menší zátěží pro pacienta.' },
  { icon: Bone, title: 'Náhrady velkých kloubů', desc: 'Náhrady kolenních a kyčelních kloubů s využitím moderních implantátů a postupů.' },
  { icon: Award, title: 'Atestace 2017', desc: 'Atestace z oboru Ortopedie a traumatologie pohybového ústrojí, Fakultní nemocnice Plzeň.' },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src={portrait}
                alt="MUDr. Jan Kasl, Ph.D. – ortoped Plzeň"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-foreground">Ortopedie</p>
                  <p className="text-xs text-muted-foreground">od roku 2010</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="inline-block text-primary font-heading font-bold text-sm uppercase tracking-wider mb-3">
              O mně
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight mb-6 text-balance">
              Přesnost, důvěra<br />a lidský přístup
            </h2>
            <div className="space-y-4 text-foreground/80 text-base sm:text-lg leading-relaxed">
              <p>
                MUDr. Jan Kasl se narodil 14. 01. 1981 v Plzni. Vystudoval gymnázium na Mikulášském nám. v Plzni a v roce 2000 nastoupil na LF UK v Plzni, kterou dokončil v roce 2008 a promoval na konci roku 2008.
              </p>