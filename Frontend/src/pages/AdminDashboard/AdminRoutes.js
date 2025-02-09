import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import Contacts from './ContactManagement/Contacts';
import DevisManagement from './devisManagement/DevisManagement';
import DashboardHome from './DashboardHome/DashboardHome';
import NewUser from './NewContact/NewContact'
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Admin/>}>
        <Route index element={<DashboardHome />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/NewUser" element={<NewUser />} />
        <Route path="devis" element={<DevisManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
