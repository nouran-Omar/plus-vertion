import React, { useState } from 'react';
// استبدلنا الأيقونة المسببة للخطأ بـ HiChatBubbleBottomCenterText المضمونة
import { HiCheck, HiChevronRight, HiChevronLeft, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import Container from '../HomeSectionWrapper/HomeSectionWrapper';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Stories.module.css';

const STORIES_DATA = [
    {
        id: 1,
        name: "Ghada Ali",
        age: "70",
        condition: "Hypertension",
        quote: "After my heart attack scare, Pulse AI became my lifeline. The AI risk assessment showed I was at high risk, but with personalized care, I reduced my risk score from 85% to 23% in 8 months.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-62%", time: "8 months", bpm: "-15 BPM" },
        progress: 62,
        tags: ["High Risk", "Recovery"]
    },
    {
        id: 2,
        name: "Ahmed Hassan",
        age: "55",
        condition: "Arrhythmia",
        quote: "I never realized how irregular my heartbeat was until I used the ECG feature. The instant alerts helped me seek medical attention right before a critical episode. PulseX truly saved my life.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-45%", time: "6 months", bpm: "Stable" },
        progress: 85,
        tags: ["Early Detection", "Monitoring"]
    },  {
        id: 3,
        name: "Ghada Ali",
        age: "70",
        condition: "Hypertension",
        quote: "After my heart attack scare, Pulse AI became my lifeline. The AI risk assessment showed I was at high risk, but with personalized care, I reduced my risk score from 85% to 23% in 8 months.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-62%", time: "8 months", bpm: "-15 BPM" },
        progress: 62,
        tags: ["High Risk", "Recovery"]
    },  {
        id: 4,
        name: "Ghada Ali",
        age: "70",
        condition: "Hypertension",
        quote: "After my heart attack scare, Pulse AI became my lifeline. The AI risk assessment showed I was at high risk, but with personalized care, I reduced my risk score from 85% to 23% in 8 months.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-62%", time: "8 months", bpm: "-15 BPM" },
        progress: 62,
        tags: ["High Risk", "Recovery"]
    }
];

const Stories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => currentIndex < STORIES_DATA.length - 1 && setCurrentIndex(prev => prev + 1);
    const prevSlide = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);

    return (
        <section id="stories" className={styles.section}>
            <Container>
                <SectionHeader 
                    title="Recovery Stories" 
                    subtitle="Real patients, real results - inspiring journeys to better heart health" 
                />

                <div className="relative max-w-[1000px] mx-auto mt-12">
                    {/* الكارت الرئيسي */}
                    <div className={styles.card}>
                        <div 
                            className="flex h-full transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {STORIES_DATA.map((story) => (
                                <div key={story.id} className="w-full flex-shrink-0 flex items-center p-16 gap-16">
                                    
                                    {/* الجزء الأيسر */}
                                    <div className="w-1/3 flex flex-col items-center text-center space-y-6">
                                        <div className="relative">
                                            <img src={story.image} alt={story.name} className={styles.patientImage} />
                                            <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#059669] border-4 border-white rounded-full flex items-center justify-center text-white shadow-sm">
                                                <HiCheck strokeWidth={3} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-bold text-[#010218]">{story.name}</h3>
                                            <p className="text-[#757575]">Age {story.age}</p>
                                            <p className="text-[#333CF5] font-semibold">{story.condition}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {story.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] bg-indigo-50 text-[#333CF5] px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* الجزء الأيمن */}
                                    <div className="w-2/3 space-y-8">
                                        <div className="relative">
                                            <HiChatBubbleBottomCenterText className="text-[#333CF5]/10 w-16 h-16 absolute -top-8 -left-10" />
                                            <p className="text-xl italic text-[#010218] leading-relaxed relative z-10">
                                                "{story.quote}"
                                            </p>
                                        </div>

                                        <div className="flex justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <StatBlock label="Risk Reduction" value={story.stats.risk} color="text-[#059669]" />
                                            <StatBlock label="Recovery Time" value={story.stats.time} color="text-[#333CF5]" />
                                            <StatBlock label="BPM Improved" value={story.stats.bpm} color="text-[#D97706]" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm font-bold text-[#757575] uppercase tracking-wider">Recovery Progress</span>
                                                <span className="text-lg font-black text-[#010218]">{story.progress}%</span>
                                            </div>
                                            <div className={styles.progressBarBase}>
                                                <div 
                                                    className={styles.progressBarFill} 
                                                    style={{ width: `${story.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 text-[#059669] font-bold text-sm">
                                                <MdVerified size={20} />
                                                <span>Verified Patient Story</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* أزرار التنقل */}
                    <button onClick={prevSlide} disabled={currentIndex === 0} className={`${styles.navBtn} -left-16`}>
                        <HiChevronLeft size={28} />
                    </button>
                    <button onClick={nextSlide} disabled={currentIndex === STORIES_DATA.length - 1} className={`${styles.navBtn} -right-16`}>
                        <HiChevronRight size={28} />
                    </button>
                </div>

                <div className="flex justify-center gap-3 mt-12">
                    {STORIES_DATA.map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => setCurrentIndex(i)}
                            className={`${styles.dot} ${currentIndex === i ? 'w-8 bg-[#333CF5]' : 'w-8 bg-gray-200 hover:bg-gray-300'}`}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

const StatBlock = ({ label, value, color }) => (
    <div className="text-center space-y-1">
        <p className={`text-2xl font-black ${color}`}>{value}</p>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
    </div>
);

export default Stories;