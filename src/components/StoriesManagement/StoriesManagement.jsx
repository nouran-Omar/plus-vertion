import React from 'react'
import { useState, useEffect } from 'react'
import styles from './StoriesManagement.module.css'  
import { HiOutlineClock } from "react-icons/hi2";    
export default function StoriesManagement() {
    const  [COUNT, setCOUNT] = useState(0);
  return (
   <div className={styles.comingSoonContainer}>
      <div className={styles.content}>
        <HiOutlineClock className={styles.mainIcon} />
        <h1>Coming Soon</h1>
        <p>This feature is under development. Stay tuned!</p>
      </div>
    </div>
  )
}
