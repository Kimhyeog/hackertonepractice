import { useState, useRef } from "react";
import { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { toast } from "sonner";

// 크롭이 완료됐을 때 처리할 콜백 함수를 인자로 받음
/*
 Ex)
  const cropper = useImageCropper((file) => {
    //2. mutation 객체의 mutate인자에 file 전송
    diagnoseMutation.mutate({ image: file });
  });

*/
export function useImageCropper(onCropComplete: (file: File) => void) {
  //inputRef: <input type="file"> DOM 요소에 접근하기 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);

  //imageSrc: 업로드된 이미지의 base64 문자열
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  //cropping : 모달이 열렸는지를 나타내는 상태
  const [cropping, setCropping] = useState(false);
  //crop: 크롭 위치 상태 (x, y)
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  //zoom: 줌(확대/축소) 상태
  const [zoom, setZoom] = useState(1);

  //croppedAreaPixels: 크롭 완료 시 픽셀 좌표 영역
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  //외부 버튼이 이 함수만 호출하면 input[type="file"]이 클릭됨
  const openFileDialog = () => inputRef.current?.click();

  // input에서 사진이 업로드되어 사진값이 바뀔 시, 발생되는 onChange 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("이미지는 10MB 이하만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCropping(true);
    };
    reader.readAsDataURL(file);
  };

  //이미지 크롭을 완료 후, 확인 버튼을 누를 시, 발생 핸들러
  const handleCropConfirm = async () => {
    //이미지 소스가 없거나 크롭 영역 정보가 없으면 실행 중단
    // - imageSrc는 base64 문자열,
    // - croppedAreaPixels는 크롭된 사각형의 x, y, width, height 정보
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      // 크롭의 getCroppedImg()메소드를 거쳐,
      // => 서버 업로드가 가능한 JPEG 이미지를  blob 객체로 반환
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);

      //Blob은 실제 파일은 아니므로, 서버에 보내기 위해 File로 감싼다.
      /*
        new File([blob], filename, { type }) 형식으로 사용합니다.

        "cropped-image.jpg"라는 이름을 가진 JPEG 이미지로 만듭니다.
      */
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      //mutation의 mutate 작동 후, 파일 전송
      onCropComplete(file); // 업로드 후처리는 부모에서

      //모달 닫기 및 , 업로드된 이미지 제거
      setCropping(false);
      setImageSrc(null);
    } catch {
      toast.error("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  // 취소 버튼 누를 시 ,작동되는 핸들러
  const cancelCrop = () => {
    setCropping(false);
    setImageSrc(null);
  };

  return {
    inputRef,
    imageSrc,
    cropping,
    crop,
    zoom,
    croppedAreaPixels,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
    handleImageChange,
    handleCropConfirm,
    cancelCrop,
    openFileDialog,
  };
}
