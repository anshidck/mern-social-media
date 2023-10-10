const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express();
dotenv.config();
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`connected to ${PORT}`)
})