export const endpoint = {
    detector: {
        className: `detector/class-names`,
        results: (sessionId: string) => `detector/results?sessionId=${sessionId}`,
        predict: `detector/predict`
    }
}