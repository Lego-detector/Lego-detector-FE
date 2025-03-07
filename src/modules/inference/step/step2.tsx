'use client'

import { Button, Stack, Typography } from "@mui/material";
import Card from "@/shared/components/card";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useCreateInferenceSession, useInferenceStepperContext } from "../_hooks";
import { FileUpload } from "../_components/fileUpload";
import Image from 'next/image'
import { base64ToFile } from "@/shared/utils";
import { EVENT, STORAGE_KEY } from "../_config/config";

export function StepTwo() {
    const [ image, setImage ] = useState<string | null>(null);
    const { setStep, setSessionId } = useInferenceStepperContext();
    const { mutateAsync: createInferenceSession } = useCreateInferenceSession();

    const onSubmit = async () => {
        try {

            if (image === '' && !image) {
                return;
            }

            const reqBody = new FormData();
            reqBody.append('image', base64ToFile(image as string) as Blob); 
            
            const { data } = await createInferenceSession(reqBody);
            console.log(data)
            localStorage.setItem(STORAGE_KEY.IMAGE, '');
            setSessionId(data._id)
            setStep(2);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        const setupImage = () => {
            const storedImage = localStorage.getItem(STORAGE_KEY.IMAGE);
            setImage(storedImage)
        };

        setupImage();
        
        window.addEventListener(EVENT.STORAGE_CHANGE, setupImage);

        return () => {
            window.removeEventListener(EVENT.STORAGE_CHANGE, setupImage);
        };
    }, []);

    return (
        <Stack alignContent="center" justifyContent="space-between" direction="row">
            <Card>
                <Typography variant="body1">Preview</Typography>
                {/* Render image or Skeleton as a placeholder */}
                {image ? (
                    <Image
                        src={image}
                        alt="Preview"
                        className="w-full h-auto rounded-lg"
                        width={300}
                        height={200}
                    />
                ) : (
                    <Box width="300px" height="200px"/>
                )}
                <Stack direction="row" gap={2}>
                        <FileUpload 
                            innerText="Choose other image"
                            varaint="outlined"
                        />
                        <Button 
                            type="button"
                            onClick={onSubmit}
                            variant="contained" >
                                Detect
                        </Button>
                </Stack>
            </Card>
        </Stack>
    );
}
