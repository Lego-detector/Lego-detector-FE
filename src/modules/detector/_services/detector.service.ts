import axiosInstance from "@/shared/utils/axios";

import { endpoint } from "@/shared/configs";
import { ClassNames, InferenceResults } from "../types";
import { AxiosResponse } from "axios";
import { BEResponse } from "@/shared/types";

type ResultsResponse = BEResponse<InferenceResults>;

export const createInferenceSession = async (reqBody: FormData): Promise<AxiosResponse<ResultsResponse>> => {
    const res = await axiosInstance.post<BEResponse<InferenceResults>>(
        endpoint.detector.predict,
        reqBody,
    );

    return res;
}

export const getInferenceResults = async (sessionId: string): Promise<AxiosResponse<BEResponse<InferenceResults>>> => {
    const data = await axiosInstance.get<BEResponse<InferenceResults>>(
        endpoint.detector.results(sessionId),
    );

    return data;
}

export const getClassNames = async (): Promise<ClassNames[]> => {
    const res = await axiosInstance.get<BEResponse<ClassNames[]>>(
        endpoint.detector.className
    );

    console.log(res.data)

    return res.data.data ?? [];
}