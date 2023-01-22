import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="min-h-screen">
      <header>
        <h1 className="text-center text-4xl p-5">Welcome Back!</h1>
      </header>

      <main>
        <div className="form-container bg-base-200 p-5 m-5 rounded-xl shadow-lg">
          <form className="p-5">
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
                id="password1"
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
            <Link to="forgot-password" className="link link-warning">
              Forgot Password
            </Link>

            <div className="text-center p-5">
              <button className="btn bg-base-300">Sign In</button>
            </div>
          </form>

          {/* Google oauth */}

          <div className="text-center">
            <Link to="/sign-up" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
