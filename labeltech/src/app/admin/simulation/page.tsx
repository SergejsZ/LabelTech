"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Loading from "@/components/Loading";
import axios from "axios";
import Chart from "chart.js/auto";

const Simulation = () => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({
    TotalNumberErrors: 0,
    TotalScanned: 0,
  });

  function startSimulation() {
    axios
      .post("http://localhost:4000/api/systemSimulation1", {})
      .then((response) => {
        console.log("Simulation started successfully:");
      })
      .catch((error) => {
        console.error("Error running simulation:", error);
      });
  }

  function startSimulation2() {
    axios
      .post("http://localhost:4000/api/systemSimulation2", {})
      .then((response) => {
        console.log("Simulation started successfully:");
      })
      .catch((error) => {
        console.error("Error running simulation:", error);
      });
  }

  function stopSimulation() {
    axios
      .post("http://localhost:4000/api/simulation/stop", {})
      .then((response) => {
        console.log("Simulation stopped successfully:");
      })
      .catch((error) => {
        console.error("Error running simulation:", error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/productData"
        );
        console.log("Fetched data:", response.data);
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      drawCharts();
    }
  }, [loading, productData]);

  const drawCharts = () => {
    // Draw error chart
    const errorCanvas = document.getElementById(
      "errorChart"
    ) as HTMLCanvasElement | null;
    if (errorCanvas) {
      // Check if a chart instance already exists
      const existingErrorChart = Chart.getChart(errorCanvas);
      if (existingErrorChart) {
        existingErrorChart.destroy(); // Destroy the existing chart
      }

      const errorChart = new Chart(errorCanvas, {
        type: "bar",
        data: {
          labels: ["Line 1"],
          datasets: [
            {
              // label: "Errors",
              // data: [productData.TotalNumberErrors],
              // borderColor: "red",
              // fill: false,

              label: "Errors",
              data: [productData.TotalNumberErrors],
              backgroundColor: "red", // Specify color for bars
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: false, // Disable animations
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Draw total scanned chart
    const totalScannedCanvas = document.getElementById(
      "totalScannedChart"
    ) as HTMLCanvasElement | null;
    if (totalScannedCanvas) {
      // Check if a chart instance already exists
      const existingTotalScannedChart = Chart.getChart(totalScannedCanvas);
      if (existingTotalScannedChart) {
        existingTotalScannedChart.destroy(); // Destroy the existing chart
      }

      const totalScannedChart = new Chart(totalScannedCanvas, {
        type: "bar",
        data: {
          labels: ["Line 1"],
          datasets: [
            {
              // label: "Total Scanned",
              // data: [productData.TotalScanned],
              // borderColor: "blue",
              // fill: false,

              label: "Total Scanned",
              data: [productData.TotalScanned],
              backgroundColor: "blue", // Specify color for bars
              borderColor: "blue",
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: false, // Disable animations
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <div>
        <button
          className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={startSimulation}
        >
          Simulate 1 Line
        </button>

        <button
          className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={startSimulation2}
        >
          Simulate 5 Lines
        </button>

        <button
          className="bg-red-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={stopSimulation}
        >
          Stop Simulation
        </button>
      </div>

      <div style={{ width: "600px", height: "400px" }}>
        <div>
          <h2></h2>
          <canvas id="errorChart" width="100px" height="50px"></canvas>
        </div>

        <div>
          <h2></h2>
          <canvas id="totalScannedChart" width="100px" height="50px"></canvas>
        </div>
      </div>
    </PageLayout>
  );
};

export default Simulation;
