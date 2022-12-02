import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc
} from 'firebase/firestore';

import { auth } from './authentication';

import { PostType } from '../types.type';
import { db } from './firebaseConfig';

const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

const getPostsFromDB = async () => {
  const posts = await getDocs(postsQuery);
  if (posts.empty) return [];

  const newPosts: PostType[] = [];
  for (const post of posts.docs) {
    const postData = post.data();
    const newComment = {
      id: post.id,
      userId: postData.userId,
      title: postData.title,
      body: postData.body
    };
    newPosts.push(newComment);
  }

  return newPosts;
};

const createPostInDB = async (title: string, body: string) => {
  if (auth.currentUser === null) return null;

  const newPost = {
    title,
    body,
    userId: auth.currentUser.uid,
    createdAt: Timestamp.fromDate(new Date())
  };
  const post = await addDoc(collection(db, 'posts'), newPost);

  return { id: post.id };
};

const deletePostInDB = async (id: string) => {
  const post = doc(db, 'posts', id);
  const didDelete = await deleteDoc(post);
  return didDelete;
};

const updatePostInDB = async (
  id: string,
  data: { title?: string; body?: string }
) => {
  const post = doc(db, 'posts', id);
  const didUpdate = await updateDoc(post, data);

  return didUpdate;
};

export { getPostsFromDB, createPostInDB, deletePostInDB, updatePostInDB };
