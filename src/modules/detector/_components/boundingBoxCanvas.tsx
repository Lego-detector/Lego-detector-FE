'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BoundingBox, ClassNames } from '../types';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { Box } from '@mui/material'; // Use Box for aspect ratio handling

type Props = {
  imageUrl: string;
  results: BoundingBox[];
  all: boolean;
  checked: Set<number>;
  classList: ClassNames[];
};

// Max height 480 px
const maxBboxHeight = 480

export function BoundingBoxCanvas({
  imageUrl,
  results,
  all,
  checked,
  classList,
}: Props) {
  const [image] = useImage(imageUrl, 'anonymous');
  const [imageSize, setImageSize] = useState({ width: 500, height: 400 });
  const [hoveredId, setHoveredId] = useState<number>(-1);

  // Resize observer to adjust the stage size dynamically
  useEffect(() => {
    if (image) {
      const width = image.width;
      const height = image.height;
      const scale = maxBboxHeight / Math.max(width, height);

      setImageSize(() => {
        return {
          width: width * scale,
          height: height * scale,
        };
      });

      console.log(width, height, scale, imageSize);
    }
  }, [image]);

  const renderBoundingBox = useCallback(
    (bbox: BoundingBox, index: number) => {
      const [rX, rY, rW, rH] = bbox.xywh;
      const [X, Y, W, H] = [
        (rX - rW / 2) * imageSize.width,
        (rY - rH / 2) * imageSize.height,
        rW * imageSize.width,
        rH * imageSize.height,
      ];
      const isDraw =
        all ||
        (checked.has(bbox.classId) &&
          (hoveredId == -1 || hoveredId == bbox.classId));

      return (
        isDraw && (
          <Rect
            key={`bbox-${index}-classId-${bbox.classId}`}
            x={X}
            y={Y}
            width={W}
            height={H}
            fill="transparent" // No fill, transparent inside
            stroke={classList[bbox.classId].color} // Border color
            strokeWidth={2}
            onMouseOver={() => setHoveredId(bbox.classId)}
            onMouseLeave={() => setHoveredId(-1)}
          />
        )
      );
    },
    [all, checked, hoveredId, imageSize],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        width: '100%', // Full width of the container
        // height: 0, // Set height to 0 so padding-bottom defines height
        // paddingBottom: '56.25%', // 16:9 aspect ratio (9/16 = 0.5625)
        overflow: 'hidden', // Ensure nothing spills over
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <section style={{ width: '100%', height: '100%'}}> */}
      <Stage width={imageSize.width} height={imageSize.height}>
        <Layer>
          {/* Image */}
          <KonvaImage
            alt="Pred image"
            width={imageSize.width}
            height={imageSize.height}
            image={image}
          />
        </Layer>
        <Layer>
          {results.map((bbox, index) => renderBoundingBox(bbox, index))}
        </Layer>
      </Stage>
      {/* </section> */}
    </Box>
  );
}
