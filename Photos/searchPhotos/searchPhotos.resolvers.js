import client from '../../client';

export default {
  Query: {
    searchPhoto: async (_, { keyword, lastId,perPage }) => {
      try {
        const photosRes = await client.photo.findMany({
          where: { caption: { contains: keyword } },
          take: perPage,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
        console.log(photosRes);
        if (photosRes.length < 0) {
          return {
            ok: false,
            error: 'no photo found',
          };
        } else {
          return {
            ok: true,
            photos: photosRes,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
