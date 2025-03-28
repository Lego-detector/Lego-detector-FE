import { Grid2, Typography } from "@mui/material";
import Card from "@/shared/components/card";
import Image from "next/image";
import { FileUpload } from "../_components/fileUpload";
import { Stack } from "@mui/system";

export function StepOne() {
    return (
        <Grid2
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{
                width: 1,
                maxHeight: "80%",
            }}
            // gap={2}
        >
            {/* Image Container */}
            <Grid2 size={6} height={300}>
                <div style={{ position: "relative", width: "100%", height: "300px"}}>
                    <Image
                        alt="example"
                        src="/asset/example.jpg"
                        fill
                        style={{ objectFit: "cover", borderRadius: '12px' }} // Ensures the image fills the box
                    />
                </div>
            </Grid2>

            {/* Card Container */}
            <Grid2 size={5.5} height={300}>
                <Card height="100%" >
                    <Stack justifyContent="center" alignItems="center" height={1} gap={2}>
                        <Typography variant="h6">
                            Choose your image to detect
                        </Typography>
                        <FileUpload 
                        innerText="Upload"
                        varaint="contained"
                        />
                    </Stack>
                </Card>
            </Grid2>
        </Grid2>
    );
}