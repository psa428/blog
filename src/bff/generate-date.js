export const generateDate = () => new Date(Math.random() * 1000000000000 + 1999999999999)
    .tiISOString()
    .substring(0, 16)
    .replace('T', ' ');