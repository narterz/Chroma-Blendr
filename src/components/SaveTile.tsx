import { FC } from "react";
import { FaUndo } from 'react-icons/fa';
import { BsCheck } from "react-icons/bs";
import { MdClear } from 'react-icons/md'
import { toast } from "react-toastify";

interface SaveTileUtils {
    savedColors: Array<string>;
    savedPalettes: Array<string[]>;
    removeColor: () => void;
    removePalette: () => void;
    addToPalette: () => void;
    clearAllPalettes: () => void;
    signedIn: boolean;
}

export const SaveTile: FC<SaveTileUtils> = ({
    savedColors,
    savedPalettes,
    removeColor,
    removePalette,
    addToPalette,
    clearAllPalettes,
    signedIn }) => {

    const handleCopySave = (color: string) => {
        navigator.clipboard.writeText(color);
        toast("Color copied");
    }



    return (
        <div className="flex flex-col h-full">
            {!signedIn
                ?   <div>
                        <h3 className="text-center mt-5">You must sign in to save palettes and colors</h3>
                    </div>
                :   <>
                        <div className="w-full h-[50%] mt-1">
                            <p className="border-b border-grey-200 w-full text-center relative">
                                <FaUndo
                                    className="absolute right-2 top-1 cursor-pointer"
                                    size={20}
                                    onClick={removePalette}
                                    style={{ color: '#0864FC' }}
                                />
                                Saved Palettes
                                <MdClear
                                    className="absolute left-2 top-1 cursor-pointer"
                                    size={20}
                                    style={{ color: '#0864FC' }}
                                    onClick={clearAllPalettes}
                                />
                            </p>
                            <div className="w-full h-[80%] flex flex-col">
                                {savedPalettes.map((palette) => {
                                    return (
                                        <div className="h-[10%] flex flex-row">
                                            {palette.map((color) => {
                                                return (
                                                    <div
                                                        style={{ backgroundColor: color }}
                                                        className="w-[20%] h-full">
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })};
                            </div>
                        </div>
                        <div className="h-[50%]">
                            <p className="border-b border-t border-grey-200 text-center relative">
                                Saved colors
                                <FaUndo
                                    className="absolute right-2 top-1 cursor-pointer"
                                    size={20}
                                    onClick={removeColor}
                                    style={{ color: '#0864FC' }}
                                />
                                <BsCheck
                                    className={`absolute left-2 top-1 cursor-pointer ${savedColors.length === 5 ? "opacity-100" : "opacity-0"}`}
                                    size={20}
                                    onClick={addToPalette}
                                    style={{ color: '#0864FC' }}
                                />
                            </p>
                            <div className="h-[80%] flex flex-col">
                                {savedColors.map((color) => {
                                    return (
                                        <div className="w-full h-[20%] cursor-pointer" style={{ backgroundColor: color }} onClick={() => handleCopySave(color)} title="copy color">
                                            <div className="w-full h-full flex flex-row items-center justify-evenly opacity-0 hover:opacity-100 transition-opacity delay-200 ease-in-out">
                                                {color}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}