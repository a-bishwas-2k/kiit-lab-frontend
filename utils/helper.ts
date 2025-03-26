// export const mapBoilerplateCodeToLanguage = (
//   language: string,
//   functionSignature: string,
//   executionFunction: string
// ) => {
//   switch (language) {
//     case "cpp":
//       return `#include <iostream>;
// using namespace std;

// ${functionSignature}

// int main() {

// int t;
// cin>>t;
// while(t--){

//     ${executionFunction}
//     }

    
//     return 0;
// }

//     `;

//     case "c":
//       return `#include <stdio.h>
//       #include <string.h>

// ${functionSignature}

// int main() {
//   int t;
//     scanf("%d",&t);
// while(t--){

//     ${executionFunction}
//     }

    
//     return 0;
// }
//     `;
//   }
// };



export const mapBoilerplateCodeToLanguage = (
  language: string,
  functionSignature: string,
  executionFunction: string
) => {
  switch (language) {
    case "cpp":
      return `
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

${functionSignature}

int main() {
    int t;
    cin >> t;
    while (t--) {
        ${executionFunction}
    }
    return 0;
}
`;

    case "c":
      return `
#include <stdio.h>
#include <string.h>

${functionSignature}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ${executionFunction}
    }
    return 0;
}
`;

    case "java":
      return `
import java.util.*;

public class Main {
    ${functionSignature}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            ${executionFunction}
        }
    }
}
`;
    default:
      throw new Error("Unsupported language");
  }
};


export const getStatusMapToMessage=(status: number)=> {
  switch (status) {
    case 1:
      return 'In Queue';
    case 2:
      return 'Processing';
    case 3:
      return 'All Test Cases Passed Successfully';
    case 4:
      return 'Some Test Cases Failed';
    case 5:
      return 'Time Limit Exceed';
    case 6:
      return 'Compilation Error';
    case 7:
      return 'Time Limit Exceeded';
    case 8:
      return 'Memory Limit Exceeded';
    case 9:
      return 'Output Limit Exceeded';
    case 10:
      return 'Presentation Error';

      case 11:
        return "Runtime Error (NZEC)";

    default:
      return 'Unknown Error';
  }
}


export const languageMapToCode =(language: string)=> {
  switch (language) {
    case "cpp":
      return 54;
    case "c":
      return 75;
    case "java":
      return 62;
    default:
      return 75;
  }
}