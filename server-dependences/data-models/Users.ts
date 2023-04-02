import { ObjectId } from "mongodb";

export interface Users{
name : string;
password : string;
id?: ObjectId 
}