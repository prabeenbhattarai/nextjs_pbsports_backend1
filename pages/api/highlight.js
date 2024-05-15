import { mongooseConnect } from "@/lib/mongoose";
import { Highlight } from "@/models/Highlight";
import axios from 'axios';


export default async function handle(req, res){
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET'){
    if(req.query?.id){
    res.json(await Highlight.findOne({_id:req.query.id}));
  }
  else{
    res.json(await Highlight.find());
  }
}
  if (method === 'POST'){
    const {title,description,url,images,categories} = req.body;
    const highlightDoc =  await Highlight.create({
        title,description,url,images,categories,
    })
res.json(highlightDoc);
  }
  if (method === 'PUT'){
    const {title,description,url,images,categories,_id} = req.body;
    await Highlight.updateOne({_id}, {title,description,url,images,categories});
    res.json(true);
  }
  if(method === 'DELETE'){
    await Highlight.deleteOne({_id:req.query?.id});
    res.json(true);
  }
}