'use client';
import { useState } from "react";
const  Home =()=> {
  const [state,setState]=useState('');
  console.log(state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <input className="h-[250px] w-[250px] " onChange={(e)=>setState(e.target.value)} value={state} type="file" accept="application/pdf"/>
    </main>
  );
}

export default Home;