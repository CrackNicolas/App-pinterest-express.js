import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/finterest',{
    useNewUrlParser : true
})
    .then(db => console.log("DB is connected"))
    .catch(error => console.log(error))