const BE_URL = process.env.REACT_APP_BE_URL || 'http://localhost:8080';

export const getMetadata = () => fetch(`${BE_URL}/metadata`).then(r => r.json());
