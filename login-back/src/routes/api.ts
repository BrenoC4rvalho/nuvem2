import { Router } from "express";
import * as ApiController from '../controllers/apiController';
import { Auth } from "../middlewares/auth";

const router = Router();

//public routes
router.post('/signup', ApiController.register);
router.post('/signin', ApiController.login);

//private routes -> in these routes is authentication token is required
router.get('/:id', Auth.private, ApiController.list); 
router.put('/:id', Auth.private, ApiController.edit); 
router.delete('/:id', Auth.private, ApiController.remove); 

export default router;