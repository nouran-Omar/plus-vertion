import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../../components/EditForm/EditForm';

export default function EditDoctor() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // محاكاة جلب البيانات من الباك إند
    setData({
      firstName: "Tayem",
      lastName: "Zayed",
      email: "doctor@pulsex.com",
      phone: "+20 1000000000",
      gender: "female" // ستظهر باللون الوردي تلقائياً
    });
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <EditForm 
      title="Edit Doctor" 
      type="Doctor" 
      initialData={data} 
      onSave={(vals) => console.log("Saving...", vals)}
      onDelete={() => alert("Deleting...")}
    />
  );
}
