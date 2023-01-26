import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import PostItem from "../components/PostItem";

function Home() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedPost, setLastFetchedPost] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(10));

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
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);

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
      {listings && listings.length > 0 ? (
        <>
          <main>
            <div>
              <ul className="card-body">
                {listings.map((listing) => (
                  // <h1 key={listing.id}>{listing.data.postTitle}</h1>
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
        <h1>No listings</h1>
      )}
    </div>
  );
}

export default Home;
