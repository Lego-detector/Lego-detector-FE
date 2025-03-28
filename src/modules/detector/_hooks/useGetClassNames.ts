

import { useQuery } from '@tanstack/react-query';

import { getClassNames } from '../_services';
import { DETECTOR_QUERY_KEY } from '../_config';


export const useGetClassNames = () => useQuery({
    queryKey: [ DETECTOR_QUERY_KEY.CLASSNAMES],
    queryFn: getClassNames
}); 



