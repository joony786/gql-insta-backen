import client from '../../client';
import { authResolver } from '../../Users/users.utils';

export default {
  Mutation: {
    uploadPhoto: authResolver(async (_, { caption, file }, { currentUser }) => {
      console.log("running");
      try {
        let hashObj = [];
        console.log(currentUser.id);
        if (caption) {
          const parsed = caption.match(/#[\w]+/g);
          hashObj = parsed.map(hashtag => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        const res = await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: currentUser.id,
              },
            },
            ...(hashObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashObj,
              },
            }),
          },
        });
        console.log(res);
        if(!res){
          return {
            ok: false,
            error: `phot can't be uploaded`
          }
        } else {
          return {
            ok: true,
            photo: res
          }
        }
      } catch (error) {
        return error;
      }
    }),
  },
};
