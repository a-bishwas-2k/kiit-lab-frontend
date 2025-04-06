"use server";

import { revalidateTag } from "next/cache";


export const addQuestion = async (question: any) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/createProblem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        });

        console.log(res.status);

        if (res.ok) {
            revalidateTag("getProblems");
        }

        return res.status;
    } catch (error) {
        console.log(error);
        return 500;
    }
}


export const runCode = async (data: {
    code: string;
    languageCode: string;
    problemId: string;
}) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/runCode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            return data;
        }

        console.log(res);
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const submitCode = async (data: {
    code: string;
    languageCode: string;
    problemId: string;
    userId: string
}) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/submitCode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            return {
                data: data,
                status: res.status
            };
        }

        return {
            status: res.status,
            data: null
        };

        // if(res.ok){
        //     const data = await res.json();
        //     console.log(data);
        //     return data;
        // }

        // console.log(res);
        // return null;
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: null
        };
    }



}

export const previewProblem = async (problemId: string) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/getProblemsPreview?problemId=${problemId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("! ", data);
            return data;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const viewProblem = async (problemId: string, userId: string) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/getSubmissionById?submissionId=${problemId}&userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteProblem = async (problemId: string) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/deleteProblem?problemId=${problemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            revalidateTag("getProblems");
        }

        return res.status;
    } catch (error) {
        console.log(error);
        return 500;
    }
}
