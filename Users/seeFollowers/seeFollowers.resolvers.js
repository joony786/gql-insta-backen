import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, perPage, pageNumber }) => {
    //   if (!pageNumber) {
    //     pageNumber = parseInt(1);
    //   }
      const checkPageNumber = pageNumber ? pageNumber : 1
      try {
        const foundUser = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!foundUser) {
          return {
            ok: false,
            error: 'No user Found',
          };
        }
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            take: perPage,
            skip: parseInt(checkPageNumber - 1) * perPage,
          });
        if (followers.length <= 0) {
          return {
            error: 'No followers Found',
            ok: false,
            followers: [],
            totalPages: 0,
          };
        }
        const totalFollowers = await client.user.count({
          where: { following: { some: { username } } },
        });
        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / perPage),
        };
      } catch (error) {
        return error;
      }
    },
  },
};
