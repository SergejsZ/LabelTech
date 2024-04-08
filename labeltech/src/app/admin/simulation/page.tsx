"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Loading from "@/components/Loading";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels"; // Import the plugin for data labels

const Simulation = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLine, setSelectedLine] = useState(""); // State to hold the selected line
  // const [line1Performance, setLine1Performance] = useState([]);

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

  const [individualLineData, setIndividualLineData] = useState({
    Monday: { TotalNumberErrors: 0, TotalScanned: 0 },
    Tuesday: { TotalNumberErrors: 0, TotalScanned: 0 },
    Wednesday: { TotalNumberErrors: 0, TotalScanned: 0 },
    Thursday: { TotalNumberErrors: 0, TotalScanned: 0 },
    Friday: { TotalNumberErrors: 0, TotalScanned: 0 },
    Saturday: { TotalNumberErrors: 0, TotalScanned: 0 },
    Sunday: { TotalNumberErrors: 0, TotalScanned: 0 },
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

      try {
        const lineDataResponse = await axios.get(
          "http://localhost:4000/api/invidualLineData"
        );
        console.log("Fetched data:", lineDataResponse.data);
        //setProductData(response.data);
        // Inside useEffect
        setIndividualLineData({
          Monday: lineDataResponse.data[0],
          Tuesday: lineDataResponse.data[1],
          Wednesday: lineDataResponse.data[2],
          Thursday: lineDataResponse.data[3],
          Friday: lineDataResponse.data[4],
          Saturday: lineDataResponse.data[5],
          Sunday: lineDataResponse.data[6],
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

  useEffect(() => {
    if (!loading) {
      drawPieChart();
    }
  }, [loading, productData]);

  useEffect(() => {
    if (!loading) {
      drawLineChart();
    }
  }, [loading, individualLineData]);

  const drawLineChart = () => {
    const lineCanvas = document.getElementById(
      "lineChart"
    ) as HTMLCanvasElement | null;
    if (lineCanvas) {
      // Destroy existing chart instance if it exists
      Chart.getChart(lineCanvas)?.destroy();

      const lineChart = new Chart(lineCanvas, {
        type: "line",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Line 1 Performance",
              data: [
                individualLineData.Monday.TotalScanned,
                individualLineData.Tuesday.TotalScanned,
                individualLineData.Wednesday.TotalScanned,
                individualLineData.Thursday.TotalScanned,
                individualLineData.Friday.TotalScanned,
                individualLineData.Saturday.TotalScanned,
                individualLineData.Sunday.TotalScanned,
              ],
              borderColor: "blue",
              backgroundColor: "transparent",
              pointBackgroundColor: "blue",
              pointBorderColor: "blue",
              pointRadius: 5,
              pointHoverRadius: 8,
              tension: 0.4,
            },
          ],
        },
        options: {
          animation: false,
          scales: {
            y: {
              title: {
                display: true,
                text: "No. of Trays Scanned",
              },
              //beginAtZero: true,
              //suggestedMax: 100,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Line 1 Total Trays Scanned",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        },
      });
    }
  };

  const totalErrors = Object.values(productData).reduce(
    (acc: number, line: { TotalNumberErrors: number }) =>
      acc + line.TotalNumberErrors,
    0
  );
  const errorPercentages = Object.keys(productData).map((line: string) => ({
    line,
    percentage:
      (productData[line as keyof typeof productData].TotalNumberErrors /
        totalErrors) *
      100,
  }));

  const drawPieChart = () => {
    // Draw pie chart for error percentages
    const errorPercentageCanvas = document.getElementById(
      "errorPercentageChart"
    ) as HTMLCanvasElement | null;
    if (errorPercentageCanvas) {
      // Check if a chart instance already exists
      const existingErrorPercentageChart = Chart.getChart(
        errorPercentageCanvas
      );
      if (existingErrorPercentageChart) {
        existingErrorPercentageChart.destroy(); // Destroy the existing chart
      }

      // Create a new Chart instance
      const errorPercentageChart = new Chart(errorPercentageCanvas, {
        type: "pie",
        data: {
          labels: errorPercentages.map((data) => data.line),
          datasets: [
            {
              data: errorPercentages.map((data) => data.percentage),
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
          plugins: {
            title: {
              display: true,
              text: "Line Errors Pie Chart",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: true,
              position: "right",
            },
            datalabels: {
              display: true,
              align: "bottom",
              backgroundColor: "#ccc",
              borderRadius: 3,
              font: {
                size: 18,
              },
            },
          },
        },
      });
    }
  };

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
                text: "No. of Trays with Errors",
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
              label: "Total Trays Scanned",
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
                text: "Total No. of Trays Scanned",
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
      <div style={{ marginLeft: "600px", marginTop: "10px" }}>
        {/* Dropdown for selecting week */}
        <select
          style={{
            width: "200px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          <option style={{ fontWeight: "bold" }}>WEEK 14 - 01/04/2024</option>
          <option style={{ fontWeight: "bold" }}>WEEK 15 - 08/04/2024</option>
        </select>
      </div>

      {/* Line selection and simulation controls */}
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
          {/* Buttons for starting simulations */}
          {/* Include your buttons for simulation control here */}
        </div>
      </div>

      {/* Chart area */}
      <div style={{ display: "flex" }}>
        {/* totalScannedChart chart */}
        <div
          style={{
            width: "600px",
            height: "300px",
            marginRight: "80px",
            marginLeft: "20px",
          }}
        >
          <canvas
            id="totalScannedChart"
            width="100px"
            height="50px"
            style={{ marginBottom: "80px" }}
          ></canvas>
        </div>

        {/* Errors chart */}
        <div style={{ width: "600px", height: "400px" }}>
          <div>
            <canvas
              id="errorChart"
              width="100px"
              height="50px"
              style={{ marginBottom: "130px" }}
            ></canvas>
          </div>

          {/* Error percentage pie chart */}
          <div style={{ width: "350px", height: "350px", marginLeft: "120px" }}>
            <canvas id="errorPercentageChart"></canvas>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "300px", marginBottom: "10px" }}>
        <select
          style={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
          value={selectedLine}
          onChange={(e) => setSelectedLine(e.target.value)}
        >
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
      </div>

      {/* Line chart */}
      <div style={{ width: "600px", height: "800px", marginLeft: "15px" }}>
        <canvas id="lineChart" width="100px" height="50px"></canvas>
      </div>
    </PageLayout>
  );
};

export default Simulation;
