import logo from "./Assets/EzPass-Logo-trans.png"
import { useHistory } from 'react-router-dom';

function Start() {
    const history = useHistory();

    const handleLoginClick = event => {
        history.push("/login");
    };
    const handleRegisterClick = event => {
        history.push("/register");
    };
    return (
        <div className="startScreen" data-aos="fade-down">
            <img className="logo" src={logo} alt="" />
            <button type="button" className="btn btn-dark homepage-buttons" onClick={handleLoginClick}>Login</button>
            <button type="button" className="btn btn-dark homepage-buttons" onClick={handleRegisterClick}>Register</button>
        </div>
    );
  }
  
  export default Start;