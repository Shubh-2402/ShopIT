import app from './app.js';

import dotenv from "dotenv"
dotenv.config({ path: 'backend/config/config.env' })

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})
