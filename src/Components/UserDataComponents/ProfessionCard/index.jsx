import axios from "axios";
import EditDocumentButton from "../../EditDocumentButton";
import DeleteButton from "../../DeleteButton";
import Modal from "../../Modal";
import { useState } from "react";

export default function ProfessionCard({ name, data, handleEduEditing }) {
  const [isModal, setIsModal] = useState(false);
  const [title,setTitle] = useState("");
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
          <DeleteButton handleModal={handleModal} name={item.name} title={item.title} />
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
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deleteProfession`,
        {
          data: requestBody,
        }
      )
      .then((response) => {
        alert("Profession Deleted");
        setIsModal(!isModal)
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
          setIsModal(!isModal)
        }
      });
  }

  function handleModal(name,title) {
    if(title){
      setTitle(title)
    }
    setIsModal(!isModal);
  }
  return (
    <>
    {isModal && (
            <Modal
              handleModal={handleModal}
              onDelete={deleteUser}
              name={name}
              title={title}
            />
          )}
          {!isModal && (
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
          )}
     
    </>
  );
}
