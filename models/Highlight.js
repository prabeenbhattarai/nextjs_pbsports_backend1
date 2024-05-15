import axios from 'axios';
import mongoose, {model, Schema, models} from "mongoose";


const HighlightSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    url: String,
    images: [{type:String}],
    categories: {type:mongoose.Types.ObjectId, ref:'Category'},
},{
    timestamps: true,

  
});
export const Highlight = models.highlight || model('highlight', HighlightSchema);