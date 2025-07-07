

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getInferenceResults } from '../_services';
import { DETECTOR_QUERY_KEY } from '../_config';
import { InferenceResults } from '../types';
import { HttpStatusCode } from 'axios';

type Props = {
    sessionId: string;
};


export const useGetInferenceResults = ({ sessionId } : Props) => {
    const retryMessageTrigger = "Sessions not yet completed";

    return useQuery({
        queryKey: [ DETECTOR_QUERY_KEY.RESULTS, sessionId],
        queryFn: async () => {
            const response = await getInferenceResults(sessionId);
            if (response.status === HttpStatusCode.Accepted) {
              throw new Error(retryMessageTrigger);
            }

            return response.data.data
        },
        retry: (failureCount, error): boolean => {
            return error.message === retryMessageTrigger;
        },
        retryDelay: 3000,
    } as UseQueryOptions<InferenceResults, Error> ); 
}



