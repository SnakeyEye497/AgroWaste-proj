import React, { useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="relative flex items-center space-x-2">
      <FaGlobe className="text-gray-700" />
      <div id="google_translate_element" className="bg-white p-1 rounded-md shadow-sm border border-gray-300"></div>
    </div>
  );
};

export default LanguageSwitcher;