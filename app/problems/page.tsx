import Workspace from '@/components/Workspace';
import { authOption } from '@/lib/AuthOption/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
// import Markdown from 'react-markdown';


const page = async ({
    searchParams
}: {
    searchParams: { problemId: string }
}) => {
    const session = await getServerSession(authOption);
    if (!session) return redirect("/auth/login");
    if (!searchParams.problemId) return null;

    const getProblem = await fetch(`${process.env.SERVER_URL}/app/getProblemById?problemId=${searchParams.problemId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    });

    if (!getProblem.ok) {
        console.log("Error fetching data");
        return null;
    }

    const resp = await getProblem.json();

    console.log(resp);




    return (


        <div>

            {
                resp && <Workspace language={resp.language} title={resp.title} description={resp.description} testCases={resp.testCases} problemId={resp.id} executionFunction={resp.executionFunction} functionSignature={resp.functionSignature} />
            }

        </div>
    )
}

export default page
