const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
const connectionRouter = require('./routes/connectionRouter');
const interestRouter = require('./routes/interestRouter');
const notificationRouter = require('./routes/notificationRouter');
const postRouter = require('./routes/postRouter');
const profileRouter = require('./routes/profileRouter');
const requestRouter = require('./routes/requestRouter');
const tokenRouter = require('./routes/tokenRouter');
const errorHandler = require('./middleware/globalErrorHandler');


dotenv.config();

const { PORT } = process.env;


const server = express();

server.use(express.json());

server.use('/uploads', express.static('uploads'));


server.use('/auth', authRouter); // -- worked
server.use('/interest', interestRouter); //-- worked
server.use('/post', postRouter); // -- worked
server.use('/profile', profileRouter); // -- worked
server.use('/request', requestRouter); // -- worked
server.use('/connection', connectionRouter);
server.use('/notification', notificationRouter);
server.use('/token', tokenRouter);



server.use(errorHandler);

server.listen(PORT, () => console.log("server up and running on http://localhost:3000"));