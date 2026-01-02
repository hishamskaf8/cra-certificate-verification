
import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';

const ImageTools: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      // Strip metadata prefix from base64
      const base64Data = image.split(',')[1];
      const edited = await editImageWithGemini(base64Data, prompt);
      
      if (edited) {
        setResultImage(edited);
      } else {
        throw new Error("لم يتمكن النموذج من معالجة الصورة المطلوبة.");
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء معالجة الصورة.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">أدوات المعالجة بالذكاء الاصطناعي</h2>
        <p className="text-gray-600 mt-2">استخدم قوة Gemini 2.5 Flash Image لمعالجة وتحسين صور الشهادات والوثائق</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <i className="fas fa-upload ml-2 text-red-600"></i>
            رفع الصورة والتعليمات
          </h3>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-red-500 transition-colors mb-6"
          >
            {image ? (
              <img src={image} alt="Original" className="max-h-64 mx-auto rounded-lg shadow-sm" />
            ) : (
              <div className="py-8">
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">انقر هنا لرفع صورة الشهادة أو الوثيقة</p>
                <p className="text-xs text-gray-400 mt-2">JPG, PNG (Max 5MB)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">ما التعديل الذي تريده؟</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثال: أضف ختماً رسمياً للهلال الأحمر، حسّن جودة الألوان، أضف علامة مائية 'نسخة طبق الأصل'..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none min-h-[100px]"
            ></textarea>
            
            <button
              onClick={handleEdit}
              disabled={!image || !prompt || isProcessing}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-robot fa-spin"></i>
                  جاري المعالجة الذكية...
                </>
              ) : (
                <>
                  <i className="fas fa-wand-magic-sparkles"></i>
                  تطبيق المعالجة بالذكاء الاصطناعي
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border-r-4 border-red-500 text-red-700 text-sm font-bold rounded">
              {error}
            </div>
          )}
        </div>

        {/* Output View */}
        <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 relative">
          {!resultImage && !isProcessing && (
            <div className="text-center text-gray-500">
              <i className="fas fa-image text-6xl mb-4 block"></i>
              <p>ستظهر النتيجة المعالجة هنا</p>
            </div>
          )}

          {isProcessing && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-white border-b-transparent rounded-full animate-spin-slow"></div>
                </div>
              </div>
              <p className="text-white font-bold animate-pulse">جاري تحليل الوثيقة وتحسينها...</p>
              <div className="text-xs text-gray-400 max-w-xs mx-auto">
                يستخدم نظامنا Gemini 2.5 Flash لضمان أعلى جودة من المعالجة البصرية الرسمية
              </div>
            </div>
          )}

          {resultImage && (
            <div className="w-full h-full flex flex-col items-center animate-fadeIn">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 self-start">
                <i className="fas fa-check-circle text-green-500"></i>
                النتيجة النهائية
              </h4>
              <div className="flex-1 w-full bg-white rounded-lg p-2 overflow-hidden shadow-inner mb-6">
                <img src={resultImage} alt="Edited result" className="w-full h-full object-contain" />
              </div>
              <div className="flex gap-4 w-full">
                <a 
                  href={resultImage} 
                  download="processed-document.png" 
                  className="flex-1 bg-white text-gray-900 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-download ml-2"></i>
                  تحميل الوثيقة
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Examples Grid */}
      <div className="mt-16 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-6 text-gray-800 border-r-4 border-red-600 pr-4">أمثلة على ما يمكنك فعله</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-red-600 mb-2">إضافة طابع رسمي</h4>
            <p className="text-sm text-gray-600">"أضف ختماً دائرياً للهلال الأحمر الجزائري في الزاوية اليمنى السفلية"</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-red-600 mb-2">تحسين الوضوح</h4>
            <p className="text-sm text-gray-600">"قم بزيادة التباين وحدة النصوص لجعل الشهادة أكثر وضوحاً للطباعة"</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-red-600 mb-2">علامات مائية</h4>
            <p className="text-sm text-gray-600">"أضف علامة مائية شفافة بشعار المنظمة تتوسط الصفحة"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTools;
