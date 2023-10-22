import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCodeScanner from "./QRCodeScanner.jsx";
import NavigationBar from "./NavigationBar.jsx";
import { Link } from "react-router-dom";
import {
  useGlobalState,
  SET_SCANNED_QR_CODE,
} from "../../../GlobalStateContext.jsx";
import axios from "axios";
import { v4 as uuid } from "uuid";

function Home() {
  const { state, dispatch } = useGlobalState();
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [uniqueID, setUniqueID] = useState("");

  const handleQRCodeScan = (data) => {
    dispatch({ type: SET_SCANNED_QR_CODE, payload: data });
    const uniqueID = uuid();
    setUniqueID(uniqueID);
    setScannedData(data);
    setScanning(false);
    toast.success("QR Code scanned successfully!", {
      position: "top-right",
    });
  };

  const saveScannedQRCode = async (data) => {
    try {
      const response = await axios.post("/api/qrcodesdata", {
        content: data,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartScan = () => {
    setScanning(true);
    setButtonClicked(true);
  };

  const handleSaveClick = async () => {
    if (scannedData) {
      try {
        const response = await axios.post("/api/qrcodesdata", {
          id: uniqueID,
          content: scannedData,
          createdDate: new Date().toISOString(),
        });
        toast.success("Data saved to the database successfully!", {
          position: "top-right",
        });
      } catch (error) {
        toast.error("Error while saving data to the database!", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <ToastContainer />
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        {!scanning && !buttonClicked && (
          <button
            onClick={handleStartScan}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Scan QR Code
          </button>
        )}
        {scanning && (
          <div className="mt-4 w-3/5">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <QRCodeScanner onScan={handleQRCodeScan} />
            </div>
          </div>
        )}
        {scannedData && (
          <div className="mt-4 w-3/5">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-lg font-semibold mb-2 text-center">
                Scanned QR Code:
              </p>
              <p className="text-center">{scannedData}</p>
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Save to Database
              </button>
              <Link
                to="/Dashboard"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-5"
              >
                Back
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
