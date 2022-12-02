import { getPostsFromDB } from '../utils/post';

import { PostType } from '../types.type';

const getPosts = async (): Promise<PostType[]> => {
  const posts = await getPostsFromDB();
  return posts;
};

export { getPosts };
