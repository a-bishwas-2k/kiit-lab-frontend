import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProblemFormData } from '@/lib/problemType';
import { Editor } from '@monaco-editor/react';




import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loadToast, updateToast } from "@/utils/tostify";
import test from "node:test";

import { addQuestion } from "@/ServerActions/actions";
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

const problemSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    category: z.string().min(1, 'Category is required'),
    testCases: z.array(z.object({
        input: z.string().min(1, 'Input is required'),
        expectedOutput: z.string().min(1, 'Output is required'),

    })).min(1, 'At least one test case is required'),
    functionSignature: z.string().min(1, 'Function Signature is required'),
    executionFunction: z.string().min(1, 'Execution Function is required'),

    status: z.enum(['Active', 'Draft', 'Archived']),
    language: z.enum(['c', 'cpp', 'java']),

    // timeLimit: z.number().min(1).max(10),
    // memoryLimit: z.number().min(128).max(512),
});

interface AddProblemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (problem: ProblemFormData) => void;
}

const AddProblemModal: React.FC<AddProblemModalProps> = ({ isOpen, onClose, onSubmit }) => {
    // const {
    //     register,
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm<ProblemFormData>({
    //     resolver: zodResolver(problemSchema),
    //     defaultValues: {
    //         difficulty: 'Easy',

    //         testCases: [{ input: '', output: '' }],
    //         category:'Array',
    //         status:'Draft',
    //         functionSignature:'',
    //         executionFunction:'',
    //     },
    // });

    const form = useForm<z.infer<typeof problemSchema>>({
        resolver: zodResolver(problemSchema),
        defaultValues: {
            difficulty: 'Easy',
            testCases: [{ input: '', expectedOutput: '' }],
            category: 'Array',
            status: 'Draft',
            functionSignature: '',
            executionFunction: '',
        },
    });


    const {
        fields: testCaseFields,
        append: appendTestCase,
        remove: removeTestCase,
    } = useFieldArray({
        control: form.control,
        name: 'testCases',
    });


    const { control, handleSubmit } = form;
    // const { fields: testCaseFields, append: appendTestCase, remove: removeTestCase } = useFieldArray({
    //     control,
    //     name: "testCases",
    // });

    // const {
    //     fields: solutionFields,
    //     append: appendSolution,
    //     remove: removeSolution,
    // } = useFieldArray({
    //     control,
    //     name: 'solutions',
    // });

    const onFormSubmit =async (data: ProblemFormData) => {
        console.log("hello", data);
        // onSubmit(data);

        const toastId = loadToast("Adding Question..");
        const status = await addQuestion(data);

        if(status === 201){
            updateToast(toastId, "Question Added Successfully", "success");
            // form.reset();
            onClose();
        }
        else{
            updateToast(toastId, "Failed to add Question", "error");
        }
     
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#141313] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-300">Add New Problem</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>



                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onFormSubmit)}
                        className="space-y-3 p-4 border border-gray-600 rounded-md"
                    >
                        {/* <div className="flex flex-col gap-2">
                            <p className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient mb-2">
                                Premium Subscription (Rs. / Semetser)
                            </p>
                            <p className="text-muted-foreground">
                                We are not asking for large amount. We have to run the server
                                which is more costly.So get the subscription at just{" "}
                                <span className="text-green-500"> Rs  Per Semester.</span>
                            </p>
                        </div> */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Problem Statement.."
                                            {...field}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                        
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description Here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        
       <div className='grid grid-cols-2 gap-2'>
       <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Difficulty Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select difficulty Level</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />

       </div>

       <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="c">C</SelectItem>
                                                <SelectItem value="cpp">C++</SelectItem>
                                                <SelectItem value="java">Java</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />



       <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium">Test Cases</FormLabel>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => appendTestCase({ input: "", expectedOutput: ""})}
                        className="flex items-center gap-1"
                    >
                        <Plus className="h-4 w-4" />
                        Add Test Case
                    </Button>
                </div>

                <div className="space-y-4">
                    {testCaseFields.map((field, index) => (
                        <Card key={field.id} className="p-4">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-medium">
                                    Test Case #{index + 1}
                                </CardTitle>
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeTestCase(index)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <FormField
                                    control={control}
                                    name={`testCases.${index}.input`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Input</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Input" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`testCases.${index}.expectedOutput`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Output</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Output" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                             
                            </CardContent>
                        </Card>
                    ))}
                </div>
                      


                        <FormField
                            control={form.control}
                            name="functionSignature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Function Signature:</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder="Function signature here" {...field} /> */}

                                        <Editor
                                        // className=''
                                            height="20vh"
                                            onChange={field.onChange}
                                            value={field.value}
                                            defaultLanguage="c"
                                            defaultValue="// some comment"

                                            theme='vs-dark'

                                            

                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        
                      
                       



                        {/* <FormField
                            control={form.control}
                            name="test"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>TestCase Input -1:</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="T-1 input" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                     




                        <FormField
                            control={form.control}
                            name="executionFunction"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Execution Function</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder="Execution Function..." {...field} /> */}

                                        <Editor
                                            height="20vh"
                                            onChange={field.onChange}
                                            value={field.value}
                                            defaultLanguage="c"
                                            defaultValue="// some comment"
                                            theme='vs-dark'

                                        />




                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />



<FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Draft">Draft</SelectItem>
                                                <SelectItem value="Archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />



                        <button
                            type="submit"
                            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-100 bg-green-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700     inline-flex items-center"
                        >
                            Add Question
                        </button>
                    </form>
                </Form>












            </div>
        </div>
    );
};

export default AddProblemModal;