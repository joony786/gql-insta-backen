import client from '../../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if user Exist in Db with email/username
      try {
        const checkExist = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (checkExist?.email === email) {
          throw new Error('email already taken');
        }
        if (checkExist?.username === username) {
          throw new Error('username already taken');
        }
        //  hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
         // save the user and return it
        const userRes = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
          },
        });
        if (!userRes) {
          return {
            ok: false,
            error: "Can't create the user",
          };
        }
        return {
          ok: true,
          message: 'User Created successfully',
        };
      } catch (error) {
        return error;
      }
     
    },
  },
};
