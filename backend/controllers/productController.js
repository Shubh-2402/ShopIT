import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// GET ALL PRODUCTS -> api/v1/products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// GET SINGLE PRODUCT -> api/v1/product/:id

export const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// ADD NEW PRODUCT -> api/v1/admin/product/new

export const addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    success: true,
    newProduct,
  });
};

// UPDATE A PRODUCT --> api/v1/admin/product/:id

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// DELETE A PRODUCT --> api/v1/admin/product/:id

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
};
