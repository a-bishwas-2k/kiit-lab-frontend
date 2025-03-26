"use client"
import React, { useState } from 'react';
import { Search, Filter, Award, CheckCircle2, Circle, BarChart2, Tag, Clock, LogOut, LogIn } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  isCompleted: boolean;
  language: string;
}

function ListAllProblems({ data }: { data: Problem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const session = useSession();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  //   const problems: Problem[] = [
  //     {
  //       id: 1,
  //       title: "Two Sum",
  //       difficulty: "Easy",
  //       category: "Arrays",
  //       completed: true,
  //     //   acceptanceRate: 84.5,
  //       language: "1s"
  //     },
  //     {
  //       id: 2,
  //       title: "Longest Substring Without Repeating Characters",
  //       difficulty: "Medium",
  //       category: "Strings",
  //       completed: false,
  //     //   acceptanceRate: 76.2,
  //       language: "2s"
  //     },
  //     {
  //       id: 3,
  //       title: "Median of Two Sorted Arrays",
  //       difficulty: "Hard",
  //       category: "Arrays",
  //       completed: false,
  //     //   acceptanceRate: 45.8,
  //       language: "3s"
  //     },
  //     {
  //       id: 4,
  //       title: "Valid Parentheses",
  //       difficulty: "Easy",
  //       category: "Stacks",
  //       completed: true,
  //     //   acceptanceRate: 92.1,
  //       language: "1s"
  //     },
  //     {
  //       id: 5,
  //       title: "LRU Cache",
  //       difficulty: "Medium",
  //       category: "Design",
  //       completed: false,
  //     //   acceptanceRate: 68.4,
  //       language: "2s"
  //     }
  //   ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const filteredProblems = data.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-[#141313] w-full">
      {/* Header */}
      <div className="bg-[#141313] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-300">KIIT-LAB</h1>
            </div>
            {
              session.data?.user ? <div onClick={() => signOut()} className="flex items-center space-x-4 cursor-pointer">
                <LogOut className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Logout</span>
              </div> : <Link href="auth/login" className="flex items-center space-x-4 cursor-pointer">
                <LogIn className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Login</span>
              </Link>
            }
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 border border-gray-700 bg-[#141313] rounded-[5px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-700" />
            <select
              className="border border-gray-700  bg-[#141313] rounded-[5px] px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-[#141313] rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-[#141313]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              </tr>
            </thead>
            <tbody className="bg-[#141313] divide-y divide-gray-700">
              {data.map((problem) => (
                <tr key={problem.id} className="hover:bg-gray-700 cursor-pointer transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {problem.isCompleted ?
                      <CheckCircle2 className="h-5 w-5 text-green-500" /> :
                      <Circle className="h-5 w-5 text-gray-300" />
                    }
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`problems?problemId=${problem.id}`} className="text-sm font-medium text-gray-300">{problem.title}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Tag className="h-4 w-4 mr-1" />
                      {problem.category}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{problem.language}</div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141313] p-6 rounded-[5px] shadow border ">
            <div className="text-sm font-medium text-gray-500">Total Problems</div>
            <div className="mt-2 text-3xl font-semibold text-gray-400">{data.length}</div>
          </div>
          <div className="bg-[#141313] p-6 rounded-[5px] shadow border border-gray-700">
            <div className="text-sm font-medium text-gray-500">Problems Solved</div>
            <div className="mt-2 text-3xl font-semibold text-green-500">
              {data.filter(p => p.isCompleted).length}
            </div>
          </div>
          <div className="bg-[#141313] p-6 rounded-[5px] shadow border border-gray-700">
            <div className="text-sm font-medium text-gray-500">Completion Rate</div>
            <div className="mt-2 text-3xl font-semibold text-indigo-500">
              {Math.round((data.filter(p => p.isCompleted).length / data.length) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListAllProblems;