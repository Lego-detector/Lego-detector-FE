import { useEffect, useRef } from "react";

interface DetectionResult {
  className: number;
  conf: number;
  xywh: [number, number, number, number];
}

interface Props {
  imageUrl: string;
  results: DetectionResult[];
}

export const BoundingBoxCanvas: React.FC<Props> = ({ imageUrl, results }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, image.width, image.height);

      // Draw bounding boxes
      results.forEach(({ xywh }) => {
        const [x, y, w, h] = xywh;
        ctx.strokeStyle = "red"; // Box color
        ctx.lineWidth = 3;
        ctx.strokeRect(x - w/2, y - h/2, w, h);
      });
    };
  }, [imageUrl, results]);
console.log(imageUrl, results)
  return <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />;
};
