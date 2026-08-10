import Book from "../model/booksModel";
export const addbook = async (req, res) => {
    try {
        const note = await Book.create(req.body)
        res.status(201).json({
            status: true,
            message: "Book insert successfuly !",
            note,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Book insert failed !",
            err: err.message,
        });
    }
};

export const getbook = async (req, res) => {
    try {
        const result = await Book.find();
        res.status(200).json({
            status: true,
            message: "Book fetched successfuly !",
            result,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Book fetching failed !",
            err: err.message,
        });
    }

};

export const updatebook = async (req, res) => {
    try {
        const result = await Book.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).json({
            status: true,
            message: "Book Update successfuly !",
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Book Failed failed !",
            err: err.message,
        });
    }
};

export const deletebook = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Book Delete Successfuly !",
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Book Delete failed !",
            err: err.message,
        });
    }
};