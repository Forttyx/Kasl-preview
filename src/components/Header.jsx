import React, { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';

const navLinks = [
  { label: 'O mně', href: '#about' },
  { label: 'Ordinační doba', href: '#ordinacni-doba' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'frosted bg-white/85 shadow-[0_1px_3px_rgba(0,0,0,0.06)] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className={`flex items-center gap-2.5 font-heading font-extrabold text-base sm:text-lg transition-colors duration-300 ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
        >
          <span
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-300 ${
              scrolled ? 'bg-primary text-white' : 'bg-white/20 text-white frosted'
            }`}
          >
            <Activity className="w-5 h-5" strokeWidth={2.5} />
          </span>
          <span className="hidden sm:block tracking-tight">MUDr. Jan Kasl, Ph.D.</span>
          <span className="sm:hidden tracking-tight">Kasl</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold font-heading transition-all duration-300 hover:bg-white/15 ${
                scrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => handleNavClick(e, '#kontakt')}
            className={`ml-2 px-5 py-2.5 rounded-full text-sm font-bold font-heading transition-all duration-300 ${
              scrolled
                ? 'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20'
                : 'bg-white text-primary hover:bg-white/90'
            }`}
          >
            Objednat se
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/15'
          }`}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden frosted bg-white/95 border-t border-border/50 mt-2.5">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 rounded-lg text-base font-semibold font-heading text-foreground hover:bg-accent hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={(e) => handleNavClick(e, '#kontakt')}
              className="mt-2 px-5 py-3 rounded-full text-base font-bold font-heading bg-primary text-white text-center hover:bg-primary/90 transition-colors"
            >
              Objednat se
            </a>
          </div>
        </div>
      )}
    </header>
  );
}