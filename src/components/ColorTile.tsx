import { FC, useEffect, useState } from "react";
import { BsLockFill, BsUnlockFill, BsFillHeartFill } from 'react-icons/bs';
import { AiFillCopy } from 'react-icons/ai';
import { FetchColorInfo } from "../helpers/GetColorName";

/**
 * ! Weird glitch: Cannot add any justify styling to colorName container. The color name and hexColor will disapper. Added margin div to add needed spacing.
 * ? Used colorInfo.contrast from FetchColorInfo to determine whether the icons and text should be black or white based on the color of the tile.
 */

interface ColorTileProps {
    copy: (color: string) => void;
    save: (color: string) => void;
    lock: boolean;
    isLock: (tileId: number) => void;
    hexColor: string;
    id: number;
}

interface ColorInfo {
    colorName: string;
    colorContrast: string
}

export const ColorTile: FC<ColorTileProps> = ({ save, copy, lock, hexColor, isLock, id }) => {
    const [colorInfo, setColorInfo] = useState<ColorInfo>({
        colorName: "",
        colorContrast: ""
    })

    const tileBackgroundColor = { backgroundColor: hexColor }
    const contrastColor = { color: colorInfo.colorContrast }

    useEffect(() => {
        const FetchAllColorInfo = async () => {
            const info = await FetchColorInfo(hexColor);
            setColorInfo({
                colorName: info.colorName,
                colorContrast: info.contrast
            });
        };
        FetchAllColorInfo();
    }, [hexColor])

    return (
        <div style={tileBackgroundColor} className='colorTile h-full w-full flex flex-col items-center' id={'colorTile' + id}>
            <div className="h-[70%] w-full flex md:flex-col sm:flex-row items-center justify-evenly opacity-0 hover:opacity-100 transition-opacity ease-in-out delay-150">
                <div onClick={() => save(hexColor)} className="colorTile-icons">
                    <BsFillHeartFill size={30} style={contrastColor} className="icon" />
                </div>
                <div onClick={() => copy(hexColor)} className="colorTile-icons">
                    <AiFillCopy size={30} style={contrastColor} className="icon" />
                </div>
                <div onClick={() => isLock(id)} className="colorTile-icons">
                    {lock ? (
                        <BsLockFill size={30} style={contrastColor} className="icon" />
                    ) : (
                        <BsUnlockFill size={30} style={contrastColor} className="icon" />
                    )}
                </div>
            </div>
            <div className="md:h-[30%] sm:h-full sm:ms-10 w-full flex flex-col md:items-center sm:items-start ">
                <h4 className="uppercase font-medium tracking-wide md:text-md sm:text-xxsm" style={contrastColor}>{hexColor}</h4>
                <div className="mt-2 mb-2" />
                <p className="md:text-xsm" style={contrastColor}>{colorInfo.colorName}</p>
            </div>
        </div>
    )
}