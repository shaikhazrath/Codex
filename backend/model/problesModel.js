import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    testCases: [{
        input: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        expectedOutput: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    }],
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
