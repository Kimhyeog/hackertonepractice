"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { SkinDiagnosis } from "@/types/diagnosis";
import { sendDiagnosis } from "@/api/diagnosis";
import GeneralModal from "@/components/GeneralModal";

function ImageSendBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
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

  //업로드 된 직후 작동되는 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //업로드 된 이미지 file 객체에 저장
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("이미지는 10MB 이하만 업로드 가능합니다.");
      return;
    }

    //FileReader객체를 이용하여, 파일 → base64로 읽기
    const reader = new FileReader();
    reader.onload = () => {
      // 나중에 크롭 UI에 넘겨줄 이미지
      setImageSrc(reader.result as string);

      // 크롭 모달 띄우기
      setCropping(true);
    };

    //file을 base64 형식의 문자열로 변환하여 reader.result에 넣기ㅣ
    reader.readAsDataURL(file);
  };

  // "진단하기" 버튼 핸들러
  const handleCropAndUpload = async () => {
    //이미지 소스가 없거나 크롭 영역 정보가 없으면 실행 중단
    // - imageSrc는 base64 문자열,
    // - croppedAreaPixels는 크롭된 사각형의 x, y, width, height 정보
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      // 크롭의 getCroppedImg()메소드를 거쳐, 서버 업로드가 가능한 JPEG 이미지  blob 객체로 반환
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);

      //Blob은 실제 파일은 아니므로, 서버에 보내기 위해 File로 감싼다.
      /*
        new File([blob], filename, { type }) 형식으로 사용합니다.

        "cropped-image.jpg"라는 이름을 가진 JPEG 이미지로 만듭니다.
      */

      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      // 서버에 최종 file 전송
      diagnoseMutation.mutate({ image: file });

      //크롭 모달 닫기
      setCropping(false);

      //초기 업로드한 이미지 제거
      setImageSrc(null);
    } catch (e) {
      toast.error("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
      />

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

      <GeneralModal isOpen={cropping} onClose={() => setCropping(false)}>
        <div className="flex flex-col items-center p-4 w-[300px] sm:w-[400px]">
          <div className="relative w-full h-[300px] bg-black">
            <Cropper
              image={imageSrc!}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPixels) =>
                setCroppedAreaPixels(areaPixels)
              }
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCropAndUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              진단하기
            </button>
            <button
              onClick={() => {
                setCropping(false);
                setImageSrc(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              취소
            </button>
          </div>
        </div>
      </GeneralModal>
    </div>
  );
}

export default ImageSendBox;
