import { createContext, useContext } from "react";


export type InferenceStepperContextType = {
    step: number;
    setStep: (step: number) => void;
    sessionId: string;
    setSessionId: (id: string) => void;
}

export const InferenceStepperContext = createContext<InferenceStepperContextType | undefined>(undefined);

export function useInferenceStepperContext() {
    const context = useContext(InferenceStepperContext);
    if (!context) {
        throw new Error("useInferenceStepperContext must be used within an InferenceStepperContextProvider");
    }
    
    return context;
}