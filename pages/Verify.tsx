
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCertificateById } from '../services/certificateService';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../constants';

const Verify: React.FC = () => {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    if (showScanner) {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scanner.render(onScanSuccess, onScanFailure);
    }
    return () => {
      if (scanner) {
        scanner.clear().catch(err => console.error(err));
      }
    };
  }, [showScanner]);

  function onScanSuccess(decodedText: string) {
    let id = decodedText;
    if (decodedText.includes('/verify/')) {
      id = decodedText.split('/verify/').pop() || decodedText;
    }
    id = id.split('?')[0].split('#')[0];
    handleVerification(id);
    setShowScanner(false);
  }

  function onScanFailure() {}

  const handleVerification = async (id: string) => {
    const cleanId = id.trim();
    if (!cleanId) return;
    setLoading(true);
    setError(null);
    const found = await getCertificateById(cleanId);
    setLoading(false);
    if (found) {
      navigate(`/verify/${cleanId}`);
    } else {
      setError(t.not_found);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerification(searchId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-darkCard rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="bg-primary p-12 text-white text-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-red-500 rounded-full opacity-20"></div>
          <div className="relative z-10">
            <i className="fas fa-shield-check text-7xl mb-6"></i>
            <h2 className="text-4xl font-extrabold mb-4">{t.hero_title}</h2>
            <p className="text-red-100 mt-2 max-w-md mx-auto opacity-90">{t.hero_desc}</p>
          </div>
        </div>

        <div className="p-12">
          <div className="mb-12 text-center">
            <button
              onClick={() => setShowScanner(!showScanner)}
              className={`inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${
                showScanner 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200' 
                : 'bg-red-50 dark:bg-red-900/20 text-primary border-2 border-red-100 dark:border-red-900/50 hover:bg-red-100'
              }`}
            >
              <i className={`fas ${showScanner ? 'fa-keyboard' : 'fa-qrcode text-3xl'}`}></i>
              {showScanner ? t.manual_input : t.scan_qr}
            </button>
          </div>

          {showScanner ? (
            <div className="animate-fadeIn">
              <div id="reader" className="w-full max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-primary/20 shadow-inner"></div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8 animate-fadeIn">
              <div className="relative group">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder={t.search_placeholder}
                  className="w-full px-10 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-3xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none text-2xl text-center font-mono font-bold placeholder:font-sans placeholder:font-normal placeholder:text-gray-400 dark:text-white transition-all"
                  required
                />
                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
                  <i className="fas fa-fingerprint text-3xl"></i>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-6 rounded-3xl font-bold text-2xl hover:bg-red-700 shadow-xl shadow-red-200 dark:shadow-none transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {loading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    {t.search_loading}
                  </>
                ) : (
                  <>
                    <i className="fas fa-search-check"></i>
                    {t.search_btn}
                  </>
                )}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-10 bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/50 p-8 rounded-3xl flex items-start animate-fadeIn">
              <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-full ml-4 ltr:mr-4 ltr:ml-0">
                <i className="fas fa-exclamation-triangle text-primary text-2xl"></i>
              </div>
              <div>
                <h4 className="text-primary font-bold mb-1 text-lg">خطأ / Erreur</h4>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
