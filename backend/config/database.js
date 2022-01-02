import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then((connect) => {
      console.log(
        `MONGODB CONNECTED WITH HOST: ${connect.connection.host}`,
      );
    });
};

export default connectDB;
