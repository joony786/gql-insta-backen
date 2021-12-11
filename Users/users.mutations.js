import client from '../client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

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
    login: async (_,{username,password})=> {
        
      try {
          // check if user exist
        const foundUser = await client.user.findFirst({
            where:{
                username
            }
        })
        if(!foundUser){
            return {
                ok: false,
                error: "user not found"
            }
        }
        // compare the password
        const comparePassword = await bcrypt.compare(password, foundUser.password)
        if(!comparePassword){
            return {
                ok: false,
                error: "Incorrect password"
            }
        }
        const token = jwt.sign({id: foundUser.id},process.env.SECRET_KEY)
        return {
            ok: true,
            token
        }
      } catch (error) {
         return error 
      }
    }
  },
};
