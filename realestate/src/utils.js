// src/utils.js
export const capitalizeWords = (text) => {
    if (typeof text !== 'string') {
        return text; // Or handle this case appropriately
    }
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
