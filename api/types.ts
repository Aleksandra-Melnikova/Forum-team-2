import {Model, Types} from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface IPost {
    user: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    datetime: Date;
}