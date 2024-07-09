import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { updateUser, curretnUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setUpdated("");
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);



    try {
      setLoading(true);
      const response = await apiRequest.put(`/user/${curretnUser?.id}`, {
        username,
        email,
        password,
        avatar : avatar[0]
      })

      updateUser(response.data);
      //console.log(response.data)
      setUpdated("Profile Updated")
      navigate("/profile")


      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }finally{
      setLoading(false)
      
    }
  }


  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={curretnUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={curretnUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={loading} >Update</button>
          {error && <span className="error">{error}</span>}
          {updated && <span className="updated">{updated}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || curretnUser.avatar || "/no-avatar.png"} alt="" className="avatar" />
        <UploadWidget
        setState={setAvatar}
         uwConfig={{
          cloudName: "dodw7wprr",
          uploadPreset: "estate",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatars",
        }}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
