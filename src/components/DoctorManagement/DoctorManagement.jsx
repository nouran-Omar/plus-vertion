import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DoctorManagement.module.css';
import DataTable from '../DataTable/DataTable';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FiSearch, FiUpload, FiPlus } from "react-icons/fi";

export default function DoctorManagement() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modal, setModal] = useState({ open: false, type: 'single' });

  useEffect(() => {
    const dummy = Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      fullName: i === 0 ? "Sandus Al-Attar" : `Doctor ${i + 1}`,
      email: "user@pulsex.com",
      price: 200,
      joinedDate: "March 12, 2023"
    }));
    setDoctors(dummy);
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const finalBuf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([finalBuf]), 'PulseX_Report.xlsx');
    } catch (e) { console.error("Export failed"); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.titleWithIcon}>
            <h1>Doctor Management</h1>
            <span className={styles.iconSetting}>⚙️</span> 
          </div>
          <p>View, edit, and manage all platform doctors.</p>
        </div>

        <div className={styles.topActions}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search" className={styles.searchInput} />
          </div>
          <button className={styles.exportBtn} onClick={handleExport}>
            <FiUpload /> Export
          </button>
          <button className={styles.addBtn} onClick={() => navigate('/admin/AddDoctorBtn')}>
            <FiPlus /> Add Doctor
          </button>
        </div>
      </div>

      <DataTable 
        data={doctors} 
        selectedItems={selectedIds} 
        onToggle={toggleSelect} 
        onDeleteIndividual={() => setModal({open: true, type: 'single'})}
        onEdit={(item) => navigate(`/admin/edit-doctor/${item.id}`)}
        // الدوال الجديدة للتحكم في الشريط المدمج
        onBulkDelete={() => setModal({open: true, type: 'bulk'})}
        onClearSelection={() => setSelectedIds([])}
      />

      <ConfirmModal 
        isOpen={modal.open}
        title={modal.type === 'bulk' ? `Delete ${selectedIds.length} Doctors?` : "Delete Doctor?"}
        onCancel={() => setModal({open: false})}
        onConfirm={() => { 
          alert("Deleted!"); 
          setModal({open: false}); 
          setSelectedIds([]); 
        }}
      />
    </div>
  );
}