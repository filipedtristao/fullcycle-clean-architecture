import dontenv from 'dotenv';
import { app } from './express';

dontenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});