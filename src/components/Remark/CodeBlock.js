import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ children }) => {
  debugger;
  return (
    <SyntaxHighlighter showLineNumbers language="javascript">
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
