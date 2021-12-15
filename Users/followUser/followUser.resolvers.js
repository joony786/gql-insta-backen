import client from '../../client';
import { authResolver } from '../users.utils';

export default {
  Mutation: {
    followUser: authResolver(async (_, { username }, { currentUser }) => {
      try {
        const checkUser = await client.user.findUnique({ where: { username } });
        if (!checkUser) {
          return {
            ok: false,
            error: "Can't follow the user , User don't exist",
          };
        }
        await client.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    }),
  },
};
