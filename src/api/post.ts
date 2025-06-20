import { getErrorMessage, PublicAPI } from "@/lib/axios";
import { ReadPostsRequest, ReadPostsResponse } from "@/types/post";

// export const getPosts = async (
//   data: ReadPostsRequest
// ): Promise<ReadPostsResponse> => {
//   // if(data.options)에 따라 , 최신숟, 조회순, 탯글 순 출력
//   try {
//     const res = await PublicAPI.get(
//       `/posts/read-${data.options}?size=${data.size}&page=${data.page}`
//     );
//     return res.data;
//   } catch (error) {
//     const message = getErrorMessage(error);
//     throw error;
//     return [];
//   }
// };

export const getPosts = async (
  data: ReadPostsRequest
): Promise<ReadPostsResponse> => {
  const { option, size, page } = data;

  try {
    const res = await PublicAPI.get(
      `/posts/read-${option}?size=${size}&page=${page}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
