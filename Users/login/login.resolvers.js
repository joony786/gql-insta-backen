import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        // check if user exist
        const foundUser = await client.user.findFirst({
          where: {
            username,
          },
        });
        if (!foundUser) {
          return {
            ok: false,
            error: 'user not found',
          };
        }
        // compare the password
        const comparePassword = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (!comparePassword) {
          return {
            ok: false,
            error: 'Incorrect password',
          };
        }
        const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (error) {
        return error;
      }
    },
  },
};
