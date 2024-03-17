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
      setThing(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `https://enter.stellar-ip.online/asset/` + id,
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
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date Found</th>
            <th>userId</th>
          </tr>
        </thead>
        <tbody>
          {thing && thing.length > 0 ? (
            thing.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.dateFound}</td>
                <td>{item.userId}</td>
                <td>
                  <button onClick={() => deleteData(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableAssetPage;
