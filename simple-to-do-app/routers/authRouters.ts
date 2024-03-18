import { Router } from "express";
import { signin, signup } from "../controllers/authControllers";
import validate_user from "../joi_validation/User_validation";
const router: Router = Router();
router.post('/login',validate_user,signin);
router.post('/signup',validate_user,signup);
export default router;