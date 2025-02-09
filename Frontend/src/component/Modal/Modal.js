import React, { useState } from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser} from '@fortawesome/free-solid-svg-icons';

const Modal = ({ user, isOpen, onClose, onSendMessage }) => {
  const [adminMessage, setAdminMessage] = useState("");

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (adminMessage.trim()) {
      onSendMessage(user._id, adminMessage);
      setAdminMessage("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="titre"><FontAwesomeIcon icon={faUser}/> <h2>{user.firstName} {user.lastName}</h2></div>
        <div className="phone"><FontAwesomeIcon icon={faPhone}/>  <h2>{user.phone}</h2></div>
        <div className="modal-messages">
          {user.projectDescriptions.length > 0 ? (
            user.projectDescriptions.map((desc, index) => (
              <div key={index} className="message">
                <p><strong>Message {index + 1} :</strong> {desc.description}</p>
                <span><em>Reçu le : {new Date(desc.date).toLocaleString()}</em></span>
              </div>
            ))
          ) : (
            <p>Aucun message disponible.</p>
          )}
        </div>
        <div className="modal-reply">
          <textarea
            placeholder="Répondre à l'utilisateur..."
            value={adminMessage}
            onChange={(e) => setAdminMessage(e.target.value)}
          ></textarea>
          <button onClick={handleSendMessage} className="send-button">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
