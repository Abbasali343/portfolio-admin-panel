import "./Modal.css";

export default function Modal({
  handleModal,
  onDelete,
  name,
  title,
  testimonialName,
}) {
  return (
    <>
      <div className="backdrop"></div>
      <div className="message-container">
        {onDelete && (
          <h1 className="closeX" onClick={handleModal}>
            X
          </h1>
        )}
        <h1 className="modal-message">
          {onDelete ? "Are You Sure" : "Data Updated Successfully"}
        </h1>
        <button
          className="modal-button"
          onClick={
            onDelete
              ? () =>
                  onDelete(
                    name,
                    title && title,
                    testimonialName && testimonialName
                  )
              : handleModal
          }
        >
          {onDelete ? "Delete" : "OK"}
        </button>
      </div>
    </>
  );
}
