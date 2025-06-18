import { getErrorMessage, PublicAPI } from "@/lib/axios";
import { CheckUserIdRequest } from "@/types/signup";
import {
  CheckUserIdResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/user";

export const checkUserId = async (
  data: CheckUserIdRequest
): Promise<CheckUserIdResponse> => {
  try {
    const res = await PublicAPI.get(`/check-userid?userId=${data.userId}`);

    return { success: true, message: res.data.message };
  } catch (error) {
    const message = getErrorMessage(error);
    return { success: false, message: message };
  }
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const res = await PublicAPI.post("/signup", data);
    return { success: true, message: res.data.message };
  } catch (error) {
    const message = getErrorMessage(error);
    return { success: false, message: message };
  }
};
