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
      return id === currentUser?.id ? true : false;
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
  },
};
