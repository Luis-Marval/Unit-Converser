import { Router } from 'express'
import rutas from './rutas.js'

const router: Router = Router()

router.all('/', rutas.allrutas)
router.post("/convert",rutas.captura)
router.get("/units",rutas.getUnits)
if (process.env.NODE_ENV === 'production') {
  router.get('/', rutas.allrutas);
}
export default router
