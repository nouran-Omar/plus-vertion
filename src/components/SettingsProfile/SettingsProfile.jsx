import React, { useState } from 'react';
import { 
  LuUser, LuSettings, LuLock, LuBell, LuMoon, 
  LuMail, LuPhone, LuCalendar, LuMapPin, LuCheck 
} from "react-icons/lu";

export default function SettingsProfile() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // إخفاء التوست تلقائياً
  };

  return (
    <div className="p-10 bg-[#f9fafb] min-h-screen relative">
      {/* التوست الأخضر المطلب - يظهر في الأعلى */}
      {showToast && (
        <div className="fixed top-6 right-6 z-[10000] bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-100 animate-in fade-in slide-in-from-right-10 duration-300">
          <div className="bg-green-500 text-white p-1.5 rounded-full"><LuCheck size={20} /></div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">Saved Successfully</h4>
            <p className="text-xs text-gray-500">Your changes have been saved successfully</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">Settings & Profile <LuSettings className="text-gray-400" /></h1>
        <p className="text-gray-500 mt-2">Manage your personal details, health data, and account preferences.</p>
      </div>

      {/* كارت Personal Information المنسق */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-8">
        <div className="text-blue-600 font-bold flex items-center gap-3 mb-8">
          <LuUser size={22} /> <span>Personal Information</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* جزء الصورة */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-3xl overflow-hidden mb-3">
              <img src="https://ui-avatars.com/api/?name=Tayem+Zayed&background=333CF5&color=fff" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <span className="text-[10px] text-gray-400 text-center w-32">JPG, PNG or GIF. Max size 5MB</span>
          </div>

          {/* الـ Grid المنسق للـ Inputs لضمان عدم التمدد الرأسي */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <InputField label="First Name" icon={<LuUser />} val="Tayem" />
            <InputField label="Last Name" icon={<LuUser />} val="Zayed" />
            <InputField label="Email Address" icon={<LuMail />} val="Mohamed.salem@pulsex.com" />
            <InputField label="Phone Number" icon={<LuPhone />} val="+20 1234567890" />
            <InputField label="Date of Birth" icon={<LuCalendar />} val="1985-06-15" />
            <InputField label="Location" icon={<LuMapPin />} val="Cairo, Egypt" />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleSave} className="bg-[#333CF5] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <LuCheck /> Save Changes
          </button>
        </div>
      </div>

      {/* كارت Account Settings المنسق */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
        <div className="text-orange-500 font-bold flex items-center gap-3 mb-8">
          <LuSettings size={22} /> <span>Account Settings</span>
        </div>

        <div className="space-y-6">
          <SettingRow icon={<LuLock />} title="Change Password" desc="Update your password regularly for security" action={<button className="text-blue-600 font-bold text-sm">Change</button>} />
          <SettingRow icon={<LuBell />} title="Email Notifications" desc="Receive email updates about your account" action={<Toggle defaultChecked />} />
          <SettingRow icon={<LuMoon />} title="Dark Mode" desc="Switch to dark theme" action={<Toggle />} />
        </div>
      </div>
    </div>
  );
}

// مكون فرعي للـ Input لضمان توحيد الاستايل
function InputField({ label, icon, val }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="flex items-center bg-[#f9fafb] border border-gray-200 rounded-2xl px-4 py-3 gap-3">
        <span className="text-gray-400">{icon}</span>
        <input type="text" defaultValue={val} className="bg-transparent outline-none w-full text-sm text-gray-800" />
      </div>
    </div>
  );
}

// مكون فرعي للصفوف
function SettingRow({ icon, title, desc, action }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-4">
        <div className="text-gray-400 text-xl">{icon}</div>
        <div>
          <h4 className="font-bold text-[15px]">{title}</h4>
          <p className="text-gray-400 text-xs">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

// مكون التبديل (Toggle)
function Toggle({ defaultChecked }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );
}
