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
    // <li className="bg-base-300 m-5 card p-5">
    <li
      className={
        listing.userRef === auth.currentUser?.uid
          ? " my-2 card bg-neutral drop-shadow-xl rounded-md"
          : "hidden"
      }
    >
      <div className="card-title justify-left ml-3 text-[24px] underline p-5 text-primary">
        <Link to={`/post/${id}`}>{listing.postTitle.slice(0, 12)}...</Link>
      </div>

      <div className="card-body break-words">
        <p>{listing.postBody.slice(0, 100)}...</p>
      </div>

      <div className="flex p-5">
        {onEdit && (
          <p onClick={() => onEdit(id)} className="btn text-2xl mr-2">
            <FiEdit />
          </p>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(listing.id, listing.postTitle)}
            className="btn text-2xl "
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
