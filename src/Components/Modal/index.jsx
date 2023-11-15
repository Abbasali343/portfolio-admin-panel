import "./Modal.css";

export default function Modal({ handleModal }) {
  return (
    <>
      <div className="backdrop"></div>
      <div className="message-container">
        <h1 className="modal-message">Data Updated Successfully</h1>
        <button className="modal-button" onClick={handleModal}>
          Cancel
        </button>
      </div>
    </>
  );
}
