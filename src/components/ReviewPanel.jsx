import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ReviewPanel({ review }) {
  const [copyMessage, setCopyMessage] = useState("");

  return (
    <div className="review-panel" aria-live="polite">

      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  const code = String(children).replace(/\n$/, "");

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyMessage("Code copied.");
    } catch {
      setCopyMessage("Copy failed.");
    }
  };

  if (!inline && match) {
    return (
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <button
  onClick={copyCode}
  title="Copy code"
      aria-label="Copy code block"
      className="review-copy-button"
  style={{
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "38px",
    height: "38px",
    border: "none",
    borderRadius: "10px",
    background: "#2f3136",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    transition: "0.2s",
    zIndex: 100,
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = "#40444b";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = "#2f3136";
  }}
>
  📋
</button>

        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          showLineNumbers
          wrapLongLines
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
},
        }}
      >
        {review}
      </Markdown>

      {copyMessage && <p className="copy-message" role="status">{copyMessage}</p>}

    </div>
  );
}

export default ReviewPanel;