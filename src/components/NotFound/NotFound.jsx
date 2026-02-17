import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-white">
      {/* الرقم فقط بتصميم نحيف وأنيق */}
      <h1 className="text-brand-main text-[120px] md:text-[160px] font-poppins font-light tracking-widest leading-none">
        404
      </h1>
      
      {/* لينك العودة بسيط جداً تحتها */}
      <Link 
        to="/" 
        className="mt-8 text-gray-text-dim hover:text-brand-main font-inter text-sm tracking-[0.2em] uppercase transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;