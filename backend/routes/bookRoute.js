import express from 'express'
import { Book } from '../models/bookModels.js';

const router = express.Router();

//Route for a save a book
router.post('/', async (req,res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"Send all required fields: title, author, publishYear",
            });
            

        }
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };


        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }catch (err) {
        console.log(err.message);
        res.status(500).send({message:err.message});
    }

});


//Route the Get all the books from database
router.get('/', async (req,res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count:books.length,
            data:books
        });

    }catch (err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});


//Route the Get one book from database by id
router.get('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id);


        return res.status(200).json(book);

    }catch (err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//Route for Update a Book
router.put("/:id", async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all required fields: tilte,author, publishYear',
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message:'Book not found'});
        }

        return res.status(200).send({
            message:"Book updated successfully"
        });

    }catch (err) {
        console.log(err.message);
        response.status(500).send({
            message:err.message
        });
    }
});


//Route for Delete a book
router.delete('/:id', async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndUpDelete(id);

        if(!result) {
            return res.status(404).json({
                message: "Book not found"
            });

        }

        return res.status(200).send({
            message:"Book deleted successfully"
        });
        
    }catch (err){
        console.log(err.message);
        res.status(500).send({
            message: err.message
        });
    }
});

export default router;