import { Item } from "./item.model";

export class BasketItem {

    public id: number;
    public productname: string;
    public unit: string;
    public price: number;
    public details: string;
    public image: string;
    public category: string;

    public quantity: number;

    constructor(item: Item) {

        this.id = item.id;
        this.productname = item.productname;
        this.unit = item.unit;
        this.price = item.price;
        this.details = item.details;
        this.image = item.image;
        this.category = item.category;

    }
}