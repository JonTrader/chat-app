import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js'
import { arcjetProtection } from '../middleware/arcjet.middleware.js'

const router = express.Router();

router.use(arcjetProtection)

// router.get("/test", arcjetProtection, (req, res) => {
//     return res.status(200).json({message: "test completed"})
// })

router.post("/login", login)
router.post("/logout", logout)
router.post("/signup", signup)

router.put("/update-profile", protectRoute, updateProfile)

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user))


export default router