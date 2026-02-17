import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout/Layout' // تأكدي إنك عملتي استدعاء للـ Layout
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Register from './pages/Regester/Regester'; 
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import NotFound from './components/NotFound/NotFound'
import AdminLayout from './components/AdminLayout/AdminLayout';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DoctorManagement from './components/DoctorManagement/DoctorManagement';
import PatientManagement from './components/PatientManagement/PatientManagement';
import StoriesManagement from './components/StoriesManagement/StoriesManagement';
import ActivityLogs from './components/ActivityLogs/ActivityLogs';
import SettingsProfile from './components/SettingsProfile/SettingsProfile';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import AddDoctorBtn from './components/AddDoctorBtn/AddDoctorBtn';
import AddPatientBtn from './components/AddPatientBtn/AddPatientBtn';
import EditPatient from './components/EditPatient/EditPatient';
import EditDoctor from './components/EditDoctor/EditDoctor';

function App() {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // ده اللي جواه الـ Navbar والـ Footer
      children: [
        { index: true, element: <Home /> }, // الهوم هيظهر في الـ Outlet بتاع الـ Layout
        { path: "*", element: <NotFound /> }
      ]
    },
    // صفحات الـ Auth بتفضل بره الـ Layout
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> } ,
    { path: "/forgot-password", element: <ForgotPassword /> },
   {
   path: "/admin",
    element: <AdminLayout />, 
    children: [
      { index: true, element: <AdminDashboard /> }, 
      // قومي بإزالة الـ "/" من بداية المسارات الفرعية
      { path: "dashboard", element: <AdminDashboard /> }, 
      { path: "doctor-management", element: <DoctorManagement /> },
      { path: "patient-management", element: <PatientManagement /> },
      { path: "stories-management", element: <StoriesManagement /> },
      { path: "activity-logs", element: <ActivityLogs /> },
      { path: "settings", element: <SettingsProfile /> },
      { path: "AddDoctorBtn", element: <AddDoctorBtn /> },
        { path: "AddPatientBtn", element: <AddPatientBtn /> },{ path: "edit-doctor/:id", element: <EditDoctor /> },
{ path: "edit-patient/:id", element: <EditPatient /> },
    ]
  },
    { path: "/doctor/dashboard", element: <DoctorDashboard /> },
    { path: "/patient/dashboard", element: <PatientDashboard /> }
    ,// داخل App.jsx في قسم AdminLayout children

  ])

  return (
    <RouterProvider router={routing} />
  )
}

export default App;