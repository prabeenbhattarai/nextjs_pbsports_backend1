import HighlightForm from "@/components/Highlightform";
import Layout from "@/components/layout";
import ScheduleForm from "@/components/scheduleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditHighlightPage (){
    const [HighlightInfo, setHighlightInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api//highlight?id='+id).then(response =>{
        setHighlightInfo(response.data);
    });
    }, [id]);
   
    return(

        <Layout>

    <center><h1 className="text-blue-900 italic bold">Edit section for Highlight sectionr</h1>
    </center>
    {HighlightInfo && (
         <HighlightForm {...HighlightInfo} />
    )}
           
        </Layout>
    );
}