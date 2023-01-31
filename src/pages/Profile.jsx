import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen card">
      <header>
        <h1 className="card-title text-5xl justify-center p-10">My Profile</h1>
      </header>

      <main className="card-body xl:items-center ">
        <div className="">
          <h2 className="text-3xl">Personal Details</h2>
          <div className="divider"></div>
          <div className="flex justify-center xl:justify-center">
            <button
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
              className={
                changeDetails ? "btn btn-accent my-5" : "btn btn-secondary my-5"
              }
            >
              {changeDetails ? "save" : "change"}
            </button>
          </div>
        </div>

        <div>
          <form>
            <label className="input-group mb-7">
              <span className="input-text bg-primary text-base-100">Name</span>
              <input
                type="text"
                id="name"
                className={
                  !changeDetails
                    ? "profileName input"
                    : "profileNameActive input bg-gray-800"
                }
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
            </label>

            <label className="input-group mb-7">
              <span className="input-text bg-primary text-base-100">Email</span>
              <input
                type="text"
                id="email"
                className={
                  !changeDetails
                    ? "profileEmail input"
                    : "profileEmailActive input bg-gray-800"
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </label>
          </form>
        </div>
        <div className="divider"></div>
        <button
          type="button"
          onClick={onLogout}
          className="btn btn-primary xl:w-2/12"
        >
          Logout
        </button>
      </main>
    </div>
  );
}

export default Profile;
