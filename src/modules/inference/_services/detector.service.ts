import axiosInstance from "@/shared/utils/axios";

import { endpoint } from "@/shared/configs";
import { InferenceResults } from "../types";

  

export const createInferenceSession = async (reqBody: FormData): Promise<InferenceResults> => {
    const { data } = await axiosInstance.post<InferenceResults>(
        endpoint.detector.predict,
        reqBody,
    );

    return data
}

export const getInferenceResults = async (sessionId: string) => {
    const res = await axiosInstance.get(
        endpoint.detector.results(sessionId),
    );

    return res;
}