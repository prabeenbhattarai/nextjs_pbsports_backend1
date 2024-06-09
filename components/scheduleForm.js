import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from 'next/image';



export default function ScheduleForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    time:existingtime,
    url:existingurl,
    images: existingImages,
    categories:assignessCategories,

}) {

const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [categories,setCategories] = useState(assignessCategories || '');
    const [time,setTime] = useState(existingtime || '');
    const[images, setImages] = useState(existingImages || []);
    const [url,setUrl] = useState(existingurl ||'');

    const [goToSchedule,setGoToSchedule] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [category,setCategory] = useState([]);
    const router = useRouter();

    useEffect(() =>
    {
      axios.get('/api/category').then(result =>{
        setCategory(result.data);
      })
    }, []);
    async function saveSchedule(ev){
        ev.preventDefault();
        const data={title,description,time,url,images,categories};


        if(_id){
            //update
            await axios.put('/api/schedule', {...data,_id});


        } else{
            //create
 await axios.post('/api/schedule', data);
        }
        
 setGoToSchedule(true);
    }
    if (goToSchedule){
         router.push('/schedule');
    }
    async function uploadImage(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
           const res = await axios.post('/api/upload', data);
           setImages(oldImages =>{
            return [...oldImages, ...res.data.links];
           });
           setIsUploading(false);
           }
            
        

    }
    function updateImagesOrder(images){
        setImages(images);
    }
    return (
      
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={saveSchedule}>
    <div class="flex flex-wrap -mx-3 mb-6">
 <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Event/Match Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Nepal Vs India" value={title} onChange={ev => setTitle(ev.target.value)}/> 
      <p class="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
          Event Video Player URL
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="url" placeholder="http://example.com.hls" value={url} onChange={ev => setUrl(ev.target.value)}/>
      
        <p class="text-gray-600 text-xs italic">Please provide valid URL as we just embedded in iframe & not a video player </p>
</div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">


          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={description} onChange={ev => setDescription(ev.target.value)}/>
          <p class="text-gray-600 text-xs italic">Please Describe event in short so user can get all detail. </p>
        </div>
        <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Category 
          </label>
          <select 
          value={categories}
          onChange={ev => setCategories(ev.target.value)}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="">Uncategorized</option>
            {category.length > 0 && category.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <p class="text-red-600 text-xs italic">Please check once for choosing the right category </p>

</div>
</div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Time
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="datetime-local" value={time} onChange={ev => setTime(ev.target.value)}/>
      <p class="text-gray-600 text-xs italic">Set Event Time Carefully as it show the Event/Match start time. </p>
    </div>
    
  </div>
<label>
    Images
</label>
<div className="mb-2 flex flex-wrap gap-1">
    <ReactSortable className="flex flex-wrap gap-1"list={images} setList={updateImagesOrder}>
{!!images?.length && images.map(link =>(
    <div key={link} className=" h-24 ">
       <Image src={link} width={500} height={500} alt="" className="rounded-lg"/>
        </div>
    ))}
    </ReactSortable>
    {isUploading && (
        <div className="h-24 flex items-center">
           <Spinner />
            </div>
    )}

    <label className=" w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>
<div> Upload</div>
       <input type="file" onChange={uploadImage} className="hidden"></input>
    </label>
{!images?.length && (
    <div>** Not found Any Images for this Event**</div>
)}
</div>


<button type="submit" className="btn-primary">Save </button>

</form>


);
};
