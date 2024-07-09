import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const {updateUser} = useContext(AuthContext);

  const [error, setError] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data.user)
      
      updateUser(response.data.user);


      navigate("/")
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
    }finally{
      setLoading(false);  
    }
    
  }


  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input required name="email" type="text" placeholder="email" />
          <input required name="password" type="password" placeholder="Password" />
          <button disabled={loading}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
