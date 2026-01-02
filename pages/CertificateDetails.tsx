
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Certificate } from '../types';
import { getCertificateById } from '../services/certificateService';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../constants';

const CertificateDetails: React.FC = () => {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    if (id) {
      setLoading(true);
      getCertificateById(id).then((data) => {
        if (data) setCertificate(data);
        else setError(t.not_found);
        setLoading(false);
      });
    }
    return () => clearInterval(timer);
  }, [id, t.not_found]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-20 h-20 relative">
           <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
           <div className="absolute inset-2 border-4 border-gray-200 border-b-transparent rounded-full animate-spin-reverse opacity-30"></div>
        </div>
        <p className="mt-8 text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-sm">{t.search_loading}</p>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white dark:bg-darkCard p-12 rounded-[2.5rem] shadow-2xl border border-red-100 dark:border-red-900/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <i className="fas fa-exclamation-triangle text-primary text-7xl mb-8"></i>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">{error}</h2>
          <Link to="/verify" className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl hover:shadow-red-200">
            {t.verify_another}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-darkCard rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 relative">
        
        {/* Verification Timestamp Overlay */}
        <div className="absolute top-4 left-4 z-50 pointer-events-none">
           <div className="bg-green-500/10 backdrop-blur-md px-3 py-1 rounded-lg border border-green-500/20 text-[10px] font-mono font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              LIVE VERIFIED: {currentTime.toLocaleTimeString()}
           </div>
        </div>

        <div className="bg-gray-900 dark:bg-black p-10 text-white border-b-8 border-primary relative">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <i className="fas fa-award text-5xl text-primary"></i>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t.cert_details_title}</h2>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-[0.2em]">{t.official_service}</p>
              </div>
            </div>
            <div className="text-center md:text-left ltr:md:text-right">
              <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-widest mb-1">REFERENCE ID</span>
              <span className="font-mono text-xl font-bold text-primary bg-primary/10 px-4 py-1 rounded-lg border border-primary/20">{certificate.id}</span>
            </div>
          </div>
        </div>

        <div className="p-10 md:p-16 relative">
          {/* Animated Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
            <i className="fas fa-shield-check text-[450px] rotate-[-15deg]"></i>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-10">
              <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <label className="text-[10px] font-bold text-primary uppercase mb-3 block tracking-widest border-b border-primary/10 pb-1">{t.cert_status}</label>
                <div className={`inline-flex items-center px-8 py-3 rounded-2xl text-md font-extrabold border shadow-sm ${
                  certificate.status === 'valid' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 
                  certificate.status === 'revoked' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' :
                  'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                }`}>
                  <i className={`fas ${certificate.status === 'valid' ? 'fa-badge-check' : 'fa-ban'} mx-3 text-xl`}></i>
                  {certificate.status === 'valid' ? t.cert_valid : certificate.status === 'revoked' ? t.cert_revoked : t.cert_expired}
                </div>
              </div>

              <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-3 block tracking-widest border-b border-gray-100 dark:border-gray-800 pb-1">{t.cert_recipient}</label>
                <p className="text-4xl font-black text-gray-900 dark:text-white leading-tight">{certificate.recipientName}</p>
                <div className="mt-4 flex items-center gap-2">
                   <i className="fas fa-fingerprint text-gray-300 dark:text-gray-600"></i>
                   <span className="font-mono text-sm text-gray-400 dark:text-gray-500">ID: {certificate.nationalId.replace(/.(?=.{4})/g, '*')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-3 block tracking-widest border-b border-gray-100 dark:border-gray-800 pb-1">{t.cert_course}</label>
                <p className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">{certificate.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 block tracking-widest">{t.cert_date}</label>
                  <p className="font-black text-gray-800 dark:text-gray-200 text-lg">{certificate.issueDate}</p>
                </div>
                {certificate.expiryDate && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 block tracking-widest">{t.cert_expiry}</label>
                    <p className="font-black text-gray-800 dark:text-gray-200 text-lg">{certificate.expiryDate}</p>
                  </div>
                )}
              </div>

              <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-3 block tracking-widest border-b border-gray-100 dark:border-gray-800 pb-1">{t.cert_issuer}</label>
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-primary">
                      <i className="fas fa-stamp text-sm"></i>
                   </div>
                   <p className="font-bold text-gray-800 dark:text-gray-200">{certificate.issuedBy}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row justify-between items-end gap-10">
            <div className="flex items-center gap-8 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 w-full lg:w-auto shadow-inner">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.href)}`} alt="Verification QR" className="w-28 h-28" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                   <i className="fas fa-link text-primary"></i>
                   {lang === 'ar' ? 'رابط التوثيق الرقمي' : 'Lien de Documentation'}
                </p>
                <p className="text-[9px] font-mono text-gray-400 break-all leading-relaxed max-w-[200px]">{window.location.href}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button 
                onClick={() => window.print()}
                className="group flex-1 lg:flex-none bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-10 py-5 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <i className="fas fa-file-pdf text-xl group-hover:scale-110 transition-transform"></i>
                {t.print}
              </button>
              <Link 
                to="/verify"
                className="group flex-1 lg:flex-none bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-200 dark:shadow-none transform hover:translate-y-[-2px] active:translate-y-0"
              >
                <i className="fas fa-plus-circle text-xl group-hover:rotate-90 transition-transform"></i>
                {t.verify_another}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 dark:bg-primary/10 py-6 px-12 border-t border-primary/20">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[10px] font-bold text-primary dark:text-red-400 text-center md:text-right leading-relaxed max-w-lg">
                <i className="fas fa-gavel mr-2 rtl:ml-2"></i>
                {t.security_notice}
              </p>
              <div className="flex gap-4">
                 <i className="fab fa-facebook text-gray-300 hover:text-primary transition-colors cursor-pointer"></i>
                 <i className="fab fa-twitter text-gray-300 hover:text-primary transition-colors cursor-pointer"></i>
                 <i className="fas fa-share-alt text-gray-300 hover:text-primary transition-colors cursor-pointer"></i>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetails;
