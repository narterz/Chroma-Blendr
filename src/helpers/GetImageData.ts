/**
 * ? GetImageData is all data for an image. the pixel data in the unitClamped array will be utilized for obtaining the image's color palette.
 */

interface ImageData {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export const GetImageData = (imageSrc: string): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get 2D rendering context.'));
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve({
        width: imageData.width,
        height: imageData.height,
        data: imageData.data,
      });
    };

    image.onerror = () => {
      reject(new Error('Failed to load the image.'));
    };

    image.src = imageSrc;
  });
}