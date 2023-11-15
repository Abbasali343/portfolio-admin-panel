import { useEffect, useState } from "react";
import axios from "axios";
import AllUsersDetails from "../AllUsersDetails";
import SingleUserDetails from "../SingleUserDetails";
import "./ShowDetails.css";

export default function ShowDetails() {
  const [data, setData] = useState();
  const [userName, setUserName] = useState("");
  const [isDetails, setIsDetails] = useState(false);

  function fetchData() {
    axios.get("http://localhost:3000/v1/admin/allUsers").then((response) => {
      setData(response.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDetails = (name) => {
    setUserName(name);
    setIsDetails(!isDetails);
  };
  return (
    <>
      {isDetails ? (
        <SingleUserDetails
          userName={userName!=='' ? userName : null}
          handleDetails={handleDetails}
        />
      ) : (
        <AllUsersDetails
          data={data ? data : null}
          handleDetails={handleDetails}
        />
      )}
    </>
  );
}
