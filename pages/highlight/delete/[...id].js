import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DeleteHighlightPage(){
    const router = useRouter();
    const [highlightInfo,setHighlightInfo] = useState();
    const {id} = router.query;
    useEffect(() =>{
        if (!id) {
            return;
        }
        axios.get('/api/highlight?id='+id).then(response =>{
            setHighlightInfo(response.data);
        });
    }, [id]);
    function goBack(){
        router.push('/highlight');
    }
    async function deleteHighlight(){
        await axios.delete('/api/highlight?id='+id);
        goBack();
    }
    return(
<Layout>
    <h1 className="text-center"> Do you really want to delete <b>{highlightInfo?.title}</b>?</h1>
    <div className="flex gap-2 justify-center">
    <button onClick={deleteHighlight} className="btn-red">Yes</button>
    <button onClick={goBack} className="btn-default">No</button>
    </div>
    
    

</Layout>
    )
}