// Example model
import {BaseEntity, EntitySchema} from "typeorm";
import { Product } from "./product.js";
import { User } from "./user.js";

export class Quotation extends BaseEntity{ 
  id;
  name;
  date;
  state
}


export class QuotationProduct extends BaseEntity{ 
    id;
    productId;
    quotationId;
    buyerId;
    quantity;
  }

  
export const quotationScheme = new EntitySchema({
  name: "Quotation",
  target: Quotation,
  columns: {
      id: {
          primary: true,
          type: "int",
          generated: true
      },
      name: {
          type: "varchar"
      },
      date: {
        type: "date"
      },
      state:{
        type: "enum",
        enum: ["new", "open", "closed"],
        default: "new"
      }
  },
  relations: {
    products: {
      target: () => QuotationProduct,
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'quotation'
    },
  }
})


export const quotationProductScheme = new EntitySchema({
    name: "QuotationProduct",
    target: QuotationProduct,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        quantity:{
            type: "int",
        },
       
    },
    relations:{
        quotation: {
            target: () => Quotation,
            type: "many-to-one",
            inverseSide: 'products'
        },
        user: {
            target: () => User,
            type: "many-to-one",
        },
        product: {
            target: () => Product,
            type: "many-to-one",
        }
    }
  })