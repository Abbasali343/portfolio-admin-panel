import "../../assets/css/Buttons.css";

export default function DeleteButton({
  handleModal,
  name,
  title,
  testimonialName,
}) {
  return (
    <>
      <div
        className="delete-btn-container"
        onClick={() => {
          handleModal(name, title, testimonialName);
        }}
      >
        <h1 className="delete-btn-heading">X</h1>
      </div>
    </>
  );
}
