import { Grid2, Typography } from "@mui/material";

type paramProp = {
    id: string
}

export default async function Result({ params }: { params: paramProp }) {
    const { id } = await params;
    
    return (
      <Grid2 container justifyContent="center" alignItems="center">
        <Grid2>
            <Typography gutterBottom variant="h4" component="div">
            Result
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
            ID: {id}
            </Typography>
        </Grid2>
      </Grid2>
    );
}