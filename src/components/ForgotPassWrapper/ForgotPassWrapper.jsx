import React from 'react';

// سميناه ForgotPassWrapper ليدل على وظيفته كما طلبتِ
const ForgotPassWrapper = ({ title, description, children, buttonText, onSubmit, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-inter  animate-fade-in">
      <div className="w-full max-w-[420px] flex flex-col ">
        
        {/* Logo Section - PulseX */}
        {showLogo && (
          <div className="mb-5 ">
         
            <span className="font-bold text-2xl text-black-main-text ">Pulse<span className="font-bold text-2xl text-brand-main">X</span></span>
          </div>
        )}

        {/* Text Content */}
        <h2 className="text-[28px] font-bold text-black-main-text mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-gray-text-dim2 text-[14px] mb-10 leading-relaxed max-w-[340px]">
          {description}
        </p>

        {/* Form Content - Inputs will be injected here */}
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <div className="w-full">
            {children}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-brand-main hover:bg-brand-dark text-white font-bold py-4 rounded-full shadow-lg shadow-brand-main/20 transition-all active:scale-95 text-[15px]"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassWrapper;
