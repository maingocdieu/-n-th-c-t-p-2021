
export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    giaBanRa: number;
    quantity: number;
    soLuongTon: number;
    color: string;
    size: string;
    supplier: string;
    constructor(productDetail: any, product: any) {
        this.id = productDetail.id;
        this.name = product.nameProduct;
        this.imageUrl = product.nameImage;
        this.giaBanRa = productDetail.price;
        this.soLuongTon = product.soLuong;
        this.quantity = 1;
        this.color = productDetail.color.nameColor;
        this.size = productDetail.size.namesize;
        this.supplier = productDetail.supplier.nameSupplier;
    }
}
