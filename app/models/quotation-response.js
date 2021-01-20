import { User } from "./user.js";
import typeorm from 'typeorm';
import { Quotation, QuotationProduct } from './quotation.js';
import { Product } from './product.js';

const {BaseEntity, EntitySchema} = typeorm;


export class ProductResponse extends BaseEntity{ 
    id;
    supplierId;
    productId;
    supplier;
    quotationProduct;
    price;
    chose;
}

export const productResponseScheme = new EntitySchema({
    name: "ProductResponse",
    target: ProductResponse,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        supplierId:  { type: "int", },
        productId:   { type: "int", nullable: false },
        quotationId: { type: "int", nullable: false },
        price: { type: "decimal", precision: 5, scale: 2 },
        chose: { type: "boolean", nullable: true },
    },
    relations:{
        supplier: {
            target: () => User,
            type: "many-to-one",
        },
        product: {
            target: () => Product,
            type: "many-to-one"
        },
        quotation: {
            target: () => Quotation,
            type: "many-to-one"
        }
    }
  })