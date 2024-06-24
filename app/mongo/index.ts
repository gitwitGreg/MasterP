import mongoose from "mongoose";

let isConnected = false;



/** Connect to database or return if already connected*/
export const connectToDb = async() => {

    if(isConnected){

        console.log('already connected');

        return;

    }

    try{

        await mongoose.connect(process.env.DATABASE_URL as string, {
            dbName: 'Cluster0'
        });

        isConnected = true;

    }catch(error){

        console.log(error);

    }
}