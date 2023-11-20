import "../../assets/css/Buttons.css";

export default function DeleteButton({
  onDelete,
  name,
  title,
  testimonialName,
}) {
  return (
    <>
      <div
        className="delete-btn-container"
        onClick={() =>
          onDelete(name, title && title, testimonialName && testimonialName)
        }
      >
        <h1 className="delete-btn-heading">X</h1>
      </div>
    </>
  );
}
