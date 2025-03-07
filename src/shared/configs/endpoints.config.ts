export const endpoint = {
    detector: {
        results: (sessionId: string) => `detector/results?sessionId=${sessionId}`,
        predict: `detector/predict`
    }
}