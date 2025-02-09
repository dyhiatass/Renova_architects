import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDevis,
  deleteDevis,
} from "../../../redux/slices/devisSlice"; //Import Redux correct
import "./DevisManagement.scss";

const DevisManagement = () => {
  const dispatch = useDispatch();

  // Récupération des données Redux
  const { devisList = [], loading, error } = useSelector((state) => state.devis);

  // États locaux
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //  Charger les devis au montage
  useEffect(() => {
    dispatch(fetchAllDevis());
  }, [dispatch]);

  // Supprimer un devis
  const handleDelete = async (id) => {
    if (!id) {
      alert("Erreur : ID du devis invalide.");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) {
      try {
        await dispatch(deleteDevis(id)).unwrap();
        alert("Devis supprimé avec succès.");
      } catch (error) {
        alert(`Erreur : ${error?.message || "Suppression échouée"}`);
      }
    }
  };

  // Trier les devis par date
  const handleSortByDate = () => {
    const sortedDevis = [...devisList].sort((a, b) => {
      const dateA = new Date(a.dateDevis || a.createdAt); // 🔹 Vérifier quelle date utiliser
      const dateB = new Date(b.dateDevis || b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Gestion de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevis = devisList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="devis-management">
      <h2 className="title">Gestion des Devis</h2>

      {/*  Bouton de tri */}
      <button onClick={handleSortByDate} className="sort-btn">
        Trier par date ({sortOrder === "asc" ? "Ascendant" : "Descendant"})
      </button>

      {/* Gestion des erreurs et du chargement */}
      {loading && <p>Chargement des devis...</p>}
      {error && <p className="error">{error?.message || "Une erreur est survenue"}</p>}

      {/* Tableau des devis */}
      <table className="devis-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Messages</th>
            <th>Questionnaires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDevis.map((devis) => (
            <tr key={devis?._id}>
              <td>{devis?.firstName} {devis?.lastName}</td>
              <td>{devis?.email}</td>
              <td>{devis?.phone}</td>
              <td>{devis?.address}, {devis?.postalCode} {devis?.city}</td>
              <td>
                {devis.projectDescriptions?.map((desc, index) => (
                  <div key={`project-${index}`}>
                    <strong>({desc.date})</strong>: <br />{desc.description}
                  </div>
                ))}
              </td>
              <td>
                {devis.questionnaire?.map((q, index) => (
                  <div key={`questionnaire-${index}`}>
                    <strong>{q.description}</strong> ({q.date})
                    <ul>
                      {q.questions.map((question, qIndex) => (
                        <li key={`question-${index}-${qIndex}`}>
                          {question.question}: <strong>{question.answer}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </td>
              <td className="actions">
                <button onClick={() => handleDelete(devis?._id)} className="delete-btn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(devisList.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DevisManagement;
