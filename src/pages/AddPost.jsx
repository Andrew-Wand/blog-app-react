import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

function AddPost() {
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });

  const { postTitle, postBody } = formData;

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      } else {
        navigate("/sign-in");
      }
    });

    return;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    toast.success("Post saved");
    navigate(`/post/${docRef.id}`);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <header>
        <p>Add Post</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              id="postTitle"
              value={postTitle}
              maxLength="32"
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label>Body:</label>
            <textarea
              type="text"
              id="postBody"
              value={postBody}
              onChange={onChange}
              className="textarea textarea-bordered"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Create Post
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddPost;
