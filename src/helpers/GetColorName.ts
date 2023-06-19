import axios from 'axios';

interface ColorInfo {
    colorName: string;
    rgbValue: object;
    contrast: string;
    hslValue: object
}

export const FetchColorInfo = async (hexColor: string): Promise<ColorInfo> => {
    const colorSliced = hexColor.slice(1);
    let colorName;
    let rgbValue = {r: Number, g: Number, b: Number};
    let contrast;
    let hslValue = {h: Number, s: Number, l: Number};

    try {
        const response = await axios.get(`https://www.thecolorapi.com/id?hex=${colorSliced}`);
        colorName = response.data.name.value;
        rgbValue = { 
            r: response.data.rgb.r,
            g: response.data.rgb.g,
            b: response.data.rgb.b,
        }
        contrast = response.data.contrast.value;
        hslValue = {
            h: response.data.hsl.h,
            s: response.data.hsl.s,
            l: response.data.hsl.l,
        };
    } catch (error) {
        console.log("There was a error!");
    }

    return { colorName, rgbValue, contrast, hslValue }
}