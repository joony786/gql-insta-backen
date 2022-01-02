import client from '../client';

export default {
  User: {
    totalFollowings: async ({ id }) => {
      return client.user.count({ where: { following: { some: { id } } } });
    },
    totalFollowers: async ({ id }) => {
      return client.user.count({ where: { followers: { some: { id } } } });
    },
    isMe: ({ id }, args, { currentUser }) => {
      return id === currentUser?.id;
    },
    isFollowing: ({ id }, args, { currentUser }) => {
      if (!currentUser) {
        return false;
      }
      const exists = client.user.count({
        where: { username: currentUser.id, following: { some: { id } } },
      });
      return Boolean(exists);
    },
    photos: async ({ id }, { perPage, lastId }) => {
      try {
        const userPhots = await client.user
          .findUnique({ where: { id } })
          .photos({
            take: perPage,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });
          console.log(userPhots);
        if (!userPhots) {
          return {
            ok: false,
            error: 'no photos found',
          };
        } else {
          return {
            ok: true,
            photos: userPhots,
          };
        }
      } catch (error) {
        return error;
      }
    },
  },
};
