import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/post";
import { usePost } from "../hook/usePost";


const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (<h1>Loading...</h1>);
  }

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map(post => {
            return <Post user={post.user} post={post} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
