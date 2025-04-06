import React, { useEffect, useState } from 'react'

import Split from 'react-split';
import CodeEditor from './CodeEditor/CodeEditor';
import Footer from './Footer/Footer';
import { getStatusMapToMessage, languageMapToCode, mapBoilerplateCodeToLanguage } from '@/utils/helper';
import { runCode, submitCode } from '@/ServerActions/actions';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { loadToast, updateToast } from '@/utils/tostify';




const Playground = ({ executionFunction, functionSignature, problemId, testCases, description, language }: {
    executionFunction: string
    problemId: string;

    description: string;
    functionSignature: string
    testCases: {
        input: string;
        expectedOutput: string;
        passed: boolean | null;
        output: undefined | string

    }[]
    language: string
}) => {

    const [TestCase, setTestCase] = useState<{
        input: string;
        expectedOutput: string;
        passed: boolean | null;
        output: undefined | string
    }[]>([]);

    const [code, setCode] = useState<string>(`${mapBoilerplateCodeToLanguage(language, functionSignature, executionFunction)}`);

    const [running, setRunning] = useState(false);

    const [message, setMessage] = useState<{
        compile_output: string;
        status: number
    }>({
        compile_output: "",
        status: 0
    });

    const session = useSession();

    const router = useRouter();


    const onRunCode = async () => {
        if (!problemId) return alert("Please select a problem first");
        const toastId = loadToast("Running Code..");

        setRunning(true);



        const res = await runCode({
            code: code,
            languageCode: languageMapToCode(language).toString(),
            problemId: problemId
        })

        const tCases = res.TestCasePassed;

        // const newTestCase = []
        console.log("tcase", tCases);

        updateToast(toastId, getStatusMapToMessage(res.status.id), res.status.id == 3 ? "success" : "error");

        if (tCases?.length > 0) {
            const newT = testCases.map((t, i) => {
                return {
                    ...t,
                    output: tCases[i].output,
                    passed: tCases[i].passed
                }
            })

            setTestCase(newT);
            setMessage({
                compile_output: res.compile_output,
                status: res.status.id
            })
            // console.log(newT,TestCase);
        } else {

            setTestCase([]);
            setMessage({
                compile_output: res.compile_output,
                status: res.status.id
            })
        }

        console.log(res);


    }

    const onSubmitCode = async () => {
        if (!problemId) return alert("Please select a problem first");
        if (!session.data?.id) return alert("Please login first");
        console.log("submitting code");
        const toastId = loadToast("Submitting Code..");

        console.log(code);

        const res = await submitCode({
            code: code,
            languageCode: languageMapToCode(language).toString(),
            problemId: problemId,
            userId: session.data.id
        });

        if (res.status == 422) {
            // alert("Compilation Error");
            updateToast(toastId, "Compilation Error", "error");
        } else if (res.status == 201) {
            updateToast(toastId, " All Test Case Passed & Code Submitted", "success");
            router.push("/")
            return
        } else {
            // alert("Something went wrong");
            updateToast(toastId, "Something went wrong", "error");
        }


        console.log(res);
    };



    return (

        <div className='flex flex-col h-[95vh] text-white  w-full'

        >

            <div>
                <button className='text-white bg-[#1f1f1f] px-3 py-2 rounded-tr-md rounded-tl-md  font-bold' >Code</button>
            </div>
            <Split className='h-full' direction='vertical' sizes={[50, 50]} minSize={50}>

                <CodeEditor code={code} setCode={setCode} executionFunction={executionFunction} functionSignature={functionSignature} problemId={problemId} testCases={TestCase.length > 0 ? TestCase : testCases} description={description} />

                <Footer running={running} message={message} testCases={TestCase.length > 0 ? TestCase : testCases} />

            </Split>


            <div className='flex justify-end gap-2 my-2 mr-2'>
                <button onClick={onRunCode} className='px-3 py-2 bg-yellow-800 hover:bg-yellow-900 rounded-md'>Run Code</button>
                <button onClick={onSubmitCode} className='px-3 py-2 bg-green-800 rounded-md hover:bg-green-900'>Submit</button>
            </div>

        </div>
    )
}

export default Playground
