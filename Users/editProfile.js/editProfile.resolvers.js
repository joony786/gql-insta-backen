import client from '../../client'

export default {
    Mutation: {
        editProfile: async(_,{firstName,lastName,email,password,userName}) => {
            try {
                const editRes = await client.user.update({
                    where:{
                        email
                    },
                    data :{
                        firstName,
                        lastName,
                        email,
                        password,
                        username
                    }
                })
            } catch (error) {
                return error
            }
        }
    }
}