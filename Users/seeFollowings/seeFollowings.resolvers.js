import client from '../../client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId, perPage }) => {
      const checkUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!checkUser) {
        return {
          ok: false,
          error: 'No user found',
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: perPage,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: perPage } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
