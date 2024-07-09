import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiReuest from "../../lib/apiRequest"
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const {updateUser,curretnUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{

      await apiReuest.post("/auth/logout")
      updateUser(null)
      navigate("/")
    }catch(error){
      console.log(error)
    }
  }
  return (
   <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={curretnUser.avatar ? curretnUser.avatar : "/no-avatar.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{curretnUser.username}</b>
            </span>
            <span>
              E-mail: <b>{curretnUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
            <button>Create New Post</button>
            </Link>
          </div>
        <Suspense fallback={<div>Loading...</div>}>
        <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading posts!</p>
          }
        >
          {(postResponse) => (
          <List post={postResponse.data.userPosts}  />
              
          )}
        </Await>
        </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
        <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading posts!</p>
          }
        >
          {(postResponse) => (
          <List post={postResponse.data.savedPosts}  />
              
          )}
        </Await>
        </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
