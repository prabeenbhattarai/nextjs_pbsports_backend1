import axios from 'axios';
import mongoose, {model, Schema, models} from "mongoose";


const ScheduleSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    time: String,
    url: String,
    images: [{type:String}],
    categories: {type:mongoose.Types.ObjectId, ref:'Category'},
},{
    timestamps: true,

  
});
export const Schedule = models.schedule || model('schedule', ScheduleSchema);