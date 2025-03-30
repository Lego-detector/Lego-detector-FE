'use client';

import { ActionCard } from '@/modules/home/_components/ActionCard';
import { Grid2, Typography } from '@mui/material';
import axiosInstance from '@/shared/utils/axios';
import { getCredentials } from '@/shared/utils/cookie';
import { useState, useEffect } from 'react';

type imageData = {
  expireIndex: string,
  imageUrl: string,
  ownerId: string,
  result: [],
  status: string,
  _id: string
}

export default function History() {
  const [images, setImages] = useState<imageData[]>([]);

  const getUserHistory = async (): Promise<imageData[]> => {
    const axiosRes = await axiosInstance(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/history`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCredentials().accessToken}`,
        },
      },
    );
    return axiosRes.data.data;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyList: imageData[] = await getUserHistory();
        setImages(historyList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        History
      </Typography>
      <Grid2 container alignItems="center" spacing={2}>
        {images.map((image) => (
          <Grid2 key={image._id}>
            <ActionCard
              name={image.expireIndex}
              imageUrl={`${process.env.NEXT_PUBLIC_MINIO_URL + image.imageUrl}`}
            ></ActionCard>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
