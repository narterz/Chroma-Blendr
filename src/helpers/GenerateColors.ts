import { hslToHex, hexToHsl } from "./ColorConversions";

export const GenerateHex = (): string => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export const GenerateColors = (): string[] => {
    const generateTriadics = (hsl: { h: number, s: number, l: number }): string[] => {
        const { h, s, l } = hsl;

        const angle1: number = (h + 120) % 360;
        const angle2: number = (h + 240) % 360;

        const triadicColor1: string = hslToHex({h: angle1, s: s, l: l});
        const triadicColor2: string = hslToHex({h: angle2, s: s, l: l});

        return [triadicColor1, triadicColor2]
    }

    const generateAnalogousColors = (hsl: { h: number, s: number, l: number }): string[] => {
        const { h, s, l } = hsl;
        
        const offset = 30;
        const hue1 = (h + offset) % 360;
        const hue2 = (h - offset + 360) % 360;

        const anagolousColor1 = hslToHex({ h: hue1, s: s, l: l });
        const anagolousColor2 = hslToHex({ h: hue2, s: s, l: l });

        return [anagolousColor1, anagolousColor2];
    }

    const primaryColor: string = GenerateHex();
    const primaryColorHSL = hexToHsl(primaryColor);

    const triadicColors: string[] = generateTriadics({
        h: primaryColorHSL.h,
        s: primaryColorHSL.l,
        l: primaryColorHSL.l
    });
    const analogousColors: string[] = generateAnalogousColors({
        h: primaryColorHSL.h,
        s: primaryColorHSL.l,
        l: primaryColorHSL.l
    });

    return [primaryColor, ...analogousColors, ...triadicColors];
}