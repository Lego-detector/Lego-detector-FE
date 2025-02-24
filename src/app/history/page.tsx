import { ActionCard } from '@/modules/home/_components/ActionCard';
import { Grid2, Typography } from '@mui/material';
import { exampleHistory as temp } from '@/modules/home/_constants/history';


export default function History() {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        History
      </Typography>
      <Grid2 container alignItems="center" spacing={2}>
        {temp.map((obj, index) => (
          <Grid2 key={index.toString()}>
            <ActionCard name={obj.name} imageUrl={obj.imageUrl}></ActionCard>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
