"use client";

import PageLayout from "@/components/PageLayout";
import CustomCalendar from "@/components/Calendar/Calendar";
import { useState } from "react";
import "@/styles/calendar.css";
import "@/styles/timeline.css";
import ErrorBarChart from "@/components/ErrorBarChart";
import Timeline from "@/components/TimeLine";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Loading from "@/components/Loading";
import { type } from "os";

interface ErrorData {
  LabelErrorID: number;
  ProductCode: number;
  DispatchDate: string;
  ErrorDispatchDate: string;
  Output: string;
  CameraCapture: string;
}

const Page = () => {
  useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<ErrorData[]>([]);
  const [updatedErrorData, setUpdatedErrorData] = useState<ErrorData[]>([]);

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/labelErrors"
        );
        setErrorData(response.data);
        console.log("Error data:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching error data:", error);
        setLoading(false);
      }
    };

    fetchErrorData();    
  }, []);

  //wait for errorData to be fetched
  useEffect(() => {
    if (errorData.length > 0) {
      const fetchProductCodes = async () => {
        const productCodes = await Promise.all(
          errorData.map(async (error: any) => {
            console.log("Error:", error.ProductCode);
            return await fetchProductCode(error.ProductCode);
          })
        );
        console.log("Product codes:", productCodes);

        const updatedErrorData = errorData.map((error: any, index: number) => {
          return {
            ...error,
            ProductCode: productCodes[index],
          };
        });
        console.log(errorData)
        console.log(updatedErrorData);
        setUpdatedErrorData(updatedErrorData);
        console.log("Updated error data:", updatedErrorData);
      }

      fetchProductCodes();
    }
  }
  , [errorData]);






  interface DataObject {
    [key: string]: any;
  }

  function exportToCSV(data: DataObject[], filename: string) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).toString().replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  async function fetchProductCode(productId: any) {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      console.log("Product code:", response.data.productCode);
      return response.data.productCode;
    } catch (error) {
      console.error('Error fetching product code:', error);
      return null;
    }
  }
  


  if (loading) {
    return <Loading />;
  } else {
    return (
      <PageLayout>
        <div className="pl-8 pt-10 w-full">
          <h2 className="text-2xl font-bold mb-10">Label Error History</h2>
          <button
            className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const today = new Date();
              const dateString = today.toISOString().split("T")[0];
              const fileName = `label_error_data_${dateString}.csv`;
              exportToCSV(errorData, fileName);
            }}
          >
            Export Label Error Data to CSV
          </button>


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updatedErrorData.map((error: any) => (
                  <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <div className="text-gray-900 font-bold text-xl mb-2">Product Code: {error.ProductCode}</div>
                      <p className="text-gray-700 text-base">Dispatch Date: {formatDate(error.DispatchDate)}</p>
                      <p className="text-gray-700 text-base">Error Dispatch Date: {formatDate(error.ErrorDispatchDate)}</p>
                      {/* <div className="flex items-center mt-2">
                        <div className="text-sm">
                          <p className="text-gray-900 leading-none">Camera Capture</p>
                        </div>
                      </div> */}
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-800 mr-2 mb-2">Error type : {error.Output}</span>
                    </div>
                  </div>
               ))}

            </div>  
          </div>
          

          {/* <div className="w-full flex flex-col lg:flex-row">
            <div className="w-6/12">
              <div>
                <CustomCalendar
                  date={date}
                  setDate={setDate}
                  selectRange={selectRange}
                  setSelectRange={setSelectRange}
                />
              </div>
              <div className="mt-16">
                <ErrorBarChart />
              </div>
            </div>
            <div className="w-9/12">
              <Timeline selectedDate={date} />
            </div>
          </div> */}
        </div>
      </PageLayout>
    );
  }
};

export default Page;
