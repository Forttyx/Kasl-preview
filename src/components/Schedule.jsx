import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarDays, Info } from 'lucide-react';

const schedule = [
  { day: 'Pondělí', abbr: 'Po', start: '14:00', end: '18:00', color: '#0E8A9A', closed: false },
  { day: 'Úterý', abbr: 'Út', start: '7:15', end: '17:15', color: '#7E57C2', closed: false },
  { day: 'Středa', abbr: 'St', start: '9:30', end: '18:00', color: '#43A047', closed: false },
  { day: 'Čtvrtek', abbr: 'Čt', start: '14:00', end: '18:00', color: '#E67E22', closed: false },
  { day: 'Pátek', abbr: 'Pá', start: '7:15', end: '12:15', color: '#1A237E', closed: false },
  { day: 'Sobota', abbr: 'So', start: null, end: null, color: '#F5F5F5', closed: true },
  { day: 'Neděle', abbr: 'Ne', start: null, end: null, color: '#F5F5F5', closed: true },
];

function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function getOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  const slots = {
    1: [parseTime('14:00'), parseTime('18:00')],
    2: [parseTime('7:15'), parseTime('17:15')],
    3: [parseTime('9:30'), parseTime('18:00')],
    4: [parseTime('14:00'), parseTime('18:00')],
    5: [parseTime('7:15'), parseTime('12:15')],
  };
  const slot = slots[day];
  if (!slot) return { open: false, todayIdx: day };
  return { open: time >= slot[0] && time <= slot[1], todayIdx: day };
}

export default function Schedule() {
  const [status, setStatus] = useState({ open: false, todayIdx: -1 });

  useEffect(() => {
    setStatus(getOpenStatus());
    const interval = setInterval(() => setStatus(getOpenStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const todayJs = new Date().getDay();
  const todayIdx = todayJs === 0 ? 6 : todayJs - 1;

  return (
    <section id="ordinacni-doba" className="relative py-20 md:py-28 bg-gradient-to-b from-accent/40 to-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-wider mb-3">
            <CalendarDays className="w-4 h-4" />
            Ordinační doba
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight text-balance">
            Kdy můžeme přijít?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-heading font-bold text-sm ${
              status.open
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            <span className="relative flex h-3 w-3">
              {status.open && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${status.open ? 'bg-emerald-500' : 'bg-red-500'}`} />
            </span>
            {status.open ? 'Ordinace je nyní otevřena' : 'Ordinace je nyní zavřena'}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {schedule.map((day, i) => {
            const isToday = i === todayIdx;
            const isClosed = day.closed;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-shadow ${
                  isClosed
                    ? 'bg-[#F5F5F5] border border-border/40'
                    : 'text-white shadow-lg'
                } ${isToday ? 'ring-2 ring-offset-2 ring-primary' : ''} ${!isClosed ? 'shadow-black/10' : ''}`}
                style={!isClosed ? { backgroundColor: day.color } : {}}
              >
                {isToday && (
                  <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-heading uppercase tracking-wide ${
                    isClosed ? 'bg-foreground text-white' : 'bg-white text-foreground'
                  }`}>
                    Dnes
                  </span>
                )}
                <span className={`font-heading font-extrabold text-2xl sm:text-3xl mb-1 ${isClosed ? 'text-muted-foreground' : ''}`}>
                  {day.abbr}
                </span>
                <span className={`text-[11px] font-heading font-semibold mb-3 ${isClosed ? 'text-muted-foreground/70' : 'text-white/80'}`}>
                  {day.day}
                </span>
                {isClosed ? (
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-heading font-bold">Neordinuje</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-heading font-bold text-sm sm:text-base">{day.start}</span>
                    <span className="text-white/60 text-xs">—</span>
                    <span className="font-heading font-bold text-sm sm:text-base">{day.end}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-start gap-2.5 max-w-xl text-sm text-muted-foreground bg-white/60 rounded-xl px-4 py-3 border border-border/40">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
            <p>
              O svátcích, prázdninách či podle rozpisů služeb se může ordinační doba lišit.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}