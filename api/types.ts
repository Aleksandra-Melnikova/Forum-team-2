import {Model} from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
}