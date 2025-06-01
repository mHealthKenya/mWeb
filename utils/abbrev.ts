export const abbrev = (str: string): string => {
    if (!str) return '';
    const words = str.split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }
    return words.map(word => word.charAt(0).toUpperCase()).join('');
}