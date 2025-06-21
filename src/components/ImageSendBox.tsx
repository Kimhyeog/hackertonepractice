"use client";

import { useImageCropper } from "@/hooks/useImageCropper";
import ImageCropModal from "@/components/ImageCropModal";
import { useMutation } from "@tanstack/react-query";
import { sendDiagnosis } from "@/api/diagnosis";
import { SkinDiagnosis } from "@/types/diagnosis";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function ImageSendBox() {
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

  //1. useImageCropper 훅에서 cropper 객체 생성
  const cropper = useImageCropper((file) => {
    //2. mutation 객체의 mutate인자에 file 전송
    diagnoseMutation.mutate({ image: file });
  });

  return (
    <div className="flex flex-col gap-4 items-start">
      {/* 3. input 태그에 ref , onChange에 
      cropper 객체의 
        - inputRef 객체
        - handleImageChange 메소드
        등록
      */}
      <input
        type="file"
        accept="image/png , image/jpg , image/jpeg"
        ref={cropper.inputRef}
        onChange={cropper.handleImageChange}
      />
      {/* 출력부분 */}
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

      {/* 이미지 크롭 기능이 달린 모달창 */}
      <ImageCropModal
        // 모달이 열닫의 boolean 값
        isOpen={cropper.cropping}
        // 크롭할 이미지의 경로(Base64 문자열)
        imageSrc={cropper.imageSrc!}
        // 크롭의 x, y 축 좌표값이 들어간 객체 { x: number, y: number }
        crop={cropper.crop}
        // 이미지 확대/축소
        zoom={cropper.zoom}
        //사용자가 드래그로 크롭 위치를 바꿀 때 호출되는 콜백
        onCropChange={cropper.setCrop}
        //줌 슬라이더 변경 시 호출
        onZoomChange={cropper.setZoom}
        //사용자가 크롭 박스를 조절 완료했을 때 실행되는 콜백
        onCropComplete={(_, area) => cropper.setCroppedAreaPixels(area)}
        //"확인" 버튼을 눌렀을 때 실행할 함수 핸들러
        onConfirm={cropper.handleCropConfirm}
        //	"취소" 버튼을 눌렀을 때 실행할 함수
        onCancel={cropper.cancelCrop}
      />
    </div>
  );
}
