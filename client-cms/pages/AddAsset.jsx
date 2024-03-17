import React, { useEffect, useState } from "react";
import axios from "axios";

function TableProductPage() {
  const [thing, setThing] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://enter.stellar-ip.online/asset",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setThing(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(`https://enter.stellar-ip.online/asset/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (id) => {
    try {
      // Logic for editing the data
      console.log("Editing item with ID:", id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Asset Table</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Found
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {thing && thing.length > 0 && thing.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.desc}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.dateFound}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => deleteData(item.id)}
                >
                  Delete
                </button>
                <button
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                  onClick={() => editData(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableProductPage;
