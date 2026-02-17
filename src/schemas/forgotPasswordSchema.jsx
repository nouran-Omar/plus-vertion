// src/schemas/forgotPasswordSchema.js
import * as Yup from 'yup';
import { MdOutlineError } from "react-icons/md";
import React from 'react';

// الدالة المساعدة لرسايل الخطأ (عشان نثبت الشكل في كل المشروع)
const errorMsg = (msg) => (
  <div className="flex items-center gap-1 text-error text-[10px] mt-1 font-medium">
    <MdOutlineError size={12} />
    {msg}
  </div>
);

// 1. مرحلة الإيميل
export const emailStageSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorMsg("Invalid email address"))
    .required(errorMsg("Email is required"))
});

// 2. مرحلة الكود (OTP)
export const otpStageSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]{4}$/, errorMsg("Must be exactly 4 digits"))
    .required(errorMsg("OTP is required"))
});

// 3. مرحلة الباسورد الجديد
export const resetPasswordStageSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, errorMsg("At least 8 characters"))
    .required(errorMsg("Password is required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], errorMsg("Passwords must match"))
    .required(errorMsg("Please confirm your password"))
});