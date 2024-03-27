"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companies_1 = __importDefault(require("../utils/companies"));
const baseURL_1 = __importDefault(require("../utils/baseURL"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { categoryname } = req.params;
        try {
            // Fetch products from each company's API
            const productsPromises = companies_1.default.map((company) => __awaiter(this, void 0, void 0, function* () {
                const url = `${baseURL_1.default}/${company}/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=100000`;
                const response = yield axios_1.default.get(url, {
                    params: req.query,
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzExNTUzNTc4LCJpYXQiOjE3MTE1NTMyNzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRmZmU4MGY5LWMxYTItNDE1Ny1hYjZhLWU1NjQwMGQwYzA0NyIsInN1YiI6Im1kLjIxMDExMTZjc0BpaWl0YmguYWMuaW4ifSwiY29tcGFueU5hbWUiOiJzb2hhaWxNYXJ0IiwiY2xpZW50SUQiOiI0ZmZlODBmOS1jMWEyLTQxNTctYWI2YS1lNTY0MDBkMGMwNDciLCJjbGllbnRTZWNyZXQiOiJUeWhmZE9LdmZ1UXhNTWJRIiwib3duZXJOYW1lIjoiU29oYWlsIiwib3duZXJFbWFpbCI6Im1kLjIxMDExMTZjc0BpaWl0YmguYWMuaW4iLCJyb2xsTm8iOiIyMTAxMTE2Y3MifQ.vmq-bfQAlEUQ8yER9g8XueN0xl9ZpeljWMw98IJvXxI`,
                    },
                });
                return response.data.map(product => ({
                    id: (0, uuid_1.v4)(),
                    productName: product.productName,
                    price: product.price,
                    rating: product.rating,
                    discount: product.discount,
                    availability: product.availability,
                    company: company
                }));
            }));
            // Wait for all requests to finish
            const products = yield Promise.all(productsPromises);
            // Flatten the array of arrays into a single array
            const mergedProducts = [].concat(...products);
            fs_1.default.writeFileSync('allProducts.json', JSON.stringify(mergedProducts, null, 2));
            return res.status(200).json(mergedProducts);
        }
        catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.default = getAllProducts;
