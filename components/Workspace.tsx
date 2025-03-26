"use client"
import { runCode } from '@/ServerActions/actions';
import { mapBoilerplateCodeToLanguage } from '@/utils/helper';
import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw';

import Split from 'react-split';
import Playground from './Playground/Playground';
import Description from './Description/Description';

const Workspace = ({ executionFunction, functionSignature,problemId,testCases,description,title,language }: {
    executionFunction:string,
    title:string;
    problemId: string;
    description: string;
    language:string
    
    functionSignature: string,
    testCases: {
        input: string;
        expectedOutput: string;
        passed: boolean|null;
        output:undefined|string

    }[]
}) => {



    const mark = 'Given an array of integers \`\`\` nums \`\`\` and an integer `target`, returnindices of the two numbers such that they add up to `target`'
    return (
        // <div className='bg-[#1f1f1f] text-white'>

       


        //   


        //     <button onClick={onSubmit}>Submit</button>

        // </div>

        <Split className='split'>

            <Description title={title} description={description} />

  

<Playground language={language}  executionFunction={executionFunction} functionSignature={functionSignature} problemId={problemId} testCases={testCases} description={description} />

        </Split>
    )
}

export default Workspace
