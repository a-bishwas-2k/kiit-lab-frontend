import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const Description = ({ description, title }: { description: string; title: string }) => {
  return (
    <div className="flex flex-col h-[95vh]">
      <div>
        <button className="text-white bg-[#1f1f1f] px-3 py-2 rounded-tr-md rounded-tl-md font-bold">
          Description
        </button>
      </div>

      <div className="p-5 bg-[#1f1f1f] h-full">
        <h1 className="py-2 text-2xl font-bold text-white">{title}</h1>
        <ReactMarkdown
          className="w-full bg-[#1f1f1f] text-white"
          components={{
            code: function Code(props) {
              const { children, inline, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");

              return inline ? (
                <code className="border px-2 py-1 border-[#585858] text-[#adadad] rounded-md" {...rest}>
                  {children}
                </code>
              ) : (
                <SyntaxHighlighter language={match ? match[1] : ""} style={oneDark}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
            li: function Li(props) {
              const { children, ...rest } = props;
              return (
                <li className="list-disc list-inside my-2" {...rest}>
                  {children}
                </li>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Description;
