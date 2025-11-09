import { JsonValue } from "@prisma/client/runtime/library";

type Role = 'USER' | 'ARTIST';

export interface FormValues {
    name: string;
    email: string;
    username: string,
    password: string,
    phone: string,
    country: string;
    role: Role;
}

export interface LoginFormValues {
    username: string,
    password: string
}

export interface AddPostValues {
    title: string,
    price: string,
    description: string,
    bidEndDate: string,
    filePath: string,
}

export interface Product {
    id: number;
    title: string;
    image: string;
    createdAt: Date;
    description: string;
    price: string;
    bidEndDate: string;
    published: boolean;
    authorId: string;
    authorUserName: string;
    bidHistory: JsonValue;
}
