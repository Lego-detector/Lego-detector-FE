'use client'

import { ResultsViewer } from "@/modules/detector/resultsViewer";
import { Stack } from "@mui/material";
import { useParams } from "next/navigation";


export default function Results() {
    const params = useParams<{ id: string }>()

    return (
      <Stack justifyContent="center"  gap={2} paddingBlockStart={5}>
          <ResultsViewer sessionId={params.id}/>
      </Stack>
    );
}