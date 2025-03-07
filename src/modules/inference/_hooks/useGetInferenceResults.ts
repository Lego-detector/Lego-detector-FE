

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getInferenceResults } from '../_services';
import { DETECTOR_QUERY_KEY } from '../_config';

type Props = {
    sessionId: string;
};


export const useGetInferenceResults = ({ sessionId } : Props) => 
    useQuery({
        queryKey: [ DETECTOR_QUERY_KEY.RESULTS, sessionId],
        queryFn: async () => {
            const response = await getInferenceResults(sessionId);
            if (response.status === 202) {
              throw new Error("Sessions not yet completed"); // Force retry on 202
            }

            return response.data
        },
        retry: (failureCount, error): boolean => {
            return error.message === "Sessions not yet completed"
        },
        retryDelay: 2000,
        cacheTime: 0,
    } as UseQueryOptions<unknown, Error> );



