import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../HomeSectionWrapper/HomeSectionWrapper';
import styles from './Doctors.module.css'; // استيراد الستيل موديول

import { HiStar, HiShieldCheck, HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { MdPeopleAlt, MdSpeed, MdMonitorHeart } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Aya Fathy Saed",
    role: "Interventional Cardiologist",
    exp: "15+ years",
    rating: "4.9",
    patients: "2,847",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=300&h=300",
    metrics: { hr: "68 BPM", bp: "120/80", risk: "15%", status: "Normal" }
  },
  {
    id: 2,
    name: "Dr. Omar Khaled",
    role: "Cardiac Surgeon",
    exp: "12+ years",
    rating: "4.8",
    patients: "1,530",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    metrics: { hr: "72 BPM", bp: "118/75", risk: "10%", status: "Excellent" }
  },
  {
    id: 3,
    name: "Dr. Sarah Ahmed",
    role: "Clinical Cardiologist",
    exp: "8+ years",
    rating: "5.0",
    patients: "3,100",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    metrics: { hr: "65 BPM", bp: "122/82", risk: "12%", status: "Normal" }
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Doctors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => currentIndex < DOCTORS.length - 1 && setCurrentIndex(prev => prev + 1);
  const prevSlide = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);

  return (
    <section id="doctors" className="bg-[#F9FAFB] py-20 overflow-hidden font-sans">
      <Container>
        <div className="mb-16 text-center mx-auto max-w-[850px]">
          <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} className="text-4xl font-bold text-[#010218] mb-4">
            Expert Cardiologists
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} className="text-lg text-[#757575]">
            Our AI-powered platform connects you with board-certified cardiologists who specialize in remote monitoring and preventive care.
          </motion.p>
        </div>

        <div className="relative max-w-[1000px] mx-auto">
          {/* حاوية السلايدر */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[450px]">
            <motion.div 
              className="flex" 
              animate={{ x: `-${currentIndex * 100}%` }} 
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {DOCTORS.map((doctor) => (
                <div key={doctor.id} className="w-full flex-shrink-0 p-8 md:p-16">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* جهة بيانات الدكتور */}
                    <div className="space-y-6 w-full text-left">
                      <div className="relative w-fit">
                        <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#333CF5]/10 shadow-md" />
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#22C55E] border-2 border-white rounded-full"></div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-[#111827]">{doctor.name}</h3>
                        <p className="text-[#333CF5] font-semibold">{doctor.role}</p>
                        <p className="text-[#737373] text-sm mt-1">{doctor.exp} experience</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                          <HiStar className="text-yellow-400 w-5 h-5" />
                          <span className="font-bold text-[#111827]">{doctor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MdPeopleAlt className="text-[#737373] w-5 h-5" />
                          <span className="text-[#737373]">{doctor.patients} Patients</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 bg-[#F0FDF4] text-[#15A96D] rounded-full w-fit text-sm font-medium">
                        <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                        Available Now
                      </div>
                    </div>

                    {/* جهة المربعات الحيوية وأنيميشن القلب */}
                    <div className="w-full space-y-5 bg-[#F9FBFF] p-6 rounded-2xl border border-[#333CF5]/5">
                      <div className="flex items-center gap-2 mb-2">
                        <MdMonitorHeart className="text-[#333CF5] size-6" />
                        <h4 className="text-lg font-bold text-[#111827]">Live Patient Monitor</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <MetricRow icon={<FaHeartbeat />} label="Heart Rate" value={doctor.metrics.hr} />
                        <MetricRow icon={<MdSpeed />} label="Blood Pressure" value={doctor.metrics.bp} />
                        <MetricRow icon={<HiShieldCheck />} label="Risk Score" value={doctor.metrics.risk} />
                      </div>

                      {/* ECG Animation Container */}
                      <div className="h-20 bg-white rounded-xl border border-gray-100 p-2 relative overflow-hidden flex items-center">
                        <svg className="w-full h-12" viewBox="0 0 300 40">
                          <path 
                            d="M0 20 L40 20 L45 10 L50 30 L55 20 L150 20 L155 5 L160 35 L165 20 L210 20 L215 10 L220 30 L225 20 L300 20" 
                            fill="none" 
                            stroke="#059669" 
                            strokeWidth="2.5" 
                            className={styles.ecgPath} 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* أزرار التحكم - تختفي عند البداية والنهاية */}
          <button 
            onClick={prevSlide} 
            className={`${styles.sliderButton} -left-6 md:-left-16 ${currentIndex === 0 ? styles.hiddenBtn : ''}`}
          >
            <HiChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide} 
            className={`${styles.sliderButton} -right-6 md:-right-16 ${currentIndex === DOCTORS.length - 1 ? styles.hiddenBtn : ''}`}
          >
            <HiChevronRight size={24} />
          </button>

          {/* نقاط التنقل (Dots) تحت الديف */}
          <div className={styles.dotContainer}>
            {DOCTORS.map((_, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

const MetricRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
    <div className="flex items-center gap-3">
      <span className="text-[#333CF5] text-lg">{icon}</span>
      <span className="text-[#737373] text-sm font-medium">{label}</span>
    </div>
    <span className="font-bold text-[#111827]">{value}</span>
  </div>
);

export default Doctors;