import { motion } from "motion/react";
import { HardHat, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../public/brand/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "#" },
    { name: "Expertise", href: "#expertise" },
    { name: "Projets", href: "#portfolio" },
    { name: "Devis", href: "#devis" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-white text-blue-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a key="Accueil" href="#">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo ETS N MOISE" className="h-20 w-auto" />
              <span className="text-2xl font-display font-black tracking-tighter uppercase italic bg-gradient-to-r from-blue-950 via-sky-300 to-blue-900 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                ETS N MOISE
              </span>
            </div>
          </a>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-brand-orange transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-blue-950 hover:text-brand-orange focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-white border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium hover:text-brand-orange transition-colors uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
