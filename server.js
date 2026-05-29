const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
const blockRouter = require('./routes/blockRouter');
const connectionRouter = require('./routes/connectionRouter');
const interestRouter = require('./routes/interestRouter');
const notificationRouter = require('./routes/notificationRouter');
const postRouter = require('./routes/postRouter');
const profileRouter = require('./routes/profileRouter');
const requestRouter = require('./routes/requestRouter');
const tokenRouter = require('./routes/tokenRouter');
const chatRouter = require('./routes/chatRouter');
const deleteAccRouter = require('./routes/deleteAccRouter');
const messageRouter = require('./routes/messageRouter');

const errorHandler = require('./middleware/globalErrorHandler');
const connectMongoDB = require('./config/mongooseConfig');


dotenv.config();

const { PORT } = process.env;


connectMongoDB();



const server = express();

server.use(express.json());

server.use('/uploads', express.static('uploads'));


server.use('/auth', authRouter); // -- worked
server.use('/interest', interestRouter); //-- worked
server.use('/post', postRouter); // -- worked
server.use('/profile', profileRouter); // -- worked
server.use('/request', requestRouter); // -- worked
server.use('/connection', connectionRouter); // -- worked
server.use('/notification', notificationRouter);
server.use('/token', tokenRouter);
server.use('/message', messageRouter);
server.use('/chat', chatRouter);
server.use('/delete', deleteAccRouter);
server.use('/block', blockRouter);




server.use(errorHandler);

server.listen(PORT, () => console.log(`server up and running on http://localhost:${PORT}`));