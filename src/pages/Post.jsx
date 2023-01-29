import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Post() {
  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

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
    <main className="m-5 min-h-screen">
      <button className="btn mr-10 btn-md btn-secondary">Back</button>
      <div>
        <h1 className="text-4xl my-5 text-left">{post.postTitle}</h1>
      </div>
      <div className="divider"></div>
      <div className="p-5">
        <p className="break-words text-[15px]">{post.postBody}</p>
      </div>
    </main>
  );
}

export default Post;
