import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/nav";
import Layout from "@/components/layout";



export default function Home() { 
  const {data: session} = useSession();
   return(
    <Layout>
      <div className="text-black-900 flex justify-between">
    <h1>Welcome Back, <b>{session?.user?.name}</b></h1>
    <div className="flex bg-gray-300 gap-1  text-black rounded-lg overflow-hidden">
    

    </div>
      </div>
      </Layout>

   );

}