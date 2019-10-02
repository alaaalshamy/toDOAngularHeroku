export interface ToDoCart {
    id: string;
    cartTitle: string;
    cartBody: string;
    cartDate: Date;
    active:number;
    postedBy: any;
}

export interface User {
    email: number;
    _id: string;
    token:string
}