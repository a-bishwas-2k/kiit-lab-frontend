import ProblemsPage from '@/components/Problems/ProblemsPage'
import React from 'react'

const page = async () => {
    let data;
    try {

        const getProblem = await fetch(`${process.env.SERVER_URL}/app/getProblems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache",
            next: {
                tags: ["getProblems"]
            }
        });

        data = await getProblem.json();
        console.log(data);
    } catch (error) {
        console.log("Error fetching data", error);
        return null;
    }



    return (
        <div className='w-full h-full'>

            <ProblemsPage data={data} />

        </div>
    )
}

export default page;
