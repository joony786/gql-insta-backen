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
        console.log(checkExist);
        if (checkExist) {
          throw new Error('username/email already teken');
        }

        //  hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
          },
        });
      } catch (error) {
        return error;
      }
      // save the user and return it
    },
  },
};
