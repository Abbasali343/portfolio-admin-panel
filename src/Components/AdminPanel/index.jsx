import './AdminPanel.css';
import PersonalInfoForm from '../PersonalInfoForm';

export default function AdminPanel({category}) {
  return (
    <>
      <div className="panel-header"></div>
      <div className='panel-form-container'>
        <PersonalInfoForm category={category} />
      </div>
    </>
  );
}
