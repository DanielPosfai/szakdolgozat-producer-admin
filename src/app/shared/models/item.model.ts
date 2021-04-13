import { User } from "./user.model";

export class Item {

    public id: number;

    constructor(
        public productname: string,
        public category: string,
        public unit: string,
        public price: number,
        public details: string,
        public image: string,
        public producer: User
    ) { }
}
