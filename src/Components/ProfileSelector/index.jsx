import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileSelector({ getName }) {
  const [isToggle, setIsToggle] = useState(false);
  const [data, setData] = useState([]);

  const fetchUsers = () => {
    axios.get("http://localhost:3000/v1/admin/allUsers").then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  let renderCard;

  if (data) {
    renderCard = data.map((item) => (
      <div key={item._id}>
        <p
          className="options"
          id="options"
          onClick={() => handleOption(item.name)}
        >
          {item.name}
        </p>
      </div>
    ));
  }
  function handleClick() {
    setIsToggle(!isToggle);
  }

  function handleOption(name) {
    getName(name);
    setIsToggle(!isToggle);
  }
  return (
    <>
      <div className="user-selector">
        <div className="dropdown-container">
          <p className="options" onClick={handleClick}>
            Please Select a Name
          </p>
          {isToggle && <div className="options-container">{renderCard}</div>}
        </div>
      </div>
    </>
  );
}
