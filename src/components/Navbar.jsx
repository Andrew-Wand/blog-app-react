import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-md p-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sign-in">Profile</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl xl:ml-48">Blog App</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-in">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/add-post" className="btn xl:mr-48">
          New Post
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
