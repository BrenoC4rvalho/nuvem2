import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { ApiService } from "../services/ApiService";
import { checkPassword, createEncryptedPassword } from "../services/auth";

export const register = async (req: Request, res: Response) => {

    const { nickname, password } = req.body;

    console.log(nickname, password)
    if(!nickname || !password) {
        return res.json({message: 'E-mail or nickname not sent.'})
    }

    const hasUser = await ApiService.findByNickname(nickname);

    if(hasUser) {
        return res.json({message: 'E-mail or nickname already exists.'});
    }

    const encryptedPassword = await createEncryptedPassword(password);

    const newUser = await ApiService.createNewUser(nickname, encryptedPassword);

    const token = JWT.sign(
        {id: newUser.id},
        process.env.JWT_SECRET_KEY as string,
        {expiresIn: '24h'}
    )

    //return id and token
    return res.json({newUser, token})

}

export const login = async (req: Request, res: Response) => {
    
    const { nickname, password } = req.body;

    const user = await ApiService.findByNickname(nickname);

    console.log(user)
    if(!user) {
        res.json({message: 'Nickname or/and password is incorrect.'})
    }
    console.log('achei user')
    if(! await checkPassword(user, password)) {
        res.json({message: 'Nickname or/and password is incorrect.'})
    }
    console.log('achei senha')

    if(user) {
        const token = JWT.sign(
            {id: user.id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: '24h'}
        )

        return res.json({user, token});
    }

}

export const list = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    const user = await ApiService.findById(parseInt(id));

    return res.json({user})
}

export const edit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    const encryptedPassword = await createEncryptedPassword(newPassword);

    const user = await ApiService.editPassword(parseInt(id), encryptedPassword);

    res.json({user});
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    await ApiService.deleteUser(parseInt(id));

    res.json({});
}
