import app from './app.js';

import dotenv from "dotenv"
dotenv.config({ path: 'backend/config/config.env' })

//LOCAL IMPORTS

import productRoute from "./routes/product.js"
import connectDB from './config/database.js';


//DB CONNECTION
connectDB();

//API ROUTES
app.use('/api/v1',productRoute)

app.listen(process.env.PORT , ()=>{
    console.log(`Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})
