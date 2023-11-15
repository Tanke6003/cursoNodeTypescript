import Mongoose from 'mongoose';

const LogSchema = new Mongoose.Schema({
    
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export const LogModel = Mongoose.model('Log', LogSchema);


