import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PatientManagement.module.css';
import DataTable from '../DataTable/DataTable';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FiSearch, FiUpload, FiPlus } from "react-icons/fi";

export default function PatientManagement() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modal, setModal] = useState({ open: false, type: 'single' });

  useEffect(() => {
    // محاكاة بيانات المرضى
    const dummyPatients = Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      fullName: `Patient ${i + 1}`,
      email: `patient${i + 1}@example.com`,
      price: 150,
      joinedDate: "Jan 15, 2026"
    }));
    setPatients(dummyPatients);
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // دالة التصدير باستخدام التمبلت
  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      // تأكدي أن الملف موجود في مجلد public باسم pulse_template.xlsx
      const response = await fetch('/pulse_template.xlsx');
      const buffer = await response.arrayBuffer();
      await workbook.xlsx.load(buffer);
      
      const worksheet = workbook.getWorksheet(1);
      
      // تعبئة البيانات ابتداءً من الصف العاشر (مثلاً) كما فعلنا في الأطباء
      patients.forEach((patient, index) => {
        const row = worksheet.getRow(10 + index);
        row.getCell(2).value = index + 1;
        row.getCell(3).value = patient.fullName;
        row.getCell(4).value = patient.email;
        row.getCell(5).value = patient.price;
        row.commit();
      });

      const finalBuffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([finalBuffer]), 'Patients_Report.xlsx');
    } catch (e) {
      console.error("Export failed: Make sure pulse_template.xlsx is in the public folder", e);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.titleWithIcon}>
            <h1>Patient Management</h1>
            <span className={styles.iconSetting}>⚙️</span> 
          </div>
          <p>View, edit, and manage all registered patients.</p>
        </div>

        <div className={styles.topActions}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search Patients..." className={styles.searchInput} />
          </div>

          <button className={styles.exportBtn} onClick={handleExport}>
            <FiUpload /> Export
          </button>

          <button className={styles.addBtn} onClick={() => navigate('/admin/AddPatientBtn')}>
            <FiPlus /> Add Patient
          </button>
        </div>
      </div>

      <DataTable 
        data={patients} 
        selectedItems={selectedIds} 
        onToggle={toggleSelect} 
        onDeleteIndividual={() => setModal({open: true, type: 'single'})}
        onEdit={(item) => navigate(`/admin/edit-patient/${item.id}`)}
        // تمرير الدوال الجديدة لتهندل الـ Floating Bulk Bar المدمج
        onBulkDelete={() => setModal({open: true, type: 'bulk'})}
        onClearSelection={() => setSelectedIds([])}
      />

      <ConfirmModal 
        isOpen={modal.open}
        title={modal.type === 'bulk' ? `Delete ${selectedIds.length} Patients?` : "Delete Patient?"}
        onCancel={() => setModal({open: false})}
        onConfirm={() => { alert("Patients Deleted!"); setModal({open: false}); setSelectedIds([]); }}
      />
    </div>
  );
}
