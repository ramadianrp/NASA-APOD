import { useState } from "react";
import Form from "../components/Form";
import { useEffect } from "react";
import axios from "axios"

const EditPage = () => {
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://enter.stellar-ip.online/asset`,
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
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2 col-md-9 ms-sm-auto col-lg-10 px-md-4">Edit Asset</h1>
        </div>
        <Form types={data}/>
      </div>
    </>
  );
};

export default EditPage;
