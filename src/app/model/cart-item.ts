
export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    giaBanRa: number;
    quantity: number;
    soLuongTon: number

    constructor(product: any) {
        this.id = product.id;
        this.name = product.nameProduct;
        this.imageUrl = product.nameImage;
        this.giaBanRa = product.giaBanRa;
        this.soLuongTon = product.soLuong;
        this.quantity = 1;
    }
}
