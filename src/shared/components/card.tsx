import { Box } from "@mui/material";

type Props = {
    children: React.ReactNode; 
    height?: string | number;
    width?: string | number;
}

export default function Card({ children, height, width }: Props) {
    return (
        <Box
        justifyContent="center"
        alignItems="center"
            sx={{
                border: "1px solid rgba(255, 255, 255, 0.09)", // Softer border
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.1)", // More transparent
                backdropFilter: "blur(15px) saturate(150%)", // Stronger blur and color pop
                WebkitBackdropFilter: "blur(20px) saturate(150%)", // For Safari support
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)", // Deeper shadow for depth
                padding: 3, // More padding for a spacious feel
                color: "#fff", // White text for contrast
                height: height || "auto",
                width: width || "auto"
            }}
        >
            {children}
        </Box>
    );
}