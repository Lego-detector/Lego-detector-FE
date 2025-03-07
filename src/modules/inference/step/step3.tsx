'use client'

import { Stack } from "@mui/material";
import { useGetInferenceResults, useInferenceStepperContext } from "../_hooks";
import { BoundingBoxCanvas } from "../_components";
import { useEffect, useState } from "react";

export function StepThree() {
    const { sessionId, setSessionId } = useInferenceStepperContext();
    const [ curSession ] = useState<string>(sessionId);
    const { data } = useGetInferenceResults({ sessionId: curSession });
    
    useEffect(() => {
        setSessionId('')
    }, [])
    
    return (
        <Stack alignContent="center" justifyContent="space-between" direction="row">
            
            {data?.data && <BoundingBoxCanvas 
                imageUrl={"http://localhost:9000/lego-detector/" + data.data.imageUrl}
                results={data.data.results}
            />}
        </Stack>
    );
}
