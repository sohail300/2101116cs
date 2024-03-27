import { Request, Response } from "express";
import companies from "../utils/companies";
import categories from "../utils/categories";
import baseURL from "../utils/baseURL";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'

export default async function getAllProducts(req: Request, res: Response) {
  const { categoryname } = req.params;

  try {
    // Fetch products from each company's API
    const productsPromises = companies.map(async company => {
      const url = `${baseURL}/${company}/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=100000`;
      const response = await axios.get(url, {
        params: req.query,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzExNTUzNTc4LCJpYXQiOjE3MTE1NTMyNzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRmZmU4MGY5LWMxYTItNDE1Ny1hYjZhLWU1NjQwMGQwYzA0NyIsInN1YiI6Im1kLjIxMDExMTZjc0BpaWl0YmguYWMuaW4ifSwiY29tcGFueU5hbWUiOiJzb2hhaWxNYXJ0IiwiY2xpZW50SUQiOiI0ZmZlODBmOS1jMWEyLTQxNTctYWI2YS1lNTY0MDBkMGMwNDciLCJjbGllbnRTZWNyZXQiOiJUeWhmZE9LdmZ1UXhNTWJRIiwib3duZXJOYW1lIjoiU29oYWlsIiwib3duZXJFbWFpbCI6Im1kLjIxMDExMTZjc0BpaWl0YmguYWMuaW4iLCJyb2xsTm8iOiIyMTAxMTE2Y3MifQ.vmq-bfQAlEUQ8yER9g8XueN0xl9ZpeljWMw98IJvXxI`,
        },
      });
      
      return response.data.map(product => ({
        id: uuidv4(), // Generate unique ID for each product
        productName: product.productName,
        price: product.price,
        rating: product.rating,
        discount: product.discount,
        availability: product.availability,
        company: company
    }));
    });

    // Wait for all requests to finish
    const products = await Promise.all(productsPromises);
        
    // Flatten the array of arrays into a single array
    const mergedProducts = [].concat(...products);

    fs.writeFileSync('allProducts.json', JSON.stringify(mergedProducts, null, 2));

    return res.status(200).json(mergedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
