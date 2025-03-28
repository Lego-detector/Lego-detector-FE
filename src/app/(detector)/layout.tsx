import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

type Props = {
    children: React.ReactNode; 
}

export default function DetectorLayout({ children }: Props) {
    return (
      <Stack justifyContent="center"  gap={2} paddingBlockStart={5}>

        <Typography variant="h4" component={"h5"}>
          Find any pieces of LEGO<br/>
          <Typography>
            Bring AI to find your LEGO pieces from your image and classified type of them.
          </Typography>
        </Typography >

        {children}

      </Stack>
    );
}