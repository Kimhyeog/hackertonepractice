//src\components\DiagnoseBox.tsx

"use client";

import { sendDiagnosis } from "@/api/diagnosis";
import { getErrorMessage } from "@/lib/axios";
import { SkinDiagnosis } from "@/types/diagnosis";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

function DiagnoseBox() {
  // 사진 업로드를 위한 useRef 초기화
  const inputRef = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState<SkinDiagnosis | null>(null);

  const diagnosisMutation = useMutation({
    mutationFn: sendDiagnosis,
    onSuccess: (res) => {
      // 진단 성공 시 => success : true, diagnose : 존재
      if (res.success && res.diagnosis) {
        // state에 진단 결과 저장
        setResult(res.diagnosis);

        toast.success(res.message);
      } else {
        // 서버에서 진단 실패 시 => success : true , diagnose : null , message : 진단 실패 이유
        toast.error(res.message);
      }
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  // 진단하기 버튼 누를시 , 사진 전달 핸들러
  const handleUpload = () => {
    // 업로드된 사진 파일이 존재하는지 확인
    const file = inputRef.current?.files?.[0];

    //파일이 없다면,
    if (!file) {
      // 이미지 없다는 경고 알림
      toast.error("이미지를 업로드해주세요.");
      // 전송 강제 종료
      return;
    }

    //클라이언트 측 유효성 검사 (선택)
    if (file.size > 10 * 1024 * 1024) {
      //10MB보다 큰지 확인
      toast.error("이미지는 10MB 이하만 업로드 가능합니다.");
      return;
    }

    // 모든 검사 끝낸 후, 파일 전송
    diagnosisMutation.mutate({ image: file });
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <input type="file" accept="image/*" ref={inputRef} />

        <button onClick={handleUpload} disabled={diagnosisMutation.isPending}>
          {diagnosisMutation.isPending ? "진단하는 중..." : "진단하기"}
        </button>
      </div>
      <div>
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
    </div>
  );
}

export default DiagnoseBox;
