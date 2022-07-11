import { Request, Response } from "express";
import { unlink } from "fs/promises";
import sharp from "sharp";


export const uploadFile = async (req: Request, res: Response) => {

    if(req.file) {
        await sharp(req.file.path).resize(500).toFormat('jpeg').toFile(`./public/media/${req.file.filename}.jpg`);

        await unlink(req.file.path);
        res.json({ image: `${req.file.filename}.jpg`})
    } else {
        res.status(400)
        res.json({error: 'Arquivo invalido'});
    }

}





