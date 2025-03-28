"use client"

import { Button, Grid2, Stack } from "@mui/material";
import Card from "@/shared/components/card";
import { useEffect, useState } from "react";
import { useCreateInferenceSession } from "../_hooks";
import { FileUpload } from "../_components/fileUpload";
import { urlToBlob } from 'image-resize-compress';
import { EVENT, REDIRECT_PATH, STORAGE_KEY } from "../_config/config";
import { useRouter } from 'next/navigation'
import { PreviewImage } from "../_components";

export function StepTwo() {
    const router = useRouter();
    const [ image, setImage ] = useState<string>('');
    const { mutateAsync: createInferenceSession } = useCreateInferenceSession();

    const onSubmit = async () => {
        try {
            if (image === '' && !image) {
                return;
            }

            const reqBody = new FormData();
            const imageFile = await urlToBlob(image)
            reqBody.append('image', imageFile); 
            
            const { data: response } = await createInferenceSession(reqBody);
            localStorage.setItem(STORAGE_KEY.IMAGE, '')

            const results = response.data
            

            router.push(REDIRECT_PATH.RESULTS + results?._id);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        const setupImage = () => {
            const storedImage = localStorage.getItem(STORAGE_KEY.IMAGE) ?? '';
            setImage(storedImage)
        };

        setupImage();
        
        window.addEventListener(EVENT.STORAGE_CHANGE, setupImage);

        return () => {
            window.removeEventListener(EVENT.STORAGE_CHANGE, setupImage);
        };
    }, []);

    return (
        <Grid2 container alignItems="center" justifyContent="center">
            <Card 
                display="flex" 
                flexDirection="column" 
                gap={2}
                width={775}
                height={"40%"}
                justifyContent="space-between"
            >
                <PreviewImage src={image} blur={false}/>

                <Stack direction="row" gap={2} alignSelf="end">
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
        </Grid2>
    );
}
