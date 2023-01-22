import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

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
  return (
    <div>
      <header>
        <p>My Profile</p>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default Profile;
