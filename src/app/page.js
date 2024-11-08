import { fetchAuthUserAction } from "@/actions";
import LogOut from "@/components/log-out";

import { redirect } from "next/navigation";

import Image from "next/image";

export default async function Home() {
  const currentUser =await fetchAuthUserAction();
  console.log(currentUser);
  if(!currentUser?.success) redirect("/sign-in");
  return (
   <div>
    <h1>Next js Authentication</h1>
    <h1>{currentUser?.data?.userName}</h1>
    <p>{currentUser?.data?.email}</p>
    <LogOut/>
   </div>
  );
}
