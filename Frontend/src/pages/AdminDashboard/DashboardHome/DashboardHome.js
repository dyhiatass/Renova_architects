import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevisStats } from "../../../redux/slices/devisSlice"; // Import de l'action Redux


import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.scss";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Récupération des statistiques et des états globaux depuis Redux
  const { stats, loading, error } = useSelector((state) => state.devis);

  useEffect(() => {
    dispatch(fetchDevisStats()); // Récupérer les statistiques au chargement
  }, [dispatch]);

  console.log("État Redux `stats` :", stats);
  console.log("Loading :", loading);
  console.log("Error :", error);

  const monthLabels = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];

  // Vérifie que `stats` est bien défini avant d'afficher les graphiques
  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!stats || !stats.devisByMonth || !stats.devisByType) {
    return <p>Aucune donnée disponible</p>;
  }

  const devisByMonthData = {
    labels: stats.devisByMonth.map((stat) => monthLabels[stat._id - 1]) || [],
    datasets: [
      {
        label: "Devis par Mois",
        data: stats.devisByMonth.map((stat) => stat.count) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const devisByTypeData = {
    labels: stats.devisByType.map((stat) => stat._id) || [],
    datasets: [
      {
        label: "Devis par Type",
        data: stats.devisByType.map((stat) => stat.count) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const devisByMonthLineData = {
    labels: stats.devisByMonth.map((stat) => monthLabels[stat._id - 1]) || [],
    datasets: [
      {
        label: "Évolution des Devis",
        data: stats.devisByMonth.map((stat) => stat.count) || [],
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Bienvenue sur le Dashboard</h1>
      <div className="stats-overview">
        <h2>Total des Devis : {stats.totalDevis || 0}</h2>
      </div>
      <div className="charts">
        <div className="chart">
          <h3>Devis par Mois</h3>
          <Bar data={devisByMonthData} />
        </div>
        <div className="chart">
          <h3>Devis par Type</h3>
          <Pie data={devisByTypeData} />
        </div>
        <div className="chart">
          <h3>Évolution des Devis</h3>
          <Line data={devisByMonthLineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
