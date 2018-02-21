const BE_URL = process.env.BE_URL || 'http://localhost:8080';
console.log(BE_URL);
export const getMetadata = () => fetch(`${BE_URL}/metadata`).then(r => r.json());
