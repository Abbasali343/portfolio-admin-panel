import './LogIn.css';

export default function LogIn({handleLogIn}) {
  return (
    <>
      <div className='login-container'>
        <h1 className='login-heading'>Welcome! Admin</h1>
        <input id='login-input' placeholder='Enter Your Email Id' />
        <input id='login-input' className='login-input2' placeholder='Enter Your Password' />
        <button className='login-button' onClick={()=>handleLogIn(true)}>Sign In</button>
      </div>
    </>
  );
}
