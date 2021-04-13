import { Subject } from "rxjs";
import { BasketItem } from "../models/basketItem.model";

export class BasketUtil {

    public basketItems = new Array<BasketItem>();

    totalPrice: Subject<number> = new Subject<number>();

    constructor() {
        this.basketItems = JSON.parse(sessionStorage.getItem('basketItems')) != null ? JSON.parse(sessionStorage.getItem('basketItems')) : [];
    }

    addToBasket(theBasketItem: BasketItem, quantity: number) {
        // check if we already have item in the cart
        let alredyExistInCart: boolean = false;
        let existingBasketItem: BasketItem = undefined;
        // find the item in the cart based on item id
        if (this.basketItems.length > 0) {

            existingBasketItem = this.basketItems.find(tempBasketItem => tempBasketItem.id === theBasketItem.id);
            // check if we found it 
            alredyExistInCart = (existingBasketItem != undefined);
        }
        if (alredyExistInCart) {
            existingBasketItem.quantity = Number(existingBasketItem.quantity) + Number(quantity);
        } else {
            // just add the item
            theBasketItem.quantity = Number(quantity);
            this.basketItems.push(theBasketItem);
            
        }
        this.computeBasketTotal();
        this.persistBasketItems();
    }

    computeBasketTotal() {
        let totalPriceValue: number = 0;
        for (let currentItem of this.basketItems) {
            totalPriceValue += currentItem.quantity * currentItem.price;
        }
        // publish the value
        this.totalPrice.next(totalPriceValue);
        this.logData(totalPriceValue)
    }
    logData(totalPriceValue: number) {
        console.log('Content of the cart');
        for (let tempItem of this.basketItems) {
            console.log(tempItem.productname + ' + Quantity:' + tempItem.quantity)
            console.log('------');
        }
        console.log(totalPriceValue);
    }
    persistBasketItems() {
        sessionStorage.setItem('basketItems', JSON.stringify(this.basketItems));
    }
}
