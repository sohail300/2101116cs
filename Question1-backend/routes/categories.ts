import express from "express";
import getAllProducts from "../controllers/getAllProducts";
import getSingleProduct from "../controllers/getSingleProduct";

const router = express.Router();

router.get("/:categoryname/products", getAllProducts);

router.get("/:categoryname/products/:productid", getSingleProduct);

export default router;
