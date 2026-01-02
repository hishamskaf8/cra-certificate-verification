
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../constants';

const Home: React.FC = () => {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-darkBg pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-32 lg:px-8 transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-red-100 dark:bg-red-900/30 text-primary text-xs font-bold mb-4 uppercase tracking-widest border border-red-200 dark:border-red-800">
              {t.official_service}
            </span>
            <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-6xl">
              {t.hero_title}
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
              {t.hero_desc}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/verify"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl shadow-xl text-white bg-primary hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95"
              >
                {t.verify_now}
                <i className={`fas fa-shield-check ${lang === 'ar' ? 'mr-3' : 'ml-3'}`}></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 h-full">
            {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/20"></div>)}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-1">15,000+</div>
              <div className="text-red-100 font-bold opacity-80 uppercase text-xs tracking-widest">{t.stats_certs}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-1">99.9%</div>
              <div className="text-red-100 font-bold opacity-80 uppercase text-xs tracking-widest">{t.stats_service}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-1">100%</div>
              <div className="text-red-100 font-bold opacity-80 uppercase text-xs tracking-widest">{t.stats_acc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 dark:text-white border-primary border-r-4 pr-4 ltr:border-r-0 ltr:border-l-4 ltr:pl-4">
                {lang === 'ar' ? 'حول النظام المركزي' : 'À propos du système'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">
                {t.hero_desc}
              </p>
              <div className="space-y-4">
                {[t.feature_privacy, t.feature_speed, t.feature_tech].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-primary">
                      <i className="fas fa-check text-xs"></i>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-darkCard p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative">
               <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <i className="fas fa-shield-check text-8xl text-primary opacity-20"></i>
               </div>
               <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                  <p className="text-xs text-red-700 dark:text-red-400 font-bold italic">
                    {t.disclaimer}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
