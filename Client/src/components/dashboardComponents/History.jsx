import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGlobalState,
  ADD_TO_HISTORY,
} from "../../../GlobalStateContext.jsx";

function History() {
  const { state, dispatch } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState(state.history);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get("/api/allqrcodes");
      if (response.status === 200) {
        const data = response.data;
        dispatch({ type: ADD_TO_HISTORY, payload: data });
        setHistoryItems(data);
      } else {
        toast.error("Failed to fetch data from the server", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while fetching data", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/delete/${id}`);
      if (response.status === 200) {
  
        const updatedItems = historyItems.filter((item) => item.id !== id);
        setHistoryItems(updatedItems);
        toast.success("Item deleted successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to delete the item", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the item", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  return (
    <div>
      <NavigationBar />
      <ToastContainer />

      <div className="p-4">
        <h2 className="text-2xl text-center font-semibold mb-4">
          Scan History
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {historyItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div className="flex items-center">
                  <div>
                    <p className="text-lg font-semibold">ID: {item.id}</p>
                    <p className="text-lg font-semibold">
                      Content: {item.content}
                    </p>
                    <p className="text-lg font-semibold">
                      Date: {item.created_date}
                    </p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
