import { Router } from 'express';
import rutas from './rutas.js';
const router = Router();
router.all('/', rutas.allrutas);
router.post("/convert", rutas.captura);
export default router;
