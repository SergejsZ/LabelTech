"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Loading from "@/components/Loading";
import axios from "axios";
import Chart from "chart.js/auto";

const Simulation = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLine, setSelectedLine] = useState(""); // State to hold the selected line

  const lines = [
    "Line 1",
    "Line 2",
    "Line 3",
    "Line 4",
    "Line 5",
    "Line 6",
    "Line 7",
    "Line 8",
    "Line 9",
    "Line 10",
  ];
  // const [productData, setProductData] = useState({
  //   TotalNumberErrors: 0,
  //   TotalScanned: 0,
  // });
  const [productData, setProductData] = useState({
    Line1: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line2: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line3: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line4: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line5: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line6: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line7: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line8: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line9: { TotalNumberErrors: 0, TotalScanned: 0 },
    Line10: { TotalNumberErrors: 0, TotalScanned: 0 },
  });

  function startSimulation() {
    axios
      .post("http://localhost:4000/api/systemSimulation1", {})
      .then((response) => {
        setIsSimulationRunning(true);
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
        setIsSimulationRunning(true);
        console.log("Simulation started successfully:");
      })
      .catch((error) => {
        console.error("Error running simulation:", error);
      });
  }

  function startSimulation3() {
    axios
      .post("http://localhost:4000/api/systemSimulation3", {})
      .then((response) => {
        setIsSimulationRunning(true);
        console.log("Simulation started successfully:");
      })
      .catch((error) => {
        console.error("Error running simulation:", error);
      });
  }

  function startLine() {
    axios
      .post(`http://localhost:4000/api/startLine/${selectedLine}`, {})
      .then((response) => {
        setIsSimulationRunning(true);
        console.log("Simulation started successfully:");
      })
      .catch((error) => {
        console.error("Error running simulation:", error);
      });
  }

  // function stopSimulation() {
  //   axios
  //     .post("http://localhost:4000/api/simulation/stop", {})
  //     .then((response) => {
  //       setIsSimulationRunning(false);
  //       console.log("Simulation stopped successfully:");
  //     })
  //     .catch((error) => {
  //       console.error("Error running simulation:", error);
  //     });
  // }

  const stopSimulation = () => {
    // Check if a line is selected
    if (selectedLine) {
      axios
        .post(`http://localhost:4000/api/simulation/stop/${selectedLine}`)
        .then((response) => {
          setIsSimulationRunning(false);
          console.log(
            `Simulation stopped successfully for ${selectedLine}:`,
            response.data
          );
        })
        .catch((error) => {
          console.error("Error stopping simulation:", error);
        });
    } else {
      console.error("No line selected to stop simulation.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/productData"
        );
        console.log("Fetched data:", response.data);
        //setProductData(response.data);
        // Inside useEffect
        setProductData({
          Line1: response.data[0],
          Line2: response.data[1],
          Line3: response.data[2],
          Line4: response.data[3],
          Line5: response.data[4],
          Line6: response.data[5],
          Line7: response.data[6],
          Line8: response.data[7],
          Line9: response.data[8],
          Line10: response.data[9],
        });
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
          labels: [
            "Line 1",
            "Line 2",
            "Line 3",
            "Line 4",
            "Line 5",
            "Line 6",
            "Line 7",
            "Line 8",
            "Line 9",
            "Line 10",
          ],
          datasets: [
            {
              //label: "Errors",
              data: [
                productData.Line1.TotalNumberErrors,
                productData.Line2.TotalNumberErrors,
                productData.Line3.TotalNumberErrors,
                productData.Line4.TotalNumberErrors,
                productData.Line5.TotalNumberErrors,
                productData.Line6.TotalNumberErrors,
                productData.Line7.TotalNumberErrors,
                productData.Line8.TotalNumberErrors,
                productData.Line9.TotalNumberErrors,
                productData.Line10.TotalNumberErrors,
              ],
              backgroundColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "purple",
                "orange",
                "cyan",
                "magenta",
                "lime",
                "indigo",
              ],
              borderColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "purple",
                "orange",
                "cyan",
                "magenta",
                "lime",
                "indigo",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: false,
          scales: {
            y: {
              title: {
                display: true,
                text: "No. of Errors",
              },
              //beginAtZero: true,
              suggestedMax: 100,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Errors",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: false,
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
          labels: [
            "Line 1",
            "Line 2",
            "Line 3",
            "Line 4",
            "Line 5",
            "Line 6",
            "Line 7",
            "Line 8",
            "Line 9",
            "Line 10",
          ],
          datasets: [
            {
              label: "Total Scanned",
              data: [
                productData.Line1.TotalScanned,
                productData.Line2.TotalScanned,
                productData.Line3.TotalScanned,
                productData.Line4.TotalScanned,
                productData.Line5.TotalScanned,
                productData.Line6.TotalScanned,
                productData.Line7.TotalScanned,
                productData.Line8.TotalScanned,
                productData.Line9.TotalScanned,
                productData.Line10.TotalScanned,
              ],
              backgroundColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "purple",
                "orange",
                "cyan",
                "magenta",
                "lime",
                "indigo",
              ],
              borderColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "purple",
                "orange",
                "cyan",
                "magenta",
                "lime",
                "indigo",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: false,
          scales: {
            y: {
              title: {
                display: true,
                text: "No. of Total Scanned",
              },
              beginAtZero: false,
              suggestedMax: 100,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Total Scanned",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: false,
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
          >
            <option value="">Select Line</option>
            <option value="Line1">Line 1</option>
            <option value="Line2">Line 2</option>
            <option value="Line3">Line 3</option>
            <option value="Line4">Line 4</option>
            <option value="Line5">Line 5</option>
            <option value="Line6">Line 6</option>
            <option value="Line7">Line 7</option>
            <option value="Line8">Line 8</option>
            <option value="Line9">Line 9</option>
            <option value="Line10">Line 10</option>
          </select>

          <button
            className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ml-2 mt-2"
            onClick={startLine}
          >
            Start Line
          </button>

          {/* Visual indicator for simulation status */}
          {isSimulationRunning ? (
            <span className="ml-2">Lines Running 🟢</span>
          ) : (
            <span className="ml-2">Lines Not Running 🔴</span>
          )}
        </div>

        <div style={{ marginTop: "10px" }}>
          {/* <button
            className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={startSimulation}
          >
            Simulate Line 1 start
          </button>

          <button
            className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={startSimulation2}
          >
            Simulate Line 1-5 start
          </button>

          <button
            className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={startSimulation3}
          >
            Simulate Line 1-10 start
          </button> */}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "600px",
            height: "800px",
            marginRight: "80px",
            marginLeft: "20px",
          }}
        >
          <div>
            {/* <h2>Errors</h2> */}
            <canvas id="errorChart" width="100px" height="50px"></canvas>
          </div>
        </div>

        <div style={{ width: "600px", height: "800px" }}>
          <div>
            {/* <h2>Total Scanned</h2> */}
            <canvas id="totalScannedChart" width="100px" height="50px"></canvas>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Simulation;
