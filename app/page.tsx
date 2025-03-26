
import ListAllProblems from "@/components/Problems/ListAllProblems";
import { authOption } from "@/lib/AuthOption/authOptions";
import { getServerSession } from "next-auth";

const options = {
  selectOnLineNumbers: true,
  fontSize: 16,
  minimap: {
    enabled: false,
  },
}

export default async function Home() {



  const session  = await getServerSession(authOption);
  console.log(session);


  const getProblem = await fetch(`${process.env.SERVER_URL}/app/getProblems?userId=${session?.id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    cache: "no-cache",
    next:{
        tags: ["getProblems"]
    }


});

const data = await getProblem.json();

console.log(data)




  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  w-full">


      

<ListAllProblems data={data}/>

 {/* <AddQuestion/> */}

 {/* <Login/> */}

     
    </main>
  );
}
