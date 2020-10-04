import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedLight,
  dracula,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeBlock = ({ children }) => {
  return (
    <SyntaxHighlighter showLineNumbers language="javascript" style={dracula}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
