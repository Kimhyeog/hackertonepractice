"use client";

import { getSinglePost } from "@/api/post";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { getErrorMessage } from "@/lib/axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function PostDetailClient() {
  const { postId } = useParams() as { postId: string };
  const { data, isLoading, isError, error } = useQueryWrapper(
    ["single-post", String(postId)],
    () => getSinglePost({ postId: postId }),
    {
      enabled: !!postId,
      staleTime: 1000 * 60 * 5,
      onError: (error) => {
        const message = getErrorMessage(error);
        toast.error(message);
      },
    }
  );

  if (isLoading) return <div>게시글 불러오는 중..</div>;

  if (isError)
    return (
      <div>
        에러: {error instanceof Error ? error.message : "알 수 없는 에러"}
      </div>
    );

  if (!data?.post) return <div>게시글 데이터를 찾을 수 없습니다.</div>;

  const { title, content, userName, likes, comments } = data.post;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="mt-2">{content}</p>
      <div className="mt-4 text-sm text-gray-500">
        작성자: {userName} | 좋아요: {likes.length} | 댓글: {comments.length}
      </div>
    </div>
  );
}
