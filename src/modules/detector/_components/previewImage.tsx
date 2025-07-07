import { Skeleton, Stack, Typography, Box } from '@mui/material';
import Image from 'next/image';

type Props = {
  src: string;
  blur: boolean;
};

export function PreviewImage({ src, blur }: Props) {
  return (
    <Stack
      width={1}
      height={1}
      justifyContent="flex-start"
      className="previewImage"
    >
      <Typography variant="h6" alignSelf="start" sx={{ mb: 1 }}>
        Preview Image
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio (9 / 16 = 0.5625)
        }}
      >
        {src ? (
          <Image
            src={src}
            alt="preview-image"
            layout="fill"
            objectFit="contain"
            style={blur ? { filter: 'blur(5px)' } : undefined}
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
      </Box>
    </Stack>
  );
}
