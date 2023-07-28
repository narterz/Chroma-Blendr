import { useState, useEffect } from 'react';
import heroLaptop from '../images/hero-image-laptop.png';
import heroDesktop from '../images/hero-desktop.png';
import { BsArrowDownRight, BsArrowDownLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

/**
 * 
 * ! cannot change cursor or add animations to hero-text divs. Seems to be a glitch with tailwind
 * 
 */

export function HomePage() {
  const [loading, setLoading] = useState(false);
  const [navigatePage, setNavigatePage] = useState('');

  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    setLoading(true);
    setNavigatePage(page);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate(navigatePage);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigatePage, navigate])

  return (
    <div className={loading ? 'loading' : 'not-loading'}>
      {loading ? (
        <ClipLoader color='#0864FC' loading={loading} size={75} />
      ) : (
        <>
          <div className='prose flex flex-col h-[80%] justify-evenly xl:justify-around xl:w-[30%] xl:h-[80%] lg:h-[80%] lg:w-[40%] md:w-[55%] md:h-[90%] sm:w-full sm:h-[60%]'>
            <div className='text-center font-exo'>
              <h1 className='font-bold text-lg xl:leading-[4.5rem] xl:text-xxl'>Discover and create <b className='text-primary'>color palettes</b> for your project</h1>
              <p className='text-subtitle lg:text-xsm sm:text-xsm'>Create the perfect color palette with our color palette generator or photo color seeker</p>
            </div>
            <div className='flex flex-col items-center justify-evenly h-[25%] xl:h-[30%] lg:h-[25%]'>
              <button className='bg-primary text-white h-[4rem] font-semibold xl:h-[4rem] lg:h-[35%] lg:w-[60%] md:w-[70%] md:h-[30%] sm:w-[50%] sm:h-[40%]'
                      onClick={() => handleNavigate('/palGenerator')}>Palette Generator
              </button>
              <button className='bg-secondary h-[4rem] font-semibold xl:h-[4rem] lg:h-[35%] lg:w-[60%] md:w-[70%] md:h-[30%] sm:w-[50%] sm:h-[40%]'
                      onClick={() => handleNavigate('/photoColors')}>Photo Color Seeker
              </button>
            </div>
          </div>
          <div className='h-full relative xl:w-[50%] lg:w-[45%] md:w-[55%] sm:w-full' id='hero-sm-bottom'>
            <div className='hero-text xl:top-[46%] xl:left-[3%] xl:text-sm lg:top-[49%] lg:-left-[5%] lg:text-xxsm md:top-[59%] md:-left-[8%] md:text-xxsm sm:top-[20%] sm:left-[8%] sm:text-xxsm'>
              <p className='font-indie uppercase'>create your palette</p>
              <BsArrowDownRight size={20} />
            </div>
            <div className='hero-text text-xxsm xl:top-[25%] xl:right-[49%] xl:text-sm lg:top-[30%] lg:right-[38%]  md:top-[47%] md:right-[45%] sm:top-0 sm:right-[10%]'>
              <p className='font-indie uppercase'>view your palettes</p>
              <BsArrowDownLeft size={20} />
            </div>
            <img
              className='hero-img z-10 left-1/4  xl:bottom-[21%] xl:h-[35%]  lg:bottom-[27%] lg:h-[25%]  md:bottom-[22%] md:h-[10rem] md:left-[20%] sm:bottom-[30%] sm:left-[30%] sm:h-[50%]'
              src={heroLaptop}
              alt="laptop with a color palette"
            />
            <img
              className='hero-img  xl:left-[58%] xl:bottom-[18%] xl:h-[60%]  lg:left-[68%] lg:bottom-[27%] lg:h-[45%]  md:left-[60%] md:bottom-[21%] md:h-[32%] sm:left-[64%] sm:bottom-[30%] sm:h-[70%]'
              src={heroDesktop}
              alt="desktop with color palette"
            />
          </div>
        </>
      )}
    </div>
  );
}

