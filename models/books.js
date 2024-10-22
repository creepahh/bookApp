const mongoose=require ('mongoose');
const Schema =mongoose.Schema;
const ObjectId=Schema.ObjectId;
const BlogPost =new Schema({
    bookName:String,
    author:String,
    bookDescription :String
});
//schema created of the Mongoose for the connection
//exporting the schema  book model
const Book =mongoose.model("Book",BlogPost);
module.exports =Book;