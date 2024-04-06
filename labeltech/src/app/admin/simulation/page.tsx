"use client";
import React from "react";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/app/hooks/useAuth";
import Loading from "@/components/Loading";
import axios from "axios";

const Simuation = () => {
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

  useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <PageLayout>
        <div>
          <button
            className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              startSimulation();
            }}
          >
            Simulate 1 Line
          </button>
        </div>

        <div>
          <button
            className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              startSimulation2();
            }}
          >
            Simulate 5 Lines
          </button>

          <button
            className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              stopSimulation();
            }}
          >
            Stop Simulation
          </button>
        </div>
      </PageLayout>
    );
  }
};

export default Simuation;
