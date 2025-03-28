import AspectRatio from '@mui/joy/AspectRatio';
import { Skeleton, Stack, Typography } from '@mui/material'
import Image from 'next/image'

type Props = {
    src: string,
    blur: boolean
}

export function PreviewImage({ src, blur }: Props) {
    return (
        <Stack width={1} height={1} justifyContent="">
            <Typography variant="h6" alignSelf="start" color='black'>
                Preview Image
            </Typography>
            <AspectRatio
                variant="soft"
                objectFit="contain"
                ratio="16/9"
                sx={{ width: 1 }}
                >
                    {src 
                    ? <Image
                        src={ src }
                        alt="preview-image"
                        layout='contain'
                        width={1}
                        height={1}
                        style={blur ? { filter: "blur(5px)"}: undefined}
                    /> 
                    : <Skeleton variant="rectangular" width={1}/>
                } 
            </AspectRatio>
        </Stack>
    );
}