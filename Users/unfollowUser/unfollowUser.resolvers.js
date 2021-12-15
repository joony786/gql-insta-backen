import client from '../../client';
import { authResolver } from '../users.utils';

export default {
  Mutation: {
    unfollowUser: authResolver(async (_, { username }, { currentUser }) => {
      const foundUser = await client.user.findUnique({ where: { username } });
      if (!foundUser) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      await client.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          following: {
            disconnect: { username },
          },
        },
      });
      return {
          ok: true
      }

    }),
  },
};
