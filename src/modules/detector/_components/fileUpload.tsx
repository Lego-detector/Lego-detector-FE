import { Button } from '@mui/material';
import { EVENT, STORAGE_KEY } from '../_config/config';
import { CloudUpload } from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils';
import { fromBlob, blobToURL } from 'image-resize-compress';

type Props = {
  innerText?: string
  varaint?: 'text' | 'outlined' | 'contained'
}

export function FileUpload({ innerText, varaint = 'text' }: Props) {
  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
    const file = event.target.files?.[0];
    
    if (file) {
      console.log(file.name);
      const resizedImage = await fromBlob(file, 0.8);
      const base64Image = await blobToURL(resizedImage) as string;

      localStorage.setItem(STORAGE_KEY.IMAGE, base64Image);

      window.dispatchEvent(new Event(EVENT.STORAGE_CHANGE));
    }
  };


  return (
    <div className="md-card flex flex-col">
      <Button
        component="label"
        role={undefined}
        variant={varaint}
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        {innerText}

        <input
          type="file"
          accept="image/*"
          style={visuallyHidden}
          onChange={handleImageChange}
          className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-300 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-800"
        />
      </Button>
    </div>
  );
};
