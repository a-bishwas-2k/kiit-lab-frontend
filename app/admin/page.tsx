import ProblemsPage from '@/components/Problems/ProblemsPage'
import React from 'react'

const page = async() => {

    const getProblem = await fetch(`${process.env.SERVER_URL}/app/getProblems`, {
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
    console.log(data);



  return (
    <div className='w-full h-full'>

        <ProblemsPage  data={data} />
      
    </div>
  )
}

export default page
