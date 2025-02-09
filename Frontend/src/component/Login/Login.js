import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/slices/adminSlice"; // Import de l'action Redux
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const Login = ({ setLoginModal, setPasswordModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Récupération des états globaux depuis Redux
  const { loading, error, isFirstLogin } = useSelector((state) => state.admin);

  console.log(" État Redux :", useSelector((state) => state.admin));

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion avec email :", email);
      const resultAction = await dispatch(loginAdmin({ email, password }));

      if (loginAdmin.fulfilled.match(resultAction)) {
        console.log(" Connexion réussie :", resultAction.payload);

        const { isFirstLogin } = resultAction.payload;

        if (isFirstLogin) {
          console.log(" Première connexion, ouverture de la modal de changement de mot de passe...");
          setLoginModal(false); // Ferme la modal de connexion
          setPasswordModal(true); // Ouvre la modal de changement de mot de passe
        } else {
          console.log(" Redirection vers la page principale...");
          navigate("/"); // Redirige vers la page principale
        }
      } else {
        toast.error("Échec de la connexion : " + (resultAction.payload?.message || "Une erreur est survenue"));
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion :", error);
      toast.error("Une erreur s'est produite.");
    }
  };

  // Utiliser `useEffect` pour surveiller les changements de `isFirstLogin`
  useEffect(() => {
    if (isFirstLogin) {
      console.log(" `isFirstLogin` détecté, ouverture automatique de la modal !");
      setLoginModal(false);
      setPasswordModal(true);
    }
  }, [isFirstLogin, setLoginModal, setPasswordModal]);

  return (
    <div className="login-container main-content">
      <div className="container_form">
        <form onSubmit={handleLogin}>
          <span onClick={() => setLoginModal(false)}>x</span>
          <h3 className="titre__form">Connexion</h3>
          <div className="first_last">
            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
