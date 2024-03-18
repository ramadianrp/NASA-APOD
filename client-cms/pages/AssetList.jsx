import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TableAssetPage() {
  const [thing, setThing] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://enter.stellar-ip.online/asset`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setThing(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `https://enter.stellar-ip.online/asset` + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Asset</h1>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Date Found</th>
              <th className="border border-gray-400 px-4 py-2">userId</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {thing && thing.length > 0 ? (
              thing.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{item.desc}</td>
                  <td className="border border-gray-400 px-4 py-2">{item.dateFound}</td>
                  <td className="border border-gray-400 px-4 py-2">{item.userId}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button className="text-red-600 hover:text-red-900 mr-2" onClick={() => deleteData(item.id)}>Delete</button>
                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => editData(item.id)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-400 px-4 py-2 text-center">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>

  );
}

export default TableAssetPage;
