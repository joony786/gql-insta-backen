import client from '../../client';

export default {
  Query: {
    searchUser: async (_, { keyword, perPage, lastId }) => {
      if (keyword.length <= 2) {
        return {
          ok: false,
          error: 'keyWord must be greater then 2',
        };
      }
      const users = client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: perPage,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return {
        ok: true,
        users,
      };
    },
  },
};
