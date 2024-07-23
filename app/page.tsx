import Image from "next/image";
import Search from "./components/Search";
import Popular from "./components/Popular";
import Closest from "./components/Closest";
import Planned from "./components/Planned";
import { currentUser } from "@clerk/nextjs/server";
import useFindUserLocation from "./hooks/useFindUserLocation";


export default async function Home() {

  const user = await currentUser();

  /** Show popular events */

  /** Show a few planned events */

  if(!user){
    return(
      <div>
         Something went wrong refresh app
      </div>
    )
  }

  return (
    <main className="flex h-screen flex-col items-center">
      <Search /> 
      <Popular />
      <Closest /> 
      <Planned user={user} />
    </main>
  );
}
