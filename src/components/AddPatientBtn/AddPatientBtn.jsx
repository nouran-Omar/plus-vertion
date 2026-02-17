import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './AddPatientBtn.module.css';
import { LuUpload, LuUser, LuPlus } from "react-icons/lu";
export default function AddPatient() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  // Validation Schema لتأمين جودة البيانات قبل إرسالها للباك إند
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    location: Yup.string().required('Location is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: '', location: '', gender: 'Male', image: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (values[key]) formData.append(key, values[key]);
        });
        
        const token = localStorage.getItem('token');
        await axios.post('/api/patients/add', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });

        // الانتقال لصفحة إدارة المرضى مع تمرير رسالة النجاح
        navigate('/admin/patient-management', { state: { successMessage: 'Patient created successfully!' } });
      } catch (error) {
        console.error("Error adding patient:", error);
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
        <div className="bg-white/20 p-2 rounded-xl"><LuPlus className="text-2xl text-white" /></div>
        <div>
          <h1 className="text-xl font-extrabold text-white">Add New Patient</h1>
          <p className="text-xs text-white opacity-80">Fill in the details to register a new patient in PulseX platform.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formBody}>
          {/* قسم رفع الصورة */}
          <div className="flex flex-col gap-4">
             <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Upload Photo</h3>
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
            <div className="flex items-center gap-2 text-[#333CF5] border-b border-gray-50 pb-4 mb-6">
              <LuUser className="text-xl" />
              <h3 className="font-bold">Patient Information</h3>
            </div>

            <div className={styles.gridInputs}>
              <InputField label="First Name" name="firstName" formik={formik} placeholder="Enter first name" />
              <InputField label="Last Name" name="lastName" formik={formik} placeholder="Enter last name" />
              <InputField label="Email Address" name="email" type="email" formik={formik} placeholder="patient@email.com" />
              <InputField label="Phone Number" name="phone" formik={formik} placeholder="+20 1000000000" />
              <InputField label="Date of Birth" name="dateOfBirth" type="date" formik={formik} />
              <InputField label="Location" name="location" formik={formik} placeholder="Enter patient location" />
            </div>

            {/* اختيار الجنس بستايل الكروت التفاعلية */}
            <div className="mt-8">
              <label className="text-sm font-bold block mb-4 text-[#010218]">Gender *</label>
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
             Create Patient
          </button>
        </div>
      </form>
    </div>
  );
}

// مكون فرعي للمدخلات لتقليل التكرار وضمان الـ Clean Code
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