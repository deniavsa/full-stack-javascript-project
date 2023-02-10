import { connect, set } from 'mongoose';

set('strictQuery', false);

async function connectDB(): Promise<void> {

    await connect('mongodb://127.0.0.1:27017/de10');
}


export default connectDB;

