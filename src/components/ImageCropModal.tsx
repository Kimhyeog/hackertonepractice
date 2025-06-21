import Cropper from "react-easy-crop";
import GeneralModal from "@/components/GeneralModal";

interface Props {
  isOpen: boolean;
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (_: any, area: any) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ImageCropModal = ({
  isOpen,
  imageSrc,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <GeneralModal isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col items-center p-4 w-[300px] sm:w-[400px]">
        <div className="relative w-full h-[300px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            진단하기
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </GeneralModal>
  );
};

export default ImageCropModal;
