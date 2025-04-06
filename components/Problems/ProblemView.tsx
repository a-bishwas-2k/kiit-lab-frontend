import React, { useEffect, useState } from 'react';
import { X, Users,  Clock, BarChart2 } from 'lucide-react';
import { previewProblem } from '@/ServerActions/actions';
import Image from 'next/image';


const completedUsers = [
  { id: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
  { id: 2, name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 3, name: "Mike Peters", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
];

// id String @id @default(auto()) @map("_id") @db.ObjectId
// title String
// description String
// difficulty String
// category String
// status String
// functionSignature String
// testCases  TestCases[] 
// executionFunction String
// completedBy String[]
// language String
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt

export default function ProblemPreview({ problemId, onClose }: {
   problemId: string;
    onClose: () => void;


}) {

 
 const [problem, setProblem] = useState<{

    id: string;
    title: string;
    difficulty: string;
    description: string;
    category: string;
    language: string;
    createdAt: string;
    updatedAt: string;
 }>();

 const getProblem = async (problemId: string) => {

  const data = await previewProblem(problemId);
  console.log(data);
  return data;
 }
   
    useEffect(() => {
        // console.log(problemId);
        getProblem(problemId).then((data) => {
            console.log(data);
            setProblem(data);
        });
    },[problemId])


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{problem?.title}</h2>
          <div className="mt-2 flex items-center space-x-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${problem?.difficulty === 'Easy' ? 'text-green-500 bg-green-50' :
                problem?.difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-50' :
                'text-red-500 bg-red-50'}`}>
              {problem?.difficulty}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {problem?.language}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <BarChart2 className="h-4 w-4 mr-1" />
              {problem?.createdAt}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Problem Description</h3>
            <p className="text-gray-600">
              {problem?.description || "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice."}
            </p>

            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Recently Completed By
              </h3>
              <div className="flex flex-wrap gap-4">
                {completedUsers.map(user => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}