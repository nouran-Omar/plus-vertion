import React, { useState, useEffect } from 'react';
import EditForm from '../../components/EditForm/EditForm';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

export default function EditPatient() {
  const [patientData, setPatientData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const dataFromBackEnd = {
      firstName: "Nouran",
      lastName: "Mahdy",
      email: "patient@email.com",
      phone: "+20 1100000000",
      dob: "1995-05-20",
      location: "Giza, Egypt",
      gender: "female"
    };
    setPatientData(dataFromBackEnd);
  }, []);

  return (
    <>
      <EditForm 
        title="Edit Patient" 
        type="Patient" 
        initialData={patientData} 
        onSave={(data) => console.log("Saving Patient", data)} 
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Delete Patient?"
        desc="Are you sure you want to remove this patient from the system?"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
