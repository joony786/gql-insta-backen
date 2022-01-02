import client from '../../client';

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      try {
        const userRes = await client.user.findUnique({
          where: {
            username,
          },
          include: {
            followers: true,
            following: true,
            photos:true
          },
        });
        if (!userRes) {
          return {
            ok: false,
            error: `No user found with ${username} username`,
          };
        } else {
          return {
            ok: true,
            user: userRes,
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
