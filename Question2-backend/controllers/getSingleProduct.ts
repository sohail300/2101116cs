import { Request, Response } from "express";
import fs from 'fs'


export default function getSingleProduct(req: Request, res: Response) {
    const { categoryname, productid } = req.params;
    const products = JSON.parse(fs.readFileSync('allProducts.json', 'utf8'));

    try {
        // Find the product with the given productId
        const product = products.find(product => product.id === productid);

        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
