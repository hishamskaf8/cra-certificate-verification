
import React from 'react';
import { OFFICIAL_INFO, TRANSLATIONS } from '../constants';
import { useApp } from '../AppContext';

const Footer: React.FC = () => {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];
  const info = OFFICIAL_INFO[lang];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-20 pb-10 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="rtl:text-right ltr:text-left">
            <h3 className="text-2xl font-bold mb-6 text-primary">{info.ORGANIZATION}</h3>
            <p className="text-gray-300 mb-4 font-bold">{info.COMMITTEE}</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t.footer_desc}
            </p>
          </div>
          <div className="rtl:text-right ltr:text-left">
            <h3 className="text-xl font-bold mb-6 border-b border-primary/30 inline-block pb-2">{t.footer_links}</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><i className="fas fa-hand-holding-heart"></i> {t.home}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><i className="fas fa-user-friends"></i> {t.verify}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><i className="fas fa-database"></i> Database API</a></li>
            </ul>
          </div>
          <div className="rtl:text-right ltr:text-left">
            <h3 className="text-xl font-bold mb-6 border-b border-primary/30 inline-block pb-2">{t.footer_contact}</h3>
            <div className="space-y-4 text-gray-400 text-sm">
              <p className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-primary"></i> {t.address}</p>
              <p className="flex items-center gap-3 ltr:flex-row-reverse ltr:justify-end"><i className="fas fa-phone text-primary"></i> +213 (0) 48 XX XX XX</p>
              <p className="flex items-center gap-3 ltr:flex-row-reverse ltr:justify-end"><i className="fas fa-envelope text-primary"></i> info@arc-sba.dz</p>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} {t.footer_rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
