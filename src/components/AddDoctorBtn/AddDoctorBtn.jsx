import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './AddDoctorBtn.module.css'; 

// أيقونات "مضمونة" لتجنب أخطاء Vite و React-Icons
import { LuUpload, LuUser, LuPlus } from "react-icons/lu";

export default function AddDoctorBtn() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  // 1. Validation Schema باستخدام Yup لتأمين البيانات قبل الإرسال
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    password: Yup.string().min(8, 'Min 8 characters').required('Password is required'),
    location: Yup.string().required('Location is required'),
    price: Yup.number().required('Consultation price is required'),
    gender: Yup.string().required('Gender is required'),
  });

  // 2. Formik Logic لإدارة الـ Form باحترافية
  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: '', password: '', location: '', price: '',
      gender: 'Male', image: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        
        const token = localStorage.getItem('token');
        await axios.post('/api/doctors/add', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });

        // الانتقال لصفحة الإدارة مع تمرير حالة النجاح
        navigate('/admin/doctor-management', { state: { success: true } });
      } catch (error) {
        console.error("Error adding doctor", error);
      }
    }
  });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* تغيير LuPlusCircle لـ LuPlus لضمان التوافق */}
        <div className="bg-white/20 p-2 rounded-xl"><LuPlus className="text-2xl" /></div>
        <div>
          <h1 className="text-xl font-extrabold text-white">Add New Doctor</h1>
          <p className="text-xs text-white opacity-80">View, edit, and manage all registered Doctors.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formBody}>
          {/* قسم رفع الصورة */}
          <div className="flex flex-col gap-4">
             <h3 className="font-bold text-sm text-gray-500">Upload Photo</h3>
             <label className={styles.uploadSection}>
                <input type="file" hidden onChange={handleImageChange} />
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover rounded-[22px]" alt="preview" />
                ) : (
                  <>
                    <div className="bg-blue-50 p-4 rounded-2xl mb-4 text-[#333CF5]"><LuUpload className="text-3xl" /></div>
                    <p className="font-bold text-[#010218]">Click to upload photo</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </>
                )}
             </label>
          </div>

          {/* قسم المعلومات الشخصية */}
          <div className={styles.personalInfo}>
            <div className="flex items-center gap-2 text-[#333CF5] border-b border-gray-50 pb-4">
              <LuUser className="text-xl" />
              <h3 className="font-bold">Personal Information</h3>
            </div>

            <div className={styles.gridInputs}>
              <InputField label="First Name" name="firstName" formik={formik} placeholder="Enter first name" />
              <InputField label="Last Name" name="lastName" formik={formik} placeholder="Enter last name" />
              <InputField label="Email Address" name="email" type="email" formik={formik} placeholder="doctor@pulsex.com" />
              <InputField label="Phone Number" name="phone" formik={formik} placeholder="+20 1000000000" />
              <InputField label="Date of Birth" name="dateOfBirth" type="date" formik={formik} />
              <InputField label="Password" name="password" type="password" formik={formik} placeholder="Create a strong password" />
              <InputField label="Location" name="location" formik={formik} placeholder="Enter doctor location" />
              <InputField label="Consultation Price" name="price" type="number" formik={formik} placeholder="Enter price" />
            </div>

            <div className="mt-6">
              <label className="text-sm font-bold block mb-3">Gender *</label>
              <div className={styles.genderContainer}>
                <div 
                  className={`${styles.genderOption} ${formik.values.gender === 'Male' ? styles.selected : ''}`}
                  onClick={() => formik.setFieldValue('gender', 'Male')}
                >
                  Male
                </div>
                <div 
                  className={`${styles.genderOption} ${formik.values.gender === 'Female' ? styles.selected : ''}`}
                  onClick={() => formik.setFieldValue('gender', 'Female')}
                >
                   Female
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerActions}>
          <button type="button" onClick={() => navigate(-1)} className={styles.btnCancel}>Cancel</button>
          <button type="submit" className={styles.btnSubmit}>
             Create Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable Input Component لتحسين جودة الكود ونظافته
const InputField = ({ label, name, type = 'text', formik, placeholder }) => (
  <div className={styles.inputGroup}>
    <label>{label} <span className="text-red-500">*</span></label>
    <input
      type={type}
      className={styles.inputField}
      placeholder={placeholder}
      {...formik.getFieldProps(name)}
    />
    {formik.touched[name] && formik.errors[name] ? (
      <span className={styles.errorText}>{formik.errors[name]}</span>
    ) : null}
  </div>
);
