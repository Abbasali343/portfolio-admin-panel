import { useState } from "react";
import axios from "axios";
import PersonalForm from "../PersonalForm";
import EditDocumentButton from "../EditDocumentButton";
import DeleteButton from "../DeleteButton";
import "../ShowDetails/ShowDetails.css";

export default function AllUsersDetails({ data, handleDetails }) {
  const [isNewUser, setIsNewUser] = useState(false);
  let grayId = false;
  let renderCard;
  if (data) {
    renderCard = data.map((item) => (
      <tr
        key={item._id}
        className="body-data-container"
        id={grayId ? "body-data-container" : null}
      >
        <td className="table-body-data">{item.name}</td>
        <td className="table-body-data">{item.profession}</td>
        <td className="table-body-data">{item.email}</td>
        <td className="table-body-data" id="show-details">
          <EditDocumentButton onSelect={() => handleDetails(item.name)} />
          <DeleteButton onDelete={deleteUser} name={item.name} />
        </td>
        {(grayId = !grayId)}
      </tr>
    ));
  }
  function handleAddNewUser() {
    setIsNewUser(!isNewUser);
  }
  function deleteUser(name) {
    axios
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deleteUser?name=${name}`
      )
      .then((response) => {
        alert("User Deleted");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
        }
      });
  }
  return (
    <>
      {isNewUser ? (
        <PersonalForm handleAddNewUser={handleAddNewUser} />
      ) : (
        <div className="table-container">
          <div className="add-user-container">
            <button className="add-user-button" onClick={handleAddNewUser}>
              Add New User
            </button>
          </div>
          <table>
            <thead className="details-table-header">
              <tr>
                <th className="table-header-data">Name</th>
                <th className="table-header-data">Profession</th>
                <th className="table-header-data">Email</th>
                <th className="table-header-data">Action</th>
              </tr>
            </thead>
            <tbody className="details-table-body">{renderCard}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
