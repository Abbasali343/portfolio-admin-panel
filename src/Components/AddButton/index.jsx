export default function AddButton({ handleClick }) {
  return (
    <>
      <button className="add-btn" type="button" onClick={handleClick}>
        Add
      </button>
    </>
  );
}
