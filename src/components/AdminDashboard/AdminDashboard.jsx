import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // استيراد الهوك للتنقل
import styles from './AdminDashboard.module.css';
import AddDoctorBtn from '../AddDoctorBtn/AddDoctorBtn';
import AddPatientBtn from '../AddPatientBtn/AddPatientBtn';

// الأيقونات المطابقة للتصميم
import { LuStethoscope, LuUsers, LuUserPlus } from "react-icons/lu";
import { MdPersonAddAlt } from "react-icons/md";
import { BiUserCheck } from "react-icons/bi";
import { LuUserX } from "react-icons/lu";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    stats: { totalDoctors: 0, totalPatients: 0, newDoctors: 0, newPatients: 0 },
    doctors: [], 
    patients: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [stats, docs, pats] = await Promise.all([
          axios.get('/api/admin/stats', config).catch(() => ({ 
            data: { totalDoctors: 214, totalPatients: 1467, newDoctors: 12, newPatients: 154 } 
          })),
          axios.get('/api/admin/recent-doctors', config).catch(() => ({ data: [] })),
          axios.get('/api/admin/recent-patients', config).catch(() => ({ data: [] }))
        ]);

        setData({
          stats: stats.data,
          doctors: Array.isArray(docs.data) ? docs.data : [],
          patients: Array.isArray(pats.data) ? pats.data : []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {/* 1. Welcome Card - مع أزرار الإضافة السريعة */}
      <div className={styles.welcomeCard}>
        <h1>Welcome Back 👋</h1>
        <p>Manage doctors and patients across the PulseX platform.</p>
        <div className={styles.actions}>
  {/* زر إضافة دكتور - أبيض بنص وأيقونة زرقاء */}
  <button 
    onClick={() => navigate('/admin/AddDoctorBtn')}
    className="flex items-center gap-2 bg-white text-[#333CF5] px-7 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-blue-900/10 hover:scale-105 active:scale-95 transition-all duration-300"
  >
    <MdPersonAddAlt className="text-xl" />
    <span>Add Doctor</span>
  </button>

  {/* زر إضافة مريض - أزرق داكن بنص وأيقونة بيضاء */}
  <button 
    onClick={() => navigate('/admin/AddPatientBtn')}
    className="flex items-center gap-2 bg-[#0010A3] text-white px-7 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-black/20 hover:bg-[#000D85] hover:scale-105 active:scale-95 transition-all duration-300"
  >
    <MdPersonAddAlt className="text-xl" />
    <span>Add Patient</span>
  </button>
</div>
        {/* <div className={styles.actions}>
          <AddDoctorBtn />
          <AddPatientBtn />
        </div> */}
      </div>

      {/* 2. Stats Grid - كروت الإحصائيات العائمة */}
      <div className={styles.statsGrid}>
        <StatCard icon={<LuStethoscope />} label="Total Doctors" value={data.stats.totalDoctors} sub="Active practitioners" color="#333CF5" />
        <StatCard icon={<LuUsers />} label="Total Patients" value={data.stats.totalPatients} sub="Registered users" color="#13D486" />
        <StatCard icon={<LuUserPlus />} label="New Doctors" value={data.stats.newDoctors} sub="Last 7 days" color="#A333F5" />
        <StatCard icon={<LuUserPlus />} label="New Patients" value={data.stats.newPatients} sub="Last 7 days" color="#FF8A00" />
      </div>

      {/* 3. Tables Content */}
      <div className={styles.mainContent}>
        
        {/* Recent Doctors List */}
        <div className={styles.sectionCard}>
          <div className={styles.headerRow}>
            <h2>Recent Doctors</h2>
            <span className={styles.viewAll} onClick={() => navigate('/admin/doctor-management')}>View All</span>
          </div>
          
          {data.doctors.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{color: '#333CF5'}}><LuUserX /></div>
              <h3 className="font-bold text-lg mb-1">No Doctors Added Yet</h3>
              <p className="text-gray-400 text-sm max-w-[280px] mb-6">Start building your medical team by adding doctors.</p>
              <button 
                onClick={() => navigate('/admin/doctor-management')}
                className="bg-[#333CF5] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100"
              >
                + Add First Doctor
              </button>
            </div>
          ) : (
            <div className={styles.list}>
              {data.doctors.map(doc => (
                <div key={doc.id} className={styles.listItem}>
                  <div className="flex items-center gap-4">
                    <img src={doc.image || 'https://via.placeholder.com/45'} className="w-11 h-11 rounded-full object-cover" alt={doc.name} />
                    <div>
                      <p className="font-bold text-[#010218] text-sm">{doc.name}</p>
                      <p className="text-[11px] text-gray-400">{doc.email}</p>
                    </div>
                  </div>
                  <button className="text-[#333CF5] font-bold text-sm hover:underline" onClick={() => navigate(`/admin/edit-doctor/${doc.id}`)}>Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Patients List */}
        <div className={styles.sectionCard}>
          <div className={styles.headerRow}>
            <h2>Recent Patients</h2>
            <span className={styles.viewAll} onClick={() => navigate('/admin/patient-management')}>View All</span>
          </div>

          {data.patients.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{color: '#13D486'}}><LuUsers /></div>
              <h3 className="font-bold text-lg mb-1">No Patients Registered</h3>
              <p className="text-gray-400 text-sm max-w-[280px] mb-6">Your patient list is empty. Start adding patients.</p>
              <button 
                onClick={() => navigate('/admin/patient-management')}
                className="bg-[#13D486] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-green-100"
              >
                + Add First Patient
              </button>
            </div>
          ) : (
            <div className={styles.list}>
              {data.patients.map(p => (
                <div key={p.id} className={styles.listItem}>
                  <div className="flex items-center gap-4">
                    <img src={p.image || 'https://via.placeholder.com/45'} className="w-11 h-11 rounded-full object-cover" alt={p.name} />
                    <div>
                      <p className="font-bold text-[#010218] text-sm">{p.name}</p>
                      <p className="text-[11px] text-gray-400">{p.email}</p>
                    </div>
                  </div>
                  <button className="text-[#333CF5] font-bold text-sm hover:underline" onClick={() => navigate(`/admin/edit-patient/${p.id}`)}>Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// مكون فرعي للإحصائيات
const StatCard = ({ icon, label, value, sub, color }) => (
  <div className={styles.statCard}>
    <div className={styles.iconWrapper} style={{ backgroundColor: `${color}15`, color: color }}>
      {icon}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statSub}>{sub}</span>
    </div>
  </div>
);