import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";

function Home() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedPost, setLastFetchedPost] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingsRef,
          orderBy("timestamp", "desc"),
          // where("userRef", "==", auth.currentUser.uid),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedPost(lastVisible);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);

        // console.log(auth.currentUser.uid);
      } catch (error) {
        // toast.error("Could not fetch listings");
        setLoading(false);
      }
    };

    fetchListings();
  }, [auth.currentUser?.uid]);

  // Pagination
  const onFetchMorePosts = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingsRef,
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedPost),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedPost(lastVisible);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  const onDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", postId));
      const updatedPosts = listings.filter((listing) => listing.id !== postId);
      setListings(updatedPosts);
      toast.success("Success!");
    }
  };

  const onEdit = (postId) => navigate(`/edit-post/${postId}`);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Spinner />
      ) : auth.currentUser ? (
        <>
          <main>
            <div>
              <ul className="card-body">
                {listings.map((listing) => (
                  <PostItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </div>
          </main>
          <br />
          <br />
          {lastFetchedPost && <p onClick={onFetchMorePosts}>Load More</p>}
        </>
      ) : (
        <Link to="sign-in" className="link link-warning">
          Sign in to post!
        </Link>
      )}
    </div>
  );
}

export default Home;
