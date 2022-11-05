import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.get('/', AuthController.login)

export { authRoutes }