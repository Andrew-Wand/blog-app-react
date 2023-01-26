import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

function EditPost() {
  const [post, setPost] = useState(false);
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });

  const { postTitle, postBody } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();

  //   Redirect if listing is not users
  useEffect(() => {
    if (post && post.userRef !== auth.currentUser.uid) {
      toast.error("You cannot edit that listing");
      navigate("/");
    }
  });

  //   Sets form data to edit form
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "listings", params.postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
        setFormData({ ...docSnap.data() });
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    };

    fetchPost();
  }, [params.postId, navigate]);

  //   Sets userRef to logged in user
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

    // Update listing
    const docRef = doc(db, "listings", params.postId);
    await updateDoc(docRef, formDataCopy);
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
        <p>Edit Post</p>
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
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditPost;
