
export const hexToHsl = (hex: string): any => {
    let h = 0, s = 0, l = 0;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const maxRGB = Math.max(r, g, b);
    const minRGB = Math.min(r, g, b);

    l = (maxRGB + minRGB) / 2 / 255;

    if (maxRGB === minRGB) {
        s = 0;
    } else {
        const diff: number = maxRGB - minRGB;
        s = l > 0.5 ? diff / (2 - maxRGB - minRGB) : diff / (maxRGB + minRGB);
        s = Math.abs(s);
        // Calculate hue
        switch (maxRGB) {
            case r:
                h = ((g - b) / diff + (g < b ? 6 : 0)) * 60;
                break;
            case g:
                h = ((b - r) / diff + 2) * 60;
                break;
            case b:
                h = ((r - g) / diff + 4) * 60;
                break;
        }
    }

    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
};

export const hslToHex = (hsl: { h: number, s: number, l: number }): string => {
    const { h, s, l } = hsl;

    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

export const RGBToHex = (rgb: number[]): string => {
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    const hexValues = rgb.map(value => toHex(value));
    return `#${hexValues[0]}${hexValues[1]}${hexValues[2]}`;
};



