'use client';

import { ActionCard } from '@/modules/home/_components/ActionCard';
import { Grid2, Typography } from '@mui/material';
import axiosInstance from '@/shared/utils/axios';
import { getCredentials } from '@/shared/utils/cookie';
import { useState, useEffect } from 'react';
import { formatDate } from '@/shared/utils/date';
import Link from 'next/link';

type imageData = {
  expireIndex: string;
  imageUrl: string;
  ownerId: string;
  result: [];
  status: string;
  _id: string;
  createdAt?: string;
};

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
      <Typography variant="h4" gutterBottom>
        History
      </Typography>
      <Grid2 container gap={3} justifyContent="center">
        {images.map((image) => (
          <Grid2 key={image._id} size={2}>
            <Link href={'results/' + image._id}>
              <ActionCard
                name={
                  'Create date: ' +
                  formatDate(
                    image.createdAt ? image.createdAt : image.expireIndex,
                  )
                }
                imageUrl={image.imageUrl}
              ></ActionCard>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
