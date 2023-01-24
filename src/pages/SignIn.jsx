import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };
  return (
    <div className="min-h-screen">
      <header>
        <h1 className="text-center text-4xl p-5">Welcome Back!</h1>
      </header>

      <main>
        <div className="form-container bg-base-200 p-5 m-5 rounded-xl shadow-lg">
          <form className="p-5" onSubmit={onSubmit}>
            <label className="input-group">
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
              className="showPassword absolute right-16 top-[330px] cursor-pointer"
            />
            <Link to="/forgot-password" className="link link-warning">
              Forgot Password
            </Link>

            <div className="text-center p-5">
              <button className="btn btn-primary">Sign In</button>
            </div>
          </form>

          <Oauth />

          <div className="text-center">
            <Link to="/sign-up" className="btn  bg-base-300">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
