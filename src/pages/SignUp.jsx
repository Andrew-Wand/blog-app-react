import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;

      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };
  return (
    <div className="min-h-screen">
      <header>
        <h1 className="text-center text-4xl p-5">Sign Up</h1>
      </header>

      <main>
        <div className="form-container bg-base-200 p-5 m-5 rounded-xl shadow-lg">
          <form className="p-5" onSubmit={onSubmit}>
            <label className="input-group">
              <span className="bg-orange-500 text-black">Name</span>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter name..."
                id="name"
                value={name}
                onChange={onChange}
              />
            </label>
            <label className="input-group mt-10">
              <span className="bg-orange-500 text-black">Email</span>
              <input
                type="email"
                className="input input-bordered"
                placeholder="Ex. 'john@gmail.com'"
                id="email"
                value={email}
                onChange={onChange}
              />
            </label>

            <label className="input-group mb-5 mt-10">
              <span className="bg-orange-500 text-black">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-[208px]"
                placeholder="Ex. '123456'"
                id="password"
                value={password}
                onChange={onChange}
              />
            </label>

            <img
              src={visibilityIcon}
              alt="show password"
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="showPassword absolute right-16 top-[415px] cursor-pointer"
            />
            <Link to="forgot-password" className="link link-warning">
              Forgot Password
            </Link>

            <div className="text-center p-5">
              <button className="btn  btn-primary">Sign Up</button>
            </div>
          </form>

          {/* Google oauth */}

          <div className="text-center">
            <Link to="/sign-in" className="btn bg-base-300 ">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
