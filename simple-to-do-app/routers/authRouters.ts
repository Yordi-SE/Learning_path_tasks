import { Router } from "express";
import { signin, signup } from "../controllers/authControllers";
const router: Router = Router();
router.post('/login',signin);
router.post('/signup',signup);
export default router;