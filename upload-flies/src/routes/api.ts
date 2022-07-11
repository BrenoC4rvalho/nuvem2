import { Router } from 'express';
import multer from 'multer';

import * as ApiController from "../controllers/apiController"

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp')
    },
    filename: (req, file, cb) => {
        let randomName = Math.floor(Math.random() * 99999)
        cb(null, `${randomName}.jpg`)
    }
})

const upload = multer({
    storage: storageConfig,
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
        cb(null, allowed.includes( file.mimetype));
    }
})

const router = Router();

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

export default router;