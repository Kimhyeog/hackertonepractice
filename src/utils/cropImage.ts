// src/utils/cropImage.ts

/*
  ✅ 전체 목적
    이 함수는:

    사용자가 크롭한 이미지의 좌표 정보(croppedAreaPixels)를 받아

    해당 영역만 잘라내고 (canvas 사용)

*/

//pica: 이미지 리사이징/변환을 고성능으로 처리하는 라이브러리
import pica from "pica";
import { Area } from "react-easy-crop";

export const getCroppedImg = async (
  imageSrc: string,
  //imageSrc : 크롭 대상 원본 이미지의 data URL 또는 이미지 경로
  croppedAreaPixels: Area
  //사용자가 자른 영역의 { x, y, width, height } 정보 , Area 객체
): Promise<Blob> => {
  //함수 리턴값 : Blob 객체로 변환 즉 , 서버 업로드가 가능한 JPEG 이미지 데이터를 반환

  //매개인자로 들어온 imageSrc를 이미지 태그 객체로 변환
  const image = new Image();
  image.src = imageSrc;

  //완전히 로딩된 후 다음 작업 진행
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  //자를 영역 크기만큼의 새 캔버스 생성
  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  //2D 그리기 컨텍스트 획득 → 이미지를 실제로 그릴 도화지의 붓이라고 보면 됩니다.
  const ctx = canvas.getContext("2d");

  //drawImage() :  이미지의 일부분을 잘라서 그릴 수 있습니다.
  ctx?.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  /*
      pica().toBlob(...): canvas를 압축된 JPEG 이미지로 변환

    "image/jpeg": MIME 타입

    0.9: 압축 품질 (1에 가까울수록 고화질)
  */
  // Blob 변환
  const blob = await pica().toBlob(canvas, "image/jpeg", 0.9);
  return blob;
};
