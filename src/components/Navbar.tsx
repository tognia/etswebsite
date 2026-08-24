import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../public/brand/logo.png";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { alternateLocalePath, useLanguage, withLocale } from "../lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLanguage();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: locale === "en" ? "Home" : "Accueil", href: "/" },
    { name: "Expertise", href: "/#expertise" },
    { name: locale === "en" ? "Projects" : "Projets", href: "/projectsPage" },
    { name: locale === "en" ? "About" : "À PROPOS", href: "/aboutPage" },
    { name: locale === "en" ? "Quote" : "Devis", href: "/devisPage" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-white/80 backdrop-blur-md shadow-lg border-b border-blue-950/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <a key="Accueil" href={withLocale("/", locale)} className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Logo ETS N MOISE"
              className={`transition-all duration-500 ${scrolled ? "h-14" : "h-20"} w-auto`}
            />
            <span
              className={`text-2xl font-display font-black tracking-tighter uppercase italic bg-gradient-to-r from-blue-950 via-sky-600 to-blue-900 bg-clip-text text-transparent drop-shadow-sm transition-opacity duration-500 ${!scrolled && "opacity-90"}`}
            >
              ETS N MOISE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <HashLink
                  key={link.name}
                  to={withLocale(link.href, locale)}
                  className={`text-sm font-bold transition-colors uppercase tracking-widest hover:text-brand-orange ${
                    scrolled ? "text-blue-950" : "text-white drop-shadow-md"
                  }`}
                >
                  {link.name}
                </HashLink>
              ))}
            </div>

            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/etsnmoise"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-950 text-white hover:bg-brand-orange"
                  : "bg-white/20 text-white hover:bg-white hover:text-blue-950 backdrop-blur-sm"
              }`}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <HashLink
              to={alternateLocalePath(location.pathname, location.hash)}
              className={`text-xs font-black uppercase tracking-widest px-3 py-2 border transition-all ${
                scrolled
                  ? "border-blue-950/20 text-blue-950 hover:border-brand-orange hover:text-brand-orange"
                  : "border-white/30 text-white hover:bg-white hover:text-blue-950"
              }`}
              aria-label={locale === "en" ? "Voir la version française" : "View English version"}
            >
              {locale === "en" ? "FR" : "EN"}
            </HashLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <a
              href="https://www.instagram.com/etsnmoise"
              target="_blank"
              className={scrolled ? "text-blue-950" : "text-white"}
            >
              <Instagram className="w-6 h-6" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                scrolled ? "text-blue-950" : "text-white"
              }`}
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
            <HashLink
              to={alternateLocalePath(location.pathname, location.hash)}
              className={`text-xs font-black uppercase tracking-widest px-2 py-1 border ${
                scrolled ? "border-blue-950/20 text-blue-950" : "border-white/30 text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {locale === "en" ? "FR" : "EN"}
            </HashLink>
          </div>
        </div>
      </div>

      {/* Mobile menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-blue-950/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={withLocale(link.href, locale)}
                  className="block px-3 py-3 text-lg font-bold text-blue-950 hover:bg-blue-50 rounded-lg transition-colors uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
