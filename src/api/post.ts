import { getErrorMessage, PublicAPI } from "@/lib/axios";
import {
  ReadPostsRequest,
  ReadPostsResponse,
  ReadSinglePostRequest,
  ReadSinglePostResponse,
} from "@/types/post";

export const getPosts = async (
  data: ReadPostsRequest
): Promise<ReadPostsResponse> => {
  const { option, size, page } = data;

  try {
    const res = await PublicAPI.get(
      `/posts/read-${option}?size=${size}&page=${page}`
    );

    // export interface ReadPostsResponse {
    //  타입이 이렇게 정의되어있다면, 저렇게 반환해야한다.
    //   posts: Post[];
    // }

    return { posts: res.data };
  } catch (error) {
    throw error;
  }
};

// api/post.ts
export const getSinglePost = async (
  data: ReadSinglePostRequest
): Promise<ReadSinglePostResponse> => {
  try {
    const res = await PublicAPI.get(`/posts/read-one/${data.postId}`);
    return { post: res.data }; // ✅ 반드시 { post: Post } 형태
  } catch (error) {
    throw error; // ✅ 반드시 throw 처리
  }
};
