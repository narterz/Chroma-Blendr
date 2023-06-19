import { useState, useEffect } from 'react';
import initalImage from '../images/default-photo-seeker.jpg';
import { GetImageData } from '../helpers/GetImageData';
import { ExtractFreqColors } from '../helpers/ExtractFreqColors';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineCloudUpload } from 'react-icons/ai'


export function PhotoColorSeeker() {
  const [photo, setPhoto] = useState<any>(initalImage);
  const [photoPalette, setPhotoPalette] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (photo) {
      setLoading(true);

      GetImageData(photo)
        .then((imgData) => {
          const imagePalette = ExtractFreqColors(imgData.data);
          setPhotoPalette(imagePalette);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [photo]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if(targetFile){
      setPhoto(URL.createObjectURL(targetFile))
    }
  }

  const handleColorCopy = (hexColor: string) => {
    navigator.clipboard.writeText(hexColor);
    toast('✅ color copied');
  }

  return (
    <div className=' h-full w-full flex flex-col items-center'>
      <div className='prose w-full text-center sm:mt-12 md:mt-10 h-[20%]'>
        <h1 className='text-primary'>Photo Seeker</h1>
        <p className='text-subtitle'>Input any photo and extract its color schemes!</p>
      </div>
      <div className='flex md:flex-row sm:flex-col md:justify-evenly items-center lg:w-[70%] xl:w-[50%] md:w-[80%] sm:w-[90%] md:h-[50%] sm:h-[60%] md:mt-5 border rounded-xl me-auto ms-auto bg-slightWhite'>
        <div className='sm:w-[90%] md:w-[60%] sm:h-[60%] md:h-[80%] flex justify-center items-center'>
          {loading
            ? <ClipLoader color='#0864FC' loading={loading} size={60} />
            : photo && <img src={photo} alt="user inputed image" className='w-[96%] max-w-full max-h-full' />
          }
        </div>
        <div className='lg:h-[70%] sm:h-[40%] md:h-[40%] lg:w-[40%] md:w-[80%] flex flex-col justify-between items-center'>
          <div className='flex items-center justify-evenly sm:h-[30%] md:h-[20%] w-[90%]' id='photoSeeker-palette'>
            {photo && photoPalette.map((color, i) => {
              return (
                <div
                  className='w-[20%] h-[60%] hover:scale-75 transition-all delay-100 ease-in-out cursor-pointer'
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorCopy(color)}
                  key={color + i}
                  id={`color${i}`}>
                </div>
              )
            })}
          </div>
          <div className='flex flex-col justify-evenly h-[20%] w-[90%]'>
            <label htmlFor='photoURL' className='sm:hidden md:block'>Image URL</label>
            <input
              className='border-b border-grey-200 bg-slightWhite outline-none'
              type="text"
              placeholder='Enter in photo url'
              name='photoURL'
              onChange={e => setPhoto(e.target.value)}
            />
          </div>
          <div className='h-[20%] w-[90%] flex items-end relative'>
            <input
              type="file"
              title=' '
              name="fileUpload"
              onChange={handleFileUpload}
              className='custom-file-input'
            />
          </div>
        </div>
      </div>
      <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar={true}/>
    </div>
  );
}

