import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Post() {
  const [post, setPost] = useState(null);

  //   const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  //   // Take post timestamp and make it into date format
  //   const secs = post.timestamp.seconds;
  //   const output = new Date(secs * 1000);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "listings", params.postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    };

    fetchPost();
  }, [params.postId]);

  if (!post) {
    return <Spinner />;
  }

  return (
    <main>
      <h1>{post.postTitle}</h1>
      <p>{post.postBody}</p>
    </main>
  );
}

export default Post;
