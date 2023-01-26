import { Link } from "react-router-dom";

function PostItem({ listing, id, onDelete, onEdit }) {
  // Take post timestamp and make it into date format
  const secs = listing.timestamp.seconds;
  const output = new Date(secs * 1000);

  return (
    <li className="bg-base-300 m-5 card p-5">
      <Link to={`/post/${id}`}>{listing.postTitle}</Link>
      <p>{listing.postBody}</p>
      <p>{`${output}`}</p>
      {onDelete && (
        <p onClick={() => onDelete(listing.id, listing.postTitle)}>Delete</p>
      )}

      {onEdit && <p onClick={() => onEdit(id)}>Edit</p>}
    </li>
  );
}

export default PostItem;
