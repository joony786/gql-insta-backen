import client from '../../client';

export default {
  Query: {
    seePhotos: async (_, { id }) => {
      try {
        const res = await client.photo.findUnique({ where: { id } });
        console.log(res);
        if (!res) {
          return {
            ok: false,
            error: 'no photo found',
          };
        } else {
          return {
            ok: true,
            photo: res,
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
