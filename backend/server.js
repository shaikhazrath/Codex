import express from 'express';
import cors from 'cors';
import Compilter from './routes/complerRoute.js'
import Problems from './routes/problemRoute.js';
import User from './routes/userRoute.js'

import mongoose from 'mongoose';
import { config } from 'dotenv';

const app = express();
config({
    path:'./.env'
})

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB).then(
    console.log('mongodb connected')
);

app.use('/compiler',Compilter)
app.use('/problems',Problems)
app.use('/user',User)



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
