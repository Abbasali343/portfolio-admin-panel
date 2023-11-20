import axios from "axios";
import EditDocumentButton from "../../EditDocumentButton";
import DeleteButton from "../../DeleteButton";

export default function ProfessionCard({ name, data, handleEduEditing }) {
  const type = "profession";
  let grayId = false;
  let renderCard;
  if (data) {
    renderCard = data.map((item, index) => (
      <tr
        key={index}
        className="edu-body-data-container"
        id={grayId ? "body-data-container" : null}
      >
        <td className="edu-table-body-data">{item.title}</td>
        <td className="edu-table-body-data">{item.description}</td>
        <td className="table-body-data" id="show-details">
          <EditDocumentButton
            onSelect={() => handleEduEditing(item.title, type)}
          />
          <DeleteButton onDelete={deleteUser} name={name} title={item.title} />
        </td>
        {(grayId = !grayId)}
      </tr>
    ));
  }

  function deleteUser(name, title) {
    const requestBody = {
      name: name,
      title: title,
    };
    axios
      .delete(`http://localhost:3000/v1/admin/deleteProfession`, {
        data: requestBody,
      })
      .then((response) => {
        alert("Profession Deleted");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
        }
      });
  }
  return (
    <>
      <div className="test-main-container">
        <div className="test-head">
          <h1>Professions</h1>
          <div className="test-body">
            <table className="test-table-h">
              <thead className="test-table-h">
                <tr className="test-table-head">
                  <th className="test-th">Title</th>
                  <th className="test-th">Description</th>
                  <th className="test-th">Action</th>
                </tr>
              </thead>
              <tbody className="edu-table-body">{renderCard}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
