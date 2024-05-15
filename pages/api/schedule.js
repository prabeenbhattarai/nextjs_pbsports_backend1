import { mongooseConnect } from "@/lib/mongoose";
import { Schedule } from "@/models/Schedule";
import axios from 'axios';


export default async function handle(req, res){
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET'){
    if(req.query?.id){
    res.json(await Schedule.findOne({_id:req.query.id}));
  }
  else{
    res.json(await Schedule.find());
  }
}
  if (method === 'POST'){
    const {title,description,time,url,images,categories} = req.body;
    const scheduleDoc =  await Schedule.create({
        title,description,time,url,images,categories,
    })
res.json(scheduleDoc);
  }
  if (method === 'PUT'){
    const {title,description,time,url,images,categories,_id} = req.body;
    await Schedule.updateOne({_id}, {title,description,time,url,images,categories});
    res.json(true);
  }
  if(method === 'DELETE'){
    await Schedule.deleteOne({_id:req.query?.id});
    res.json(true);
  }
}