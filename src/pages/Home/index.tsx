import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Post from './Post';

import { PostType } from '../../types.type';
import { getPosts } from '../../api/getPosts';
import CreatePostButton from './CreatePostButton';

export const loader = async (): Promise<PostType[]> => {
  const res = await getPosts();
  return res;
};

const Home: React.FC = () => {
  const posts = useLoaderData() as PostType[];
  const [postItems, setPostItems] = useState<PostType[]>([]);

  useEffect(() => {
    setPostItems([...posts]);
  }, [posts]);

  const removePost = (postId: string) => {
    const postIndex = postItems.findIndex(post => post.id === postId);
    if (postIndex === -1) return;
    const newPostItems = [...postItems];
    newPostItems.splice(postIndex, 1);
    setPostItems(newPostItems);
  };
  const updatePost = (
    postId: string,
    updatedVals: { title: string; body: string }
  ) => {
    const postIndex = postItems.findIndex(post => post.id === postId);
    const newPosts = [...postItems];
    newPosts[postIndex] = { ...newPosts[postIndex], ...updatedVals };
    setPostItems(newPosts);
  };

  return (
    <div className="container">
      <Navbar />

      <div className="row g-3">
        {postItems && postItems.length > 0 ? (
          postItems.map(post => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={post.id}>
              <Post
                {...post}
                handlePostRemove={removePost}
                handlePostUpdate={updatePost}
              />
            </div>
          ))
        ) : (
          <p className="text-muted text-center" style={{ marginTop: 150 }}>
            No posts available create a new one
          </p>
        )}
      </div>

      <CreatePostButton />
    </div>
  );
};

export default Home;
