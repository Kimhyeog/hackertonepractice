import { API, getErrorMessage } from "@/lib/axios";
import { SkinDiagnosisRequest, SkinDiagnosisResponse } from "@/types/diagnosis";

export const sendDiagnosis = async (
  data: SkinDiagnosisRequest
): Promise<SkinDiagnosisResponse> => {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
    const res = await API.post("/skin-diagnosis", formData, {
      headers: {
        "Content-Type": "mutipart/form-data",
      },
    });
    return {
      success: true,
      diagnosis: res.data,
      message: "진단을 성공했습니다.",
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return { success: false, diagnosis: null, message: message };
  }
};
