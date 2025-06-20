"use client";

import { getPosts } from "@/api/post";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { getErrorMessage } from "@/lib/axios";
import { ReadPostsResponse } from "@/types/post";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Pagination from "../Pagination";
import SortSelector from "../SortSelector";

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
  /*
    useState 변수 선언 : 페이지 수, 정렬 옵션 , 전체 페이지 수
  */
  const [page, setPage] = useState(1);
  const [option, setOption] = useState<PostOption>("latest");
  const [totalPage, setTotalPage] = useState(Infinity);

  // useQueryWrapper 호룰로 게시글 불러오기

  // const { data, isLoading, isError, error } =
  //   useQueryWrapper<ReadPostsResponse>(
  //     // useQueryWrapper의 key 타입 : string[] 이기에
  //     ["Posts", option, String(page), String(PostsSize)],
  //     () => getPosts({ option: option, size: PostsSize, page: page }),
  //     {
  //       staleTime: 1000 * 60 * 5,
  //       onError: (err) => {
  //         // 에러 처리
  //         toast.error(err instanceof Error ? err.message : "알 수 없는 에러");
  //       },
  //     }
  //   );

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

  // useEffect(() => {
  //   if (data && data.length < PostsSize) {
  //     // 데이터가 있지만, 불러온 한페이지당의 게시글 수 < 한페이지의 보여지는 게시글 수
  //     // => 더이상 불러올 게시글이 없다고 판단 => totalPage === 그떄 해당 페이지 넘버값
  //     setTotalPage(page);
  //   } else {
  //     setTotalPage(Infinity);
  //   }
  // }, [data, page]);

  useEffect(() => {
    if (data && data.length < PostsSize) setTotalPage(page);
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
      {data?.map((post) => (
        <div key={post.id} className="border rounded p-4">
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
      {/* <div className="mt-4 flex gap-2">
        <button
          disabled={page <= 1}
          className={`px-2 py-1 rounded ${
            page <= 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          이전
        </button>
        <span>{page} 페이지</span>
        <button
          disabled={page >= totalPage}
          className={`px-2 py-1 rounded ${
            !data || data.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={() => setPage((prev) => prev + 1)}
        >
          다음
        </button>
      </div> */}

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
