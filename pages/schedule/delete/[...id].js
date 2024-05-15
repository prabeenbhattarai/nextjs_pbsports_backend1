import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DeleteSchedulePage(){
    const router = useRouter();
    const [scheduleInfo,setScheduleInfo] = useState();
    const {id} = router.query;
    useEffect(() =>{
        if (!id) {
            return;
        }
        axios.get('/api/schedule?id='+id).then(response =>{
            setScheduleInfo(response.data);
        });
    }, [id]);
    function goBack(){
        router.push('/schedule');
    }
    async function deleteSchedule(){
        await axios.delete('/api/schedule?id='+id);
        goBack();
    }
    return(
<Layout>
    <h1 className="text-center"> Do you really want to delete <b>{scheduleInfo?.title}</b>?</h1>
    <div className="flex gap-2 justify-center">
    <button onClick={deleteSchedule} className="btn-red">Yes</button>
    <button onClick={goBack} className="btn-default">No</button>
    </div>
    
    

</Layout>
    )
}