const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const booksRouter = require('./api/routes/Books');

const DBConnection = async ()=>{
  try {
    await mongoose.connect('mongodb://localhost:27017/books');
      console.log('Connected to MongoDB');
      } catch (error) {
        console.log('Error connecting to MongoDB');
        
        }
}
DBConnection();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/books', booksRouter);

//EROOR HANDLING

//For not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//For any other type error
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});


app.listen(8080, () =>{
  console.log('Server is running on port 8080');
})