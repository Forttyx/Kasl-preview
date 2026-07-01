import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Phone, BadgeCheck, MapPin, Send, CheckCircle2, Mail } from 'lucide-react';

function MagneticButton({ children, onClick, disabled }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      className="group relative w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-heading font-bold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {children}
    </motion.button>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  const inputClass =
    'w-full bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none px-1 py-3 text-foreground font-heading placeholder:text-muted-foreground/50 transition-colors text-base';

  return (
    <section id="kontakt" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4" />
            Kontakt
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight text-balance">
            Napište mi, nebo zavolejte
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Byli jste spokojeni s lékařem? Napište své postřehy, komentáře nebo hodnocení.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-heading font-bold text-foreground mb-1">
                    Jméno
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Vaše jméno"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-heading font-bold text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vas@email.cz"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-heading font-bold text-foreground mb-1">
                  Zpráva
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Vaše zpráva, postřehy nebo hodnocení..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-50 text-emerald-700 font-heading font-bold border border-emerald-200"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Děkujeme! Vaše zpráva byla odeslána.
                </motion.div>
              ) : (
                <div className="flex justify-center sm:justify-start">
                  <MagneticButton onClick={handleSubmit} disabled={sending}>
                    {sending ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Odesílám...
                      </>
                    ) : (
                      <>
                        Odeslat
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              )}
            </form>

            <p className="mt-4 text-xs text-muted-foreground/70 text-center sm:text-left">
              Email pro příjem zpráv: kontakt@kasl-ortopedie.cz <span className="text-muted-foreground/50">(placeholder — bude nahrazen)</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="space-y-4"
          >
            <a
              href="tel:+420377321061"
              className="flex items-center gap-4 p-5 rounded-2xl bg-accent/50 hover:bg-accent transition-colors group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-heading font-semibold">Telefon</p>
                <p className="font-heading font-bold text-foreground text-lg">+420 377 321 061</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-accent/50">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white flex-shrink-0">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-heading font-semibold">IČO</p>
                <p className="font-heading font-bold text-foreground text-lg">17662541</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-accent/50">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-heading font-semibold">Adresa</p>
                <p className="font-heading font-bold text-foreground text-lg">Husova 1509/18, 301 00 Plzeň</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg shadow-primary/5 border border-border/40 grayscale-map">
              <iframe
                title="Mapa – Husova 1509/18, Plzeň"
                src="https://maps.google.com/maps?q=Husova%201509%2F18%2C%20301%2000%20Plzeň&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-56 lg:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}