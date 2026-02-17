import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // استيراد الهوك المطلوب
import { 
  HiOutlineBell, 
  HiOutlineCalendarDays, 
  HiOutlineClock, 
  HiOutlineXMark 
} from "react-icons/hi2";
import { FiCalendar } from "react-icons/fi";

const AdminHeader = () => {
  const navigate = useNavigate(); // تعريف دالة التنقل
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [adminData, setAdminData] = useState({ name: 'Tayem Zayed', role: 'Admin', image: '' });
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef();

  // دالة التعامل مع الضغط للذهاب للإعدادات
  const handleProfileClick = () => {
    navigate('/admin/settings'); // المسار المعرف في App.jsx
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const userRes = await axios.get('/api/admin/profile', { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (userRes.data) setAdminData(userRes.data);

        const notifRes = await axios.get('/api/notifications', { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        
        if (Array.isArray(notifRes.data)) {
          setNotifications(notifRes.data);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("API Error:", error);
        setNotifications([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = Array.isArray(notifications) 
    ? notifications.filter(n => !n.isRead).length 
    : 0;

  return (
    <div className="flex items-center justify-between w-full h-full" ref={notifRef}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[#333CF5] px-3 py-1.5 rounded-lg">
          <FiCalendar className="text-xl" />
          <span className="text-sm font-bold text-[#010218]">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-[#13D486]  px-3 py-1.5 rounded-lg">
          <HiOutlineClock className="text-xl" />
          <span className="text-sm font-bold text-[#010218]">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
       <button 
  onClick={() => setIsNotifOpen(!isNotifOpen)}
  className={`relative p-2.5 rounded-full transition-all duration-300 shadow-lg border border-gray-100 
    ${isNotifOpen 
      ? 'bg-[#333CF5] text-white shadow-[#333CF5]/40 scale-95' 
      : 'bg-white text-gray-400 hover:bg-gray-50 hover:shadow-xl'
    }`}
>
  <HiOutlineBell className="text-2xl" />
  
  {/* دائرة عدد الإشعارات */}
  {unreadCount > 0 && (
    <span className={`absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 font-bold transition-all
      ${isNotifOpen ? 'border-[#333CF5]' : 'border-white'}`}
    >
      {unreadCount}
    </span>
  )}
</button>

          {isNotifOpen && (
            <div className="absolute top-14 right-0 w-[380px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[24px] border border-gray-100 z-[100] overflow-hidden">
              <div className="p-5 bg-[#333CF5] text-white">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">Notifications</h3>
                  <button onClick={() => setIsNotifOpen(false)}><HiOutlineXMark /></button>
                </div>
                <p className="text-xs opacity-90">{unreadCount} unread notifications</p>
              </div>

              <div className="max-h-[350px] overflow-y-auto">
                {Array.isArray(notifications) && notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-gray-50 border-b border-gray-50 flex gap-3 relative">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#333CF5] shrink-0">
                        <HiOutlineClock />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-[#010218]">{n.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{n.description}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{n.timeAgo}</span>
                      </div>
                      {!n.isRead && <span className="w-2 h-2 bg-[#333CF5] rounded-full mt-2"></span>}
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-gray-400 text-sm">No notifications found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* معلومات المستخدم: تم إضافة Cursor Pointer و onClick */}
        <div 
          onClick={handleProfileClick} 
          className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src={adminData.image || 'https://via.placeholder.com/40'} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            alt="Admin"
          />
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-[#010218]">{adminData.name}</p>
            <p className="text-[10px] font-bold text-gray-400 text-left">{adminData.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;