"use client";

import { getPosts } from "@/api/post";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { getErrorMessage } from "@/lib/axios";
import { ReadPostsResponse } from "@/types/post";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Pagination from "../Pagination";
import SortSelector from "../SortSelector";
import { useRouter } from "next/navigation";

// 한 페이지 당 보여지는 게시글 수
const PostsSize = 3;

// 정렬 기준 옵션 타입
type PostOption = "latest" | "most-liked" | "most-commented";

// 정렬 옵션 label, value 객체 배열
const postSortOptions: { label: string; value: PostOption }[] = [
  { label: "최신순", value: "latest" },
  { label: "좋아요 순", value: "most-liked" },
  { label: "댓글 순", value: "most-commented" },
];

function PostList() {
  const [page, setPage] = useState(1);
  const [option, setOption] = useState<PostOption>("latest");
  const [totalPage, setTotalPage] = useState(Infinity);

  const router = useRouter();

  const { data, isLoading, isError, error } =
    useQueryWrapper<ReadPostsResponse>(
      ["Posts", option, String(page), String(PostsSize)],
      () =>
        getPosts({
          option: option,
          page: page,
          size: PostsSize,
        }),
      {
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
          const message = getErrorMessage(error);
          toast.error(message);
        },
      }
    );

  useEffect(() => {
    if (data?.posts && data.posts.length < PostsSize) setTotalPage(page);
    else setTotalPage(Infinity);
  }, [data, page]);

  if (isLoading) return <div>게시글 불러오는 중...</div>;
  if (isError)
    return (
      <div>
        게시글 불러오기 에러:{" "}
        {error instanceof Error ? error.message : "알 수 없는 에러"}
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* 게시물 목록 */}
      {data?.posts.map((post) => (
        <div
          onClick={() => router.push(`/post/${post.id}`)}
          key={post.id}
          className="border rounded p-4 cursor-pointer"
        >
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p>{post.content}</p>
          <small>
            작성자: {post.userName} | 좋아요: {post.likes.length} | 댓글:{" "}
            {post.comments.length}
          </small>
        </div>
      ))}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        totalPage={totalPage}
        onChangePage={setPage}
      />

      {/* 정렬 옵션 */}
      <SortSelector<PostOption>
        label={"게시글 장렬 순서"}
        value={option}
        onChange={(newOption) => {
          setPage(1);
          setOption(newOption);
        }}
        options={postSortOptions}
      />
    </div>
  );
}

export default PostList;
