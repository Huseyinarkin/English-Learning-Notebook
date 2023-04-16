import mongoose from 'mongoose';
const wordSchema = new mongoose.Schema({
    word: {
        type: String
    },
    trWord: [String],
    rating:{
        type: Number
    } 
    // Add more fields as necessary
});

// Define the model for the "Dictionary" collection
const Word = mongoose.model('Word', wordSchema);

export default Word;