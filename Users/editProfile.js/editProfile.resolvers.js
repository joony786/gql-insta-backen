import client from '../../client';
import bcrypt from 'bcrypt';
import { authResolver, saveFiles } from '../users.utils';
const { GraphQLUpload } = require('graphql-upload');

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: authResolver(
      async (
        _,
        {
          firstName,
          lastName,
          email,
          password: userPassword,
          username,
          bio,
          avatar,
        },
        { currentUser }
      ) => {
        try {
          let hashPassword = null;
          let fileUrl = null;
          if (avatar) {
            const url = await saveFiles(avatar);
            fileUrl = `${process.env.API_URL}/${url}`
          }
          if (userPassword) {
            hashPassword = await bcrypt.hash(userPassword, 10);
          }
          const updatedUser = await client.user.update({
            where: {
              id: currentUser.id,
            },
            data: {
              firstName,
              lastName,
              email,
              username,
              bio,
              ...(hashPassword && { password: hashPassword }),
              ...(fileUrl && {avatar: fileUrl})
            },
          });
          if (!updatedUser) {
            return {
              ok: false,
              error: "Something went wrong user can't be updated, try again",
            };
          } else {
            return {
              ok: true,
            };
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};
