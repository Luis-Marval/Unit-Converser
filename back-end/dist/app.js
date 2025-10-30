import express from 'express';
import router from './router.js';
import { loadEnvFile } from 'process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
const enRuta = join(fileURLToPath(import.meta.url), '../../../.env');
loadEnvFile(enRuta);
const { BackEndPort = '3000' } = process.env;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/', router);
app.listen(BackEndPort, () => {
    console.log('Coriendo en el puerto:', BackEndPort);
});
