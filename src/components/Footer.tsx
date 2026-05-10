import { motion } from "motion/react";
import {
  HardHat,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent text-blue-950 pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HardHat className="w-8 h-8 text-brand-orange" />
              <span className="text-xl font-display font-black tracking-tighter uppercase">
                ETS N MOISE
              </span>
            </div>
            <p className="text-blue-950 leading-relaxed">
              Nous construisons les infrastructures de demain avec rigueur et
              innovation.
            </p>
            <div className="flex gap-4">
              {/* <a
                href="#"
                className="p-2 border border-white/10 hover:border-brand-orange hover:text-brand-orange transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 border border-white/10 hover:border-brand-orange hover:text-brand-orange transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a> */}
              <a
                href="#"
                className="p-2 border border-white/10 hover:border-brand-orange hover:text-brand-orange transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase mb-8 tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-4 text-blue-950">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  className="hover:text-brand-orange transition-colors"
                >
                  Expertise
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="hover:text-brand-orange transition-colors"
                >
                  Nos Projets
                </a>
              </li>
              <li>
                <a
                  href="#devis"
                  className="hover:text-brand-orange transition-colors"
                >
                  Demander un Devis
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase mb-8 tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4 text-blue-950²">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span>Eleveur, Yaoundé, Cameroun</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <span>+237 699 87 82 71 / +267 699 45 67 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <span>ngnokamoise@yahoo.fr</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold uppercase mb-8 tracking-widest">
              Newsletter
            </h4>
            <p className="text-blue-950 mb-6">
              Restez informé de nos derniers projets et innovations.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-white/5 border border-white/10 px-4 py-2 w-full focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button className="bg-brand-orange text-brand-black px-4 py-2 font-bold uppercase text-xs">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ETS N MOISE. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
