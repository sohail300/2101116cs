"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllProducts_1 = __importDefault(require("../controllers/getAllProducts"));
const getSingleProduct_1 = __importDefault(require("../controllers/getSingleProduct"));
const router = express_1.default.Router();
router.get("/:categoryname/products", getAllProducts_1.default);
router.get("/:categoryname/products/:productid", getSingleProduct_1.default);
exports.default = router;
