import {Types} from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface IPost {
    user: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    datetime: Date;
}