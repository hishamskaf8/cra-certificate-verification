
import React from 'react';
import { RedCrescentLogo, OFFICIAL_INFO, TRANSLATIONS } from '../constants';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';

const Navbar: React.FC = () => {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const t = TRANSLATIONS[lang];
  const info = OFFICIAL_INFO[lang];

  return (
    <header className="bg-white dark:bg-darkCard border-b-4 border-[#ED1B24] shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center space-x-4 space-x-reverse">
            <RedCrescentLogo className="w-14 h-14" />
            <div className="text-right rtl:text-right ltr:text-left">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                {info.ORGANIZATION}
              </h1>
              <p className="text-xs md:text-sm font-semibold text-primary">
                {info.COMMITTEE}
              </p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary font-bold transition-colors">{t.home}</Link>
            <Link to="/verify" className="text-gray-700 dark:text-gray-200 hover:text-primary font-bold transition-colors">{t.verify}</Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <i className="fas fa-moon text-xl"></i> : <i className="fas fa-sun text-xl text-yellow-400"></i>}
            </button>

            {/* Language Switcher - Animated */}
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full flex relative w-24 h-10 border border-gray-200 dark:border-gray-700">
              <div 
                className={`absolute top-1 bottom-1 w-[46px] bg-white dark:bg-gray-600 rounded-full shadow-sm animate-slide z-0 ${
                  lang === 'ar' ? 'right-1' : 'left-1'
                }`}
              ></div>
              <button 
                onClick={() => setLang('fr')}
                className={`flex-1 text-[10px] font-bold z-10 transition-colors duration-300 ${lang === 'fr' ? 'text-primary' : 'text-gray-400'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLang('ar')}
                className={`flex-1 text-[10px] font-bold z-10 transition-colors duration-300 ${lang === 'ar' ? 'text-primary' : 'text-gray-400'}`}
              >
                عربي
              </button>
            </div>

            <span className="hidden sm:inline-block bg-red-50 dark:bg-red-900/30 text-primary px-3 py-1 rounded-full text-[10px] font-bold border border-red-200 dark:border-red-800">
              {t.official_service}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
