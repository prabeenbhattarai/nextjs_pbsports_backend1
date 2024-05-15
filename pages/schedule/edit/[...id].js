import Layout from "@/components/layout";
import ScheduleForm from "@/components/scheduleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditSchedulePage (){
    const [ScheduleInfo, setScheduleInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api//schedule?id='+id).then(response =>{
        setScheduleInfo(response.data);
    });
    }, [id]);
   
    return(

        <Layout>

    <center><h1 className="text-blue-900 italic bold">Edit section for Event Scheduler</h1>
    </center>
    {ScheduleInfo && (
         <ScheduleForm {...ScheduleInfo} />
    )}
           
        </Layout>
    );
}