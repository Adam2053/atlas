import mongoose from "mongoose";

const allNames = new mongoose.Schema(
    {
        name: String
    }
)

const Name = mongoose.model('Name', allNames);

export default Name;