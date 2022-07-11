import { User } from "../models/User"

export const ApiService = {
    
    findByNickname: async (nickname: string) => {
        return await User.findOne({ where: { nickname } });
    },

    findById: async (id: number) => {
        return await User.findByPk(id);
    },
 
    createNewUser: async (nickname: string, password: string) => {
        return await User.create({ nickname, password}); 
    },

    editPassword: async (id: number, newPassword: string) => {
        await User.update({ password: newPassword}, {
            where: { id }
        })
    },

    deleteUser: async (id: number) => {
        await User.destroy({ where: {id} })
    }

};