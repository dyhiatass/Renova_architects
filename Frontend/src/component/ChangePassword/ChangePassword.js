import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "../../redux/slices/adminSlice"; // Import de l'action Redux
import "./style.scss";

const ChangePassword = ({ setPasswordModal }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer le chargement, le succès et l'erreur depuis Redux
  const { loading, error, successMessage } = useSelector((state) => state.admin);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const resultAction = await dispatch(changePassword({ newPassword }));

      if (changePassword.fulfilled.match(resultAction)) {
        toast.success("Mot de passe modifié avec succès !");
        setPasswordModal(false);
        navigate("/");
      } else {
        toast.error(
          "Échec de la modification du mot de passe : " +
            (resultAction.payload?.message || "Erreur inconnue")
        );
      }
    } catch (error) {
      toast.error("Une erreur s'est produite.");
    }
  };

  return (
    <div className="password-container main-content">
      <div className="container_form">
        <form onSubmit={handleChangePassword}>
          <span onClick={() => setPasswordModal(false)}>x</span>
          <h3 className="titre__form">Changer le mot de passe</h3>
          <div className="first_last">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Modification..." : "Changer"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
