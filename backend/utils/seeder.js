import product from "../models/product.js"
import dotenv from "dotenv"
dotenv.config({ path: 'backend/config/config.env' })
import connectDB from "../config/database.js"

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const products = require("../data/products.json");

connectDB();

const seedProducts = async()=>{
    try {
        await product.deleteMany()
        console.log("Products deleted");

        await product.insertMany(products)
        console.log("All products added");
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts()