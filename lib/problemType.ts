export interface TestCase {
    input: string;
    expectedOutput: string;
  }
  
  export interface Solution {
    language: string;
    template: string;
  }
  
  export interface ProblemFormData {
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    testCases: TestCase[];
    functionSignature: string;
    executionFunction: string;
    status: 'Active' | 'Draft' | 'Archived';
  }