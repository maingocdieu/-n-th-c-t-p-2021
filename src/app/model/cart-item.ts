
export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    giaBanRa: number;
    quantity: number;
    soLuongTon: number;
    color: any;
    size: any;
    supplier: any;


    constructor(productDetail: any, product: any) {
        this.id = productDetail.id;
        this.name = product.nameProduct;
        this.imageUrl = product.nameImage;
        this.giaBanRa = productDetail.price;
        this.soLuongTon = productDetail.soLuong;
        this.quantity = 1;
        this.color = productDetail.color;
        this.size = productDetail.size;
        this.supplier = productDetail.supplier;
    }
}
