"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import { SkinDiagnosis } from "@/types/diagnosis";
import { sendDiagnosis } from "@/api/diagnosis";

function ImageSendBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<SkinDiagnosis | null>(null);

  const diagnoseMutation = useMutation({
    mutationFn: sendDiagnosis,
    onSuccess: (res) => {
      if (res.success && res.diagnosis) {
        setResult(res.diagnosis);
        toast.success("진단 완료!");
      } else {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error("진단 요청 중 오류가 발생했습니다.");
    },
  });

  const handleUpload = () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      toast.warning("이미지를 선택해주세요.");
      return;
    }

    // 클라이언트 측 유효성 검사
    if (file.size > 10 * 1024 * 1024) {
      toast.error("이미지는 10MB 이하만 업로드 가능합니다.");
      return;
    }

    diagnoseMutation.mutate({ image: file });
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <input type="file" accept="image/*" ref={inputRef} />
      <button
        onClick={handleUpload}
        disabled={diagnoseMutation.isPending}
        className="bg-sky-500 text-white px-4 py-2 rounded"
      >
        {diagnoseMutation.isPending ? "진단 중..." : "진단하기"}
      </button>

      {result && (
        <div className="p-4 mt-4 border rounded w-full bg-white shadow">
          <h2 className="text-lg font-bold mb-2">진단 결과</h2>
          <p>
            <strong>질병명:</strong> {result.disease}
          </p>
          <p>
            <strong>확률:</strong> {result.probability.toFixed(2)}%
          </p>
          <p>
            <strong>출처:</strong> {result.source}
          </p>
          <p className="mt-2 whitespace-pre-wrap">
            <strong>치료법:</strong>
            <br />
            {result.treatment}
          </p>
          <Image
            width={256}
            height={256}
            src={result.imageUrl}
            alt="진단 결과 이미지"
            className="mt-4 rounded border"
          />
        </div>
      )}
    </div>
  );
}

export default ImageSendBox;
