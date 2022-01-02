import client from '../client';

export default {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }) => {
      return client.hashTag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
  HashTag: {
    totalPhots: ({ id }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
    photos: ({ id }, { lastId, perPage }) => {
      try {
        const returnPhotos = client.hashTag
          .findUnique({ where: { id } })
          .photos({
            take: perPage,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: perPage } }),
          });
        return {
          ok: true,
          photos: returnPhotos,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
