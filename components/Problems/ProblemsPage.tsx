"use client"
import React, { useState } from 'react';
import { Search, Plus, Filter, Sidebar, CloudCog } from 'lucide-react';
import AddProblemModal from '@/components/Problems/AddProblemModel';
import ProblemPreview from './ProblemView';
import { toast } from 'react-toastify';
import { deleteProblem, viewProblem } from '@/ServerActions/actions';
import { updateToast } from '@/utils/tostify';
import { useSession } from 'next-auth/react';

function ProblemsPage({ data }: {
  data: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    status: string;
  }[]
}) {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentProblemId, setCurrentProblemId] = useState<string | null>(null);
  const [viewSubmission, setViewSubmission] = useState<any>(null);

  const onViewProblem = async (problemId: string) => {
    if (!problemId) return toast.error("Invalid Problem Id");
    const toastId = toast("Viewing Problem..");

    const status = await viewProblem(problemId, session?.id as string);
    setViewSubmission(status);
  }

  const onDeleteProblem = async (problemId: string) => {

    if (!problemId) return toast.error("Invalid Problem Id");
    const toastId = toast("Deleting Problem..");

    const status = await deleteProblem(problemId);
    if (status === 200) {
      return updateToast(toastId, "Problem Deleted Successfully", "success");
    }

    return updateToast(toastId, "Failed to delete problem", "error");
  }
  return (
    <div className='w-full h-full '>

      <main className="flex-1 overflow-y-auto ">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-200">Problems</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="pl-10 pr-4 py-2 rounded-[5px] border bg-transparent border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Problem
              </button>
            </div>
          </div>

          <div className="bg-[#141313] rounded-xl shadow-sm border border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-200">All Problems</h2>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">
                    {data.length} total
                  </span>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-800 rounded-lg transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-200">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-200">Difficulty</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-200">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-200">Status</th>
                    <th colSpan={2} className="text-center text-sm font-bold text-gray-200 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((problem, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-400">{problem.title}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : problem.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                            }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-400">{problem.category}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${problem.status === 'Active'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-400'
                            }`}
                        >
                          {problem.status}
                        </span>
                      </td>

                      <td className="text-right">
                        <button
                          onClick={() =>
                            onViewProblem(problem.id)
                          }
                          className="text-gray-200 p-1 bg-green-800 rounded-[5px]">View</button>
                      </td>
                      <td className="text-center">
                        <button onClick={() => onDeleteProblem(problem.id)} className="text-gray-200 p-1 bg-red-800 rounded-[5px]">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {viewSubmission?.code && (
        <pre className="p-4 rounded-xl overflow-x-auto text-sm">
          <code>{viewSubmission.code}</code>
        </pre>
      )}

      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => { }}
      />

      {
        currentProblemId && <ProblemPreview onClose={() => setCurrentProblemId(null)} problemId={currentProblemId} />
      }
    </div>
  );
}

export default ProblemsPage;
