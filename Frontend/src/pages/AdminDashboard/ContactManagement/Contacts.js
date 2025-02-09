import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUsers } from "../../../redux/slices/contactSlice"; // Import des actions Redux
import "./styleContact.scss";
import { FaTrash, FaPlus } from "react-icons/fa";
import Modal from "../../../component/Modal/Modal";

const ContactManagement = () => {
  const dispatch = useDispatch();
  
  // Sélection des contacts et état global via Redux
  const { contacts, loading, error } = useSelector((state) => state.contact) || { contacts: [] };

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentContact, setCurrentContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactsPerPage = 15;

  useEffect(() => {
    dispatch(fetchUsers()); // Charger les contacts au démarrage
  }, [dispatch]);

  const handleCheckboxChange = (id) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async () => {
    if (selectedContacts.length === 0) return;

    dispatch(deleteUsers(selectedContacts));
    setSelectedContacts([]);
  };

  const handleOpenModal = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentContact(null);
    setIsModalOpen(false);
  };

  if (!contacts) return <p>Aucune donnée disponible...</p>;

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container_table">
      {loading && <p>Chargement des contacts...</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={(e) => e.preventDefault()} className="delete-form">
        <div className="btn-group">
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
            disabled={selectedContacts.length === 0}
          >
            <FaTrash fontSize={20} color="#1c4344" />
          </button>
          <a className="add-button" href="/admin/contacts/NewContact">
            <FaPlus fontSize={20} color="#1c4344" />
          </a>
        </div>

        <div className="table">
          <div className="my-row header-row">
            <div className="cell checkbox-cell">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedContacts(
                    e.target.checked ? contacts.map((contact) => contact._id) : []
                  )
                }
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
              />
            </div>
            <div className="cell">Email</div>
            <div className="cell">Nom</div>
            <div className="cell">Prénom</div>
            <div className="cell">Téléphone</div>
            <div className="cell">Voir Messages</div>
          </div>
          {currentContacts.map((contact) => (
            <div className="my-row" key={contact._id}>
              <div className="cell checkbox-cell">
                <input
                  type="checkbox"
                  name="contact_ids[]"
                  value={contact._id}
                  onChange={() => handleCheckboxChange(contact._id)}
                  checked={selectedContacts.includes(contact._id)}
                />
              </div>
              <div className="cell">{contact.email}</div>
              <div className="cell">{contact.firstName}</div>
              <div className="cell">{contact.lastName}</div>
              <div className="cell">{contact.phone}</div>
              <div className="cell">
                <button onClick={() => handleOpenModal(contact)} className="view-button">
                  Voir Messages
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pagination-button ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          ))}
        </div>
      </form>

      {isModalOpen && (
        <Modal
          user={currentContact}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ContactManagement;
