import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Import du store Redux
import { logout } from "./redux/slices/adminSlice";
import './App.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header/Header";
import DemandeDevis from "./pages/Devis/DemandeDevis";
import Agence from './pages/Agence/Agence';
import PermisConsruction from './pages/parmisConstruction/PermisConsruction';
import ChangePassword from './component/ChangePassword/ChangePassword';
import Footer from "./component/Footer/Footer";
import Amenagement from "./pages/Amenagement/Amenagement";
import MaitriseOeuvre from "./pages/MaitriseOeuvre/MaitriseOeuvre";
import Renovation from './pages/Renovation/Renovation';
import ModalContact from "./component/ModalContactAdmin/ModalContact";
import Login from './component/Login/Login';
import Extension from './pages/Extension/Extension';
import AdminRoutes from "./pages/AdminDashboard/AdminRoutes";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Récupérez les états globaux depuis Redux
  const { token, isFirstLogin } = useSelector((state) => state.admin);
  const isAuthenticated = !!token; // Vérifie si un token est présent

  // États locaux pour les modales
  const [contactModal, setContactModal] = React.useState(false);
  const [loginModal, setLoginModal] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);

  // Fonction de déconnexion
  const unlog = () => {
    dispatch(logout());
    toast("Déconnexion réussie", { type: "info" });
  };

  // Effet pour ouvrir la modal de changement de mot de passe après connexion
  useEffect(() => {
    if (isAuthenticated && isFirstLogin) {
      setPasswordModal(true);
    }
  }, [isAuthenticated, isFirstLogin]);

  // Vérifie si la route commence par "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Header pour les routes qui ne sont pas des routes Admin */}
      {!isAdminRoute && (
        <Header
          isAuthenticated={isAuthenticated}
          unlog={unlog}
          setContactModal={setContactModal}
          setLoginModal={setLoginModal}
        />
      )}

      {/* Modales */}
      {contactModal && <ModalContact setContactModal={setContactModal} />}
      {loginModal && (
        <Login
          setLoginModal={setLoginModal}
          setPasswordModal={setPasswordModal}
        />
      )}
      {passwordModal && (
        <ChangePassword
          setPasswordModal={setPasswordModal}
        />
      )}

      {/* Notifications Toast */}
      <ToastContainer position="bottom-left" autoClose={3000} closeButton={false} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Agence />} />
        <Route path="/Maître-oeuvre" element={<MaitriseOeuvre />} />
        <Route path="/demande-devis" element={<DemandeDevis />} />
        <Route path="/renovation" element={<Renovation />} />
        <Route path="/permis-construction" element={<PermisConsruction />} />
        <Route path="/amenagement" element={<Amenagement />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>

      {/* Footer pour les routes non Admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
