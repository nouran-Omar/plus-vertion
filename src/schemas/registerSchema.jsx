import * as Yup from 'yup';
import { MdOutlineError } from "react-icons/md";
import React from 'react';

const errorMsg = (msg) => (
  <div className="flex items-center gap-1 text-error text-[12px] mt-1 font-medium">
    <MdOutlineError size={14} />
    {msg}
  </div>
);

export const registerSchema = Yup.object().shape({
  // غيرنا fullName لـ firstName و lastName عشان تطابق الـ UI
  firstName: Yup.string()
    .min(2, errorMsg("First name too short"))
    .required(errorMsg("First name is required")),
    
  lastName: Yup.string()
    .min(2, errorMsg("Last name too short"))
    .required(errorMsg("Last name is required")),

  email: Yup.string()
    .email(errorMsg("Invalid email address"))
    .required(errorMsg("Email is required")),

  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, errorMsg("Invalid Egyptian phone number"))
    .required(errorMsg("Phone number is required")),

  // التاريخ: ضفنا nullable() عشان الـ Datepicker بيحتاجه
  dateOfBirth: Yup.date()
    .nullable()
    .required(errorMsg("Date of birth is required"))
    .max(new Date(), errorMsg("Date cannot be in the future")),

  gender: Yup.string()
    .oneOf(['male', 'female'], errorMsg("Please select your gender"))
    .required(errorMsg("Gender is required")),

  password: Yup.string()
    .min(8, errorMsg("At least 8 characters"))
    .required(errorMsg("Password is required")),

  // لو مش بتستخدمي confirmPassword في الـ UI حالياً ممكن تشيليها
  acceptTerms: Yup.boolean()
    .oneOf([true], errorMsg("You must accept the terms"))
});