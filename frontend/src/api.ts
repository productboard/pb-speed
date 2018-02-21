const BE_URL = process.env.REACT_APP_BE_URL || 'http://localhost:8080';

export const getMetadata = () =>
  fetch(`${BE_URL}/metadata`)
    .then(r => r.json())
    .then(metadata => ({
      ...metadata,
      spaces: metadata.spaces.map(({ id }: any) => ({ id, name: `space[${id}]` })),
    }));

export const trackAction = (data: { action: string; duration: number }) => {
  fetch(`${BE_URL}/track`, {
    body: JSON.stringify({
      ...data,
      userId: 1,
      spaceId: 1,
    }),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });
};
