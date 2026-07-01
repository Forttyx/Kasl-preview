import React from 'react';
import { Activity, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A237E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/15">
                <Activity className="w-5 h-5" strokeWidth={2.5} />
              </span>
              <span className="font-heading font-extrabold text-lg tracking-tight">
                MUDr. Jan Kasl, Ph.D.
              </span>
            </div>
            <p className="text-white/60 text-sm font-heading">
              Ortopedie a traumatologie pohybového ústrojí
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/50 mb-3">
              Kontakt
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+420377321061" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +420 377 321 061
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                Husova 1509/18, 301 00 Plzeň
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/50 mb-3">
              Detaily
            </h3>
            <p className="text-white/80 text-sm">IČO: 17662541</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm font-heading text-center sm:text-left">
            © {year} MUDr. Jan Kasl, Ph.D. · Všechna práva vyhrazena
          </p>
          <p className="text-white/30 text-xs font-heading">
            Ortopedická ordinace · Plzeň
          </p>
        </div>
      </div>
    </footer>
  );
}