import client from '../../client';

export default {
  Query: {
    searchUser: async (_, { keyword, perPage, lastId }) => {
      try {
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
        if (users.length > 0) {
          return {
            ok: true,
            users,
          };
        } else {
          return {
            ok: true,
            user: [],
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
