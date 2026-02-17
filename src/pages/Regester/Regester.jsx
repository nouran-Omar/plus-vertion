import React from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/registerSchema';
import { useNavigate, Link } from 'react-router-dom';
import { Datepicker } from "flowbite-react";
import { TbLogin2 } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import Logo from "../../../public/logo/logo.svg";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', password: '',
      phone: '', dateOfBirth: '', gender: '', acceptTerms: false
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log("Patient Registration Data:", values);
      setTimeout(() => navigate('/login'), 1500);
    },
  });

  return (
    <div className="min-h-screen bg-[#F6F7F8] font-inter pb-10 text-left">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Logo is now used as a default import variable */}
          <img src={Logo} alt="PulseX Logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-black-main-text font-poppins">PulseX</span>
        </div>
      </nav>

      <div className="max-w-[1371px] mx-auto py-12 px-4 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="text-[32px] font-bold text-black-main-text mb-3 font-poppins">Create Your Patient Account</h1>
          <p className="text-gray-text-dim text-[14px] leading-relaxed">
            Join thousands of patients who trust MedConnect Portal for their healthcare needs. Your journey to better health starts here.
          </p>
        </div>

        {/* Main Form Box */}
        <div className="bg-white p-6 md:p-10 rounded-[32px] shadow-[0px_10px_40px_rgba(0,0,0,0.03)] w-full max-w-[750px] border border-gray-50">
          <div className="text-center mb-8">
            <h3 className="font-bold text-[20px] text-black-main-text mb-1 uppercase tracking-tight">Personal Information</h3>
            <p className="text-gray-text-dim text-[12px]">Please provide your basic contact information</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {[
                { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Enter your first name' },
                { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Enter your last name' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'Enter your Email Address' },
                { label: 'Password', name: 'password', type: 'password', placeholder: 'Create a strong password' },
                { label: 'Phone Number', name: 'phone', type: 'text', placeholder: '+20 1000000000' }
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="block text-[11px] font-bold mb-2  tracking-wider text-black-main-text">
                    {field.label} <span className="text-error">*</span>
                  </label>
                  <input
                    {...formik.getFieldProps(field.name)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-full border ${formik.touched[field.name] && formik.errors[field.name] ? 'border-error ring-1 ring-error/10' : 'border-gray-200'} focus:ring-4 focus:ring-brand-main/10 transition-all outline-none text-[14px]`}
                  />
                  {formik.touched[field.name] && formik.errors[field.name] && (
                    <div className="text-error text-[10px] mt-1 font-medium">{formik.errors[field.name]}</div>
                  )}
                </div>
              ))}

              {/* Date of Birth Field */}
              <div className="flex flex-col">
                <label className="block text-[11px] font-bold mb-2 tracking-wider text-black-main-text">
                  Date of Birth <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <Datepicker 
                    onSelectedDateChanged={(date) => {
                      formik.setFieldValue('dateOfBirth', date);
                      formik.setFieldTouched('dateOfBirth', true);
                    }}
                    className="rounded-2xl"
                  />
                  <CiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <div className="text-error text-[10px] mt-1 font-medium">{formik.errors.dateOfBirth}</div>
                )}
              </div>
            </div>

            {/* Gender Section */}
            <div className="mt-4">
              <label className="block text-[11px] font-bold mb-3 uppercase tracking-wider text-black-main-text">
                Gender <span className="text-error">*</span>
              </label>
              <div className="flex flex-row gap-4 justify-start"> {/* غيرنا الـ gap وخليناها justify-start */}
  {['male', 'female'].map((g) => (
    <label 
      key={g} 
      className={`flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full border cursor-pointer transition-all ${
        formik.values.gender === g 
        ? 'border-brand-main bg-brand-main/5 text-brand-main' 
        : 'border-gray-200 text-gray-text-dim bg-white'
      }`}
    >
      <input 
        type="radio" 
        name="gender" 
        value={g} 
        className="w-4 h-4 accent-brand-main cursor-pointer" 
        onChange={() => formik.setFieldValue('gender', g)} 
        checked={formik.values.gender === g}
      />
      <span className="font-semibold text-[14px] capitalize">
        {g}
      </span>
    </label>
  ))}
</div>

              {formik.touched.gender && formik.errors.gender && (
                <div className="text-error text-[10px] mt-1 font-medium">{formik.errors.gender}</div>
              )}
            </div>

            {/* Terms & Consent */}
            <div className="pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <IoDocumentTextSharp className="text-brand-main text-lg" />
                <span className="font-bold text-[14px] text-black-main-text">Terms & Consent <span className="text-error">*</span></span>
              </div>
              <div className="flex items-start gap-3 pl-1">
                <input 
                  type="checkbox" 
                  id="acceptTerms" 
                  {...formik.getFieldProps('acceptTerms')}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-main accent-brand-main focus:ring-brand-main/20 cursor-pointer" 
                />
                <label htmlFor="acceptTerms" className="text-[12px] text-gray-text-dim leading-relaxed cursor-pointer select-none">
                  I agree to the <span className="text-brand-main font-bold underline">Terms of Service and Privacy Policy</span>. <br />
                  By checking this box, you agree to our terms and conditions.
                </label>
              </div>
              {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                <div className="text-error text-[10px] mt-1 font-medium ml-8">{formik.errors.acceptTerms}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-brand-main hover:bg-brand-dark text-white font-bold py-3.5 px-20 rounded-full shadow-lg shadow-brand-main/20 transition-all active:scale-95"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Already have an account Section */}
          <div className="mt-10 p-6 bg-[#F6F7F8] rounded-[24px] text-center border border-gray-100">
             <div className="flex items-center justify-center gap-2 text-gray-text-dim text-[12px] mb-3 font-bold uppercase tracking-widest">
                <RiGroupLine className="text-brand-main text-lg" /> Already have an account?
             </div>
             <p className="text-[12px] text-gray-text-dim mb-5 max-w-[320px] mx-auto">If you're an existing patient, sign in to access your medical records and appointments.</p>
             <Link to="/login" className="inline-flex items-center gap-2 bg-[#00C853] hover:bg-[#13A956] text-white font-bold py-3 px-10 rounded-2xl transition-all shadow-md active:scale-95">
                Sign In to Existing Account <TbLogin2 size={22} />
             </Link>
          </div>
        </div>

        {/* Icons Footer Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-center w-full max-w-4xl">
           <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-brand-main/10 rounded-full flex items-center justify-center text-brand-main mb-4 transition-colors hover:bg-brand-main hover:text-white cursor-default"><FaUserGroup size={24}/></div>
              <h4 className="font-bold text-[13px] text-black-main-text uppercase tracking-wide">Expert Care Team</h4>
              <p className="text-[11px] text-gray-text-dim mt-2 leading-relaxed max-w-[200px]">Connect with board-certified physicians and healthcare specialists.</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#13A956]/10 rounded-full flex items-center justify-center text-[#13A956] mb-4 transition-colors hover:bg-[#13A956] hover:text-white cursor-default"><CiCalendar size={28}/></div>
              <h4 className="font-bold text-[13px] text-black-main-text uppercase tracking-wide">Easy Scheduling</h4>
              <p className="text-[11px] text-gray-text-dim mt-2 leading-relaxed max-w-[200px]">Book appointments 24/7 with our convenient online scheduling system.</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#D0791D]/10 rounded-full flex items-center justify-center text-[#D0791D] mb-4 transition-colors hover:bg-[#D0791D] hover:text-white cursor-default"><IoDocumentTextSharp size={24}/></div>
              <h4 className="font-bold text-[13px] text-black-main-text uppercase tracking-wide">Digital Records</h4>
              <p className="text-[11px] text-gray-text-dim mt-2 leading-relaxed max-w-[200px]">Access your medical history and test results anytime, anywhere.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Register;