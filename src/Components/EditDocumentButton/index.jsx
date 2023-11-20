import '../../assets/css/Buttons.css';

export default function EditDocumentButton({onSelect}){
    return(<>
    <div className="edit-doc-btn-container" onClick={onSelect}>
        <h1 className="edit-doc-btn-heading">S</h1>
    </div>
    </>)
}