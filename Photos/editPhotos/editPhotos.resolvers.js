import client from '../../client';
import { authResolver } from '../../Users/users.utils';
import { returnHashTags } from '../photos.utils';

export default {
  Mutation: {
    editPhoto: authResolver(async (_, { id, caption }, { currentUser }) => {
      try {
        const parsedHashtags = returnHashTags(caption);
        const foundPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: currentUser?.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!foundPhoto) {
          return {
            ok: false,
            error: 'No photo exist with that Id',
          };
        }

        const updatePhoto = await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: foundPhoto.hashtags,
              connectOrCreate: parsedHashtags,
            },
          },
        });
        if (!updatePhoto) {
          return {
            ok: false,
            error: 'something went wrong',
          };
        } else {
          return {
            ok: true,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }),
  },
};
