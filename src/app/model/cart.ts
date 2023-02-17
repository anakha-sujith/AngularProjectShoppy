export interface CartModel{
    cartId ?: number,
    userId : number,
    productId : number
}

export interface CartDetails{
    cartId ?: number,
    userId? : number,
    productId : number,
    productName : string,
    price: number,
    productImage:string,
    productDescription:string,
    productType:string,
}