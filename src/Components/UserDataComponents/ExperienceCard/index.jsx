import axios from "axios";
import EditDocumentButton from "../../EditDocumentButton";
import DeleteButton from "../../DeleteButton";
import { useEffect, useState } from "react";

export default function ExperienceCard({ name, data, handleEduEditing }) {
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    setIsDeleted(!isDeleted);
  }, [data]);
  const type = "experience";
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
        <td className="edu-table-body-data">{item.company}</td>
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
      type: type,
    };
    axios
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deleteEducation`,
        {
          data: requestBody,
        }
      )
      .then((response) => {
        alert("Experience Deleted");
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert(err.response.data.error);
        }
      });
  }
  return (
    <>
      <div>
        <div className="education-card-container">
          <table>
            <thead>
              <tr className="edu-table-head">
                <th className="edu-th">Designation</th>
                <th className="edu-th">Company</th>
                <th className="edu-th">Action</th>
              </tr>
            </thead>
            <tbody className="edu-table-body">{renderCard}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
