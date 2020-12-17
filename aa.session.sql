
SELECT "productId", "name", sum(quantity) 
FROM quotation_product 
JOIN product on "productId" = product.id
WHERE "quotationId"  = 28
GROUP BY "productId", "name"