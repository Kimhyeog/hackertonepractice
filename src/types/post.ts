export interface PostComment {
  id: number;
  userName: string;
  content: string;
  createAt: string; // ISO date string
}

export interface Post {
  id: number;
  title: string;
  userId: string;
  userName: string;
  images: string[]; // 이미지 URL 배열
  content: string;
  createAt: string;
  updateAt: string;
  likes: string[]; // 좋아요 누른 userId 목록
  comments: PostComment[]; // 댓글 목록
}

//게시물 전체 조회(최신 순) API

export interface ReadPostsRequest {
  option: string;
  size: number;
  page: number;
}

// 응답은 Post 배열
export interface ReadPostsResponse {
  posts: Post[];
}

// 게시글 단일 조회 API
export interface ReadSinglePostRequest {
  postId: string;
}

export interface ReadSinglePostResponse {
  post: Post;
}
