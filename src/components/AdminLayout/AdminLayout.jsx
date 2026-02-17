import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import AdminHeader from '../AdminHeader/AdminHeader';

const AdminLayout = () => {
  return (
    /* 1. الحاوية الكبرى باللون الرمادي وتوزيع مرن p-5 تعطي المسافة الخارجية */
    <div className="flex min-h-screen bg-[#F6F7F8] font-inter p-5 gap-5 overflow-hidden">
      
      {/* 2. مكون السايد بار - قطعة بيضاء منفصلة وعائمة */}
      <aside className="w-[270px] h-[100vh] bg-white shadow-sm rounded-[24px] overflow-hidden border border-gray-100/50 flex flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* 3. الجزء الأيمن (يحتوي على الهيدر والمحتوى ومقسم بـ gap-5 لخلق مسافة رمادية بينهما) */}
      <div className="flex-1 flex flex-col gap-5 overflow-hidden">
        
        {/* مكون الهيدر - قطعة بيضاء منفصلة */}
        <header className="h-[72px] bg-white shadow-sm rounded-[20px] px-8 flex items-center justify-between border border-gray-100/50 shrink-0">
          <AdminHeader />
        </header>

        {/* مكون المحتوى الأساسي - قطعة بيضاء منفصلة وقابلة للتمرير */}
        <main className="flex-1 bg-white shadow-sm rounded-[24px] p-8 border border-gray-100/50 overflow-y-auto custom-scrollbar">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;