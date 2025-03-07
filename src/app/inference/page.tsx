import InferenceStepper from "@/modules/inference/inferenceStepper";
import { Stack, Typography } from "@mui/material";


export default function Inference() {
    return (
      <Stack justifyContent="center"  gap={2} paddingBlockStart={5}>

        <Typography variant="h4" component={"h5"}>
          Find any pieces of LEGO<br/>
          <Typography>
            Bring AI to find your LEGO pieces from your image and classified type of them.
          </Typography>
        </Typography >

        <InferenceStepper />

      </Stack>
    );
}