import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import googleIcon from "../assets/svg/googleIcon.svg";
import { getAuth } from "firebase/auth";
import { FaPencilAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [dropClass, setDropClass] = useState(false);

  const buttonRef = useRef(null);

  const handleDrop = () => {
    if (dropClass) {
      buttonRef.current.blur();
    } else {
      buttonRef.current.focus();
    }

    setDropClass(!dropClass);
  };

  const onLogout = () => {
    if (auth.currentUser) {
      auth.signOut();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-md p-5">
      <div className="navbar-start">
        <div className="dropdown xl:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={googleIcon} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-5 p-2 shadow bg-base-100 rounded-box w-52 bg-[#38bdf8] text-[#000]"
          >
            <li>
              <Link
                to={auth.currentUser ? "/profile" : "/sign-in"}
                className="text-[16px]"
              >
                Profile
              </Link>
            </li>
            <li>
              <button type="button" onClick={onLogout} className="text-[16px]">
                {auth.currentUser ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>

        <Link
          to="/"
          className=" normal-case text-5xl ml-6 xl:ml-48 navbar-title  relative text-[#03A4E9]"
        >
          Bloggy
          <FaPencilAlt className="absolute top-7 left-6 rotate-45 z-10 text-[#03A4E9]" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/add-post" className="btn xl:mr-48 btn-primary">
          New Post
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
