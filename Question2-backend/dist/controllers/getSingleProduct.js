"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function getSingleProduct(req, res) {
    const { categoryname, productid } = req.params;
    const products = JSON.parse(fs_1.default.readFileSync('allProducts.json', 'utf8'));
    try {
        // Find the product with the given productId
        const product = products.find(product => product.id === productid);
        if (product) {
            return res.status(200).json(product);
        }
        else {
            return res.status(404).json({ error: "Product not found" });
        }
    }
    catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.default = getSingleProduct;
