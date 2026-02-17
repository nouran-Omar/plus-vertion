import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logo from '../../../public/logo/logo.svg'; 
import ConfirmModal from '../ConfirmModal/ConfirmModal'; 
import { 
  HiOutlineUsers, 
  HiOutlineClock, 
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle // تم التصحيح هنا
} from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserDoctor, FaBookOpen } from "react-icons/fa6";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: 'dashboard', icon: <LuLayoutDashboard /> },
    { name: 'Doctor Management', path: 'doctor-management', icon: <FaUserDoctor /> },
    { name: 'Patient Management', path: 'patient-management', icon: <HiOutlineUsers /> },
    { name: 'Stories Management', path: 'stories-management', icon: <FaBookOpen /> },
    { name: 'Activity Logs', path: 'activity-logs', icon: <HiOutlineClock /> },
  ];

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className="mb-10 px-4 flex items-center gap-2">
        <img src={logo} alt="PulseX Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-[#010218]">
          Pulse<span className="text-[#333CF5]">X</span>
        </span>
      </div>

      <nav className="flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Menu</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.activeLink : ''}`
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">General</p>
          <div className="space-y-1">
            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.activeLink : ''}`
              }
            >
              <HiOutlineCog6Tooth className={styles.icon} />
              <span>Settings & Profile</span>
            </NavLink>

            <button onClick={() => setIsLogoutModalOpen(true)} className={styles.logoutBtn}>
              <HiOutlineArrowLeftOnRectangle className={styles.icon} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </nav>

      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Log Out?"
        desc="Are you sure you want to log out of your account?"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;