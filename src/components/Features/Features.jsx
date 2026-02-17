import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Features.module.css';
import Container from '../HomeSectionWrapper/HomeSectionWrapper';

// أيقونات Lucide مطابقة للتصميم
import { 
  LuHeart, 
  LuQrCode, 
  LuBell, 
  LuFileText, 
  LuVideo,
  LuSparkles 
} from "react-icons/lu";

const FEATURES = [
  {
    id: 0,
    title: "Ai Heart Risk Score",
    description: "Advanced machine learning algorithms analyze your vital signs, lifestyle factors, and medical history to provide a comprehensive risk assessment with 95% accuracy.",
    stats: [
      { value: "95%", label: "Accuracy" }, 
      { value: "50+", label: "Data points" },
      { value: "Real-time", label: "Updates" }
    ],
    icon: <LuHeart />,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 1,
    title: "Emergency QR Codes",
    description: "Instant access to your complete medical profile for emergency responders. Critical information like blood type and allergies available in seconds.",
    stats: [
      { value: "Instant", label: "Access" }, 
      { value: "24/7", label: "Safe" },
      { value: "Global", label: "Standard" }
    ],
    icon: <LuQrCode />,
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Medication Reminders", 
    description: "Smart medication management with personalized reminders, drug interaction alerts, and adherence tracking to keep your treatment on track.",
    stats: [
      { value: "98%", label: "Adherence" }, 
      { value: "Daily", label: "Alerts" },
      { value: "Smart", label: "Tracking" }
    ],
    icon: <LuBell />,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Full Medical Records",
    description: "Comprehensive digital health records with secure cloud storage. Access your lab results, prescriptions, and history anytime, anywhere.",
    stats: [
      { value: "Secure", label: "Storage" }, 
      { value: "100%", label: "Private" },
      { value: "Cloud", label: "Sync" }
    ],
    icon: <LuFileText />,
    image: "https://images.unsplash.com/photo-1504813184591-01592fd03cfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Doctor Follow-ups",
    description: "Connect with certified cardiologists for virtual consultations. Get personalized care plans and expert advice without leaving your home.",
    stats: [
      { value: "Expert", label: "Advice" }, 
      { value: "HD", label: "Video" },
      { value: "Direct", label: "Chat" }
    ],
    icon: <LuVideo />,
    image: "https://images.unsplash.com/photo-1584982329699-07a9c1dd4a67?auto=format&fit=crop&q=80&w=800"
  }
];

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = FEATURES[activeTab];

  return (
    <section id="features" className={styles.section}>
      <Container>
        {/* Header - مطابق للصورة */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#010218] mb-4">Comprehensive Heart Health Features</h2>
          <p className="text-lg text-[#757575] max-w-2xl mx-auto">
            Advanced AI-powered tools for complete cardiovascular monitoring and care
          </p>
        </div>

        {/* Feature Main Card */}
        <div className={styles.featureCard}>
          <div className="grid lg:grid-cols-2 gap-10 items-center h-full p-8 md:p-16">
            
            {/* Left Content */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={styles.iconBox}>
                      {current.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-[#010218]">{current.title}</h3>
                  </div>

                  <p className="text-[#757575] text-lg leading-relaxed mb-10 min-h-[90px]">
                    {current.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="flex flex-wrap gap-12 mb-12">
                    {current.stats.map((stat, index) => (
                      <div key={index} className="space-y-1 border-l-2 border-gray-100 pl-4">
                        <p className="text-2xl font-black text-[#010218]">{stat.value}</p>
                        <p className="text-[11px] font-bold text-[#A3A3A3] uppercase tracking-widest">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-3 max-w-sm">
                    <div className="flex justify-between text-[11px] font-bold text-[#A3A3A3] uppercase">
                      <span>Feature {activeTab + 1} of 5</span>
                      <span>{(activeTab + 1) * 20}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <motion.div 
                        className={styles.progressBar}
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeTab + 1) * 20}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Visuals */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <img 
                    src={current.image} 
                    alt={current.title}
                    className="w-full h-[450px] object-cover rounded-[32px] shadow-2xl border-[12px] border-white"
                  />
                  {/* Decorative Icon */}
                  <div className={styles.decoBadge}>
                    <LuSparkles />
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className={styles.imageShadow} />
            </div>
          </div>

          {/* Navigation Tabs - */}
          <div className={styles.tabsWrapper}>
            {FEATURES.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`${styles.tabItem} ${activeTab === index ? styles.activeTab : ''}`}
              >
                {feature.icon}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;
