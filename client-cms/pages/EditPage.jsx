import { useState } from "react";
import Form from "../components/Form";
import { useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";

const EditPage = () => {
  const [data, setData] = useState(null);

  async function fetchData() {
    const { id } = useParams()
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://main.stellar-ip.online/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      //   console.log(data, "<<<<");
      //   console.log(localStorage.access_token, "<<< ini data");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <Form types={data}/>
      </div>
    </>
  );
};

export default EditPage;
