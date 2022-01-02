import client from '../../client';

export default {
  Query: {
    seeHashtag: (_, { hashtag }) =>
      client.hashTag.findUnique({ where: { hashtag } }),
  },
};
