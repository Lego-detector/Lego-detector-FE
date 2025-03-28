'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { BoundingBox } from "../types";

import { Stage, Layer, Rect, Image as KonvaImage} from "react-konva";
import useImage from 'use-image';
import AspectRatio from "@mui/joy/AspectRatio";
import { Image } from "konva/lib/shapes/Image";

type Props = {
  imageUrl: string;
  results: BoundingBox[];
  all: boolean,
  checked: Set<number>
};

export function BoundingBoxCanvas({ imageUrl, results, all, checked }: Props) {
  const [ image ] = useImage(imageUrl, 'anonymous');
  const [imageSize, setImageSize] = useState({ width: 500, height: 400 });
  const [hoveredId, setHoveredId] = useState<number>(-1);
  const imageRef = useRef<Image>(null);
  const stageRef = useRef(null);

  // Resize observer to adjust the stage size dynamically
  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        const width = imageRef.current.width();
        const height = imageRef.current.height(); // Maintain 5:4 aspect ratio
        setImageSize({ width, height });
      }
    };

    updateSize(); // Initial update
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const renderBoundingBox = useCallback((bbox: BoundingBox, index: number) => {
    const [ rX, rY, rW, rH ] = bbox.xywh;
    const [ X, Y, W, H ] = [ 
      (rX - rW/2)*imageSize.width, 
      (rY - rH/2)*imageSize.height, 
      rW*imageSize.width, 
      rH*imageSize.height 
    ]
    const isDraw = all || checked.has(bbox.classId) && (hoveredId == -1 || hoveredId == bbox.classId) 
    
    return (isDraw && <Rect
        key={`bbox-${index}-classId-${bbox.classId}`}
        x={X}
        y={Y}
        width={W}
        height={H}
        fill="transparent" // No fill, transparent inside
        stroke="red" // Border color
        strokeWidth={2}
        onMouseOver={() => setHoveredId(bbox.classId)}
        onMouseLeave={() => setHoveredId(-1)}
      />);
  }, [all, checked, hoveredId, imageSize.height, imageSize.width])

  // useEffect(() => {
  //   if (image && imageRef.current) {
  //     imageRef.current.cache();
  //   }
  // }, [image]);

  return (
    <AspectRatio
      variant="soft"
      objectFit="contain"
      ratio="16/9"
      sx={{ width: 1 }}
    >
      <section>
        <Stage ref={stageRef} width={imageSize.width} height={imageSize.height}>
            <Layer>
              {/* Image */} 
              <KonvaImage
                  ref={imageRef}
                  alt='Pred image'
                  width={imageSize.width}
                  height={imageSize.height}
                  image={image}
                />
            </Layer>
            <Layer>
              {results.map((bbox, index) => (
                renderBoundingBox(bbox, index)
              ))}
            </Layer>
          </Stage>
      </section>
    </AspectRatio>
  );
}
