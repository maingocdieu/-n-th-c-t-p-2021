
export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(product: any) {
        this.id = product.id;
        this.name = product.productName;
        this.imageUrl = product.nameImage;
        this.price = product.price;
        this.quantity = 1;
    }
}
