import { useEffect, useState } from 'react';
import { FaBars, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorTile } from './ColorTile';
import { GenerateColors } from '../helpers/GenerateColors';
import { SaveTile } from './SaveTile';
import { GenerateHex } from '../helpers/GenerateColors';
/**
 * ! styling error: Could not create a smooth transition upon the saveTile appearing.
 */

type ColorTileData = {
  hexColor: string;
  isLock: boolean;
  id: number;
}

interface PaletteGeneratorProps {
  signedIn: boolean;
}

type ColorTitleObjects = ColorTileData[];

const initialColors: string[] = GenerateColors();

const initialPalettes: ColorTitleObjects = initialColors.map((color, i) => ({
  hexColor: color,
  isLock: false,
  id: i
}));


export function PaletteGenerator({signedIn}: PaletteGeneratorProps) {
  const [openSaves, setOpenSaves] = useState(false);
  const [palettes, setPalettes] = useState<ColorTitleObjects>(initialPalettes);
  const [colorsaves, setColorSaves] = useState<string[]>([]);
  const [paletteSaves, setPaletteSaves] = useState<string[][]>([]);


  console.log(signedIn)
  
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast("✅ color copied to clipboard!");
  }

  const handleSaveColor = (value: string) => {
    if (colorsaves.length === 5) {
      toast("❌ color save limit reached! convert to saved palette or undo");
    } else {
      setColorSaves(prevSaves => [...prevSaves, value]);
      toast("✅ color saved!");
    }
  }

  //Adds entire palette displayed on screen
  const handlePaletteSave = () => {
    if (paletteSaves.length === 8) {
      toast("❌ Palette save limit reached!");
    } else {
      const newPalette = palettes.map((pal) => pal.hexColor);
      setPaletteSaves(prevSaves => [...prevSaves, newPalette]);
      toast("✅ Palette added to saves!");
    }
  }

  //Adds custom palette from the five colors stacked in colorSaves
  const handleAddToPalette = () => {
    console.log("Add to palettes has fired!");
    const allColors = [...colorsaves];
    setPaletteSaves(prevSaves => [...prevSaves, allColors]);
    setColorSaves([]);
    toast("✅ Custom palettes added!");
  }

  const handleRemovePalette = () => {
    setPaletteSaves(paletteSaves.slice(0, -1));
    toast("✅ Palette removed!");
  }

  const handleClearAllPalettes = () => {
    setPaletteSaves([]);
    toast("✅ All palettes removed!");
  }
  const handleRemoveSaveColor = () => {
    setColorSaves(colorsaves.slice(0, -1));
    toast("Saved color removed");
  }

  const handleLock = (id: number) => {
    const updatedPalette: ColorTitleObjects = palettes.map((pal) => {
      return pal.id === id ? { ...pal, isLock: !pal.isLock } : pal
    });
    setPalettes(updatedPalette);
  }

  const generatePalette = () => {
    const updatedPalette: ColorTitleObjects = palettes.map((pal) => {
      return pal.isLock === true ? { ...pal } : { ...pal, hexColor: GenerateHex() }
    });
    setPalettes(updatedPalette)
  }

  useEffect(() => {
    const newColors = (e: any) => {
      if (e.key === " ") {
        generatePalette();
      }
    }

    document.addEventListener("keydown", newColors);
    return () => document.removeEventListener("keydown", newColors);
  });

  return (
    <div className='h-full xxl:h-[80%]'>
      <div className='flex items-center justify-between h-[5vh] border-b border-grey-200' id='palette-funcs'>
        <p className='opacity-70 lg:ms-12 sm:ms-2 md:ms-8 xl:ms-[3.5%] sm:text-xxsm  lg:text-xsm'>Press the spacebar to generate new palette</p>
        <div className='w-[10%] sm:w-[30%] xl:w-[10%] lg:w-[15%] h-full flex justify-evenly'>
          <div className=' flex items-center justify-center h-full w-[50%] cursor-pointer'
            title='save palette'>
            <FaHeart size={30} color='#0864FC' className='icon' onClick={handlePaletteSave} />
          </div>
          <div className='flex justify-center items-center border-s border-grey-200 w-[50%] cursor-pointer'
            title='View your palettes'>
            <FaBars size={30} onClick={() => setOpenSaves(!openSaves)} />
          </div>
        </div>
      </div>
      <div className={`palette-container ${openSaves ? 'palette-container-expanded' : ''}`}>
        {palettes.map((pal) => {
          return (
            <ColorTile
              hexColor={pal.hexColor}
              id={pal.id}
              save={() => handleSaveColor(pal.hexColor)}
              copy={handleCopy}
              lock={pal.isLock}
              isLock={() => handleLock(pal.id)}
            />
          )
        })}
        {openSaves && <SaveTile
          savedColors={colorsaves}
          savedPalettes={paletteSaves}
          removeColor={handleRemoveSaveColor}
          removePalette={handleRemovePalette}
          addToPalette={handleAddToPalette}
          clearAllPalettes={handleClearAllPalettes}
          signedIn={signedIn}
        />
        }
      </div>
      <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar={true} />
    </div>
  );
}
