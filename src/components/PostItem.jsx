import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
function PostItem({ listing, id, onDelete, onEdit }) {
  // Take post timestamp and make it into date format
  // const secs = listing.timestamp.seconds;
  // const output = new Date(secs * 1000);

  const date = Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(listing.timestamp.seconds * 1000);

  const auth = getAuth();

  return (
    <li
      className={
        listing.userRef === auth.currentUser?.uid
          ? " my-5 card bg-neutral drop-shadow-xl rounded-md xl:rounded-none xl:w-7/12 xl:m-auto xl:my-5 xl:shadow-xl"
          : "hidden"
      }
    >
      <div className="card-title justify-left ml-3 mt-5 text-[26px] underline p-5 text-primary">
        <Link to={`/post/${id}`}>
          {listing.postTitle.slice(0, 24)}

          {listing.postTitle.length < 20 ? "" : "..."}
        </Link>
      </div>
      <div className="divider"></div>
      <div className="card-body break-words">
        <p>{listing.postBody.slice(0, 200)}...</p>
      </div>
      <div className="flex p-5">
        {onEdit && (
          <p
            onClick={() => onEdit(id)}
            className="btn btn-primary xl:btn-ghost text-2xl mr-2"
          >
            <FiEdit />
          </p>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(listing.id, listing.postTitle)}
            className="btn btn-primary xl:btn-ghost text-2xl "
          >
            <BsTrash />
          </button>
        )}
        <span className="badge mt-5 text-[14px] ml-2 text-black">{`${date}`}</span>
      </div>
    </li>
  );
}

export default PostItem;
