'use client'

import { JSX, useEffect, useState } from "react";

import { StepTwo, StepOne } from "./step";
import { EVENT, STORAGE_KEY } from "./_config/config";
import { InferenceStepperContext } from "./_hooks";


const slideStep = new Map<number, JSX.Element>([
  [ 0, <StepOne key='StepOne'/> ],
  [ 1, <StepTwo key='StepTwo'/> ],
])


export default function InferenceStepper() {
    const [ step, setStep ] = useState<number>(0);
        
    useEffect(() => {
        const hasImage = localStorage.getItem(STORAGE_KEY.IMAGE);
        const handleStorageChange = () => {
            setStep(1)
        };

        if (hasImage) {
            handleStorageChange();
        }

        window.addEventListener(EVENT.STORAGE_CHANGE, handleStorageChange);

        return () => {
            window.removeEventListener(EVENT.STORAGE_CHANGE, handleStorageChange);
        };
    }, []);

    return (
        <>
            <InferenceStepperContext.Provider value={{ step, setStep }}>
                {slideStep.get(step)}
            </InferenceStepperContext.Provider>
        </>
    );
}