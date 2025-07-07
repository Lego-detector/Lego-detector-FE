

import { useMutation } from '@tanstack/react-query';

import { createInferenceSession } from '../_services';

export const useCreateInferenceSession = () =>
  useMutation({
    mutationFn: (reqBody: FormData) => createInferenceSession(reqBody),
    onError: (error) => error,
});

