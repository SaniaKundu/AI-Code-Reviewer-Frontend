function CodeEditor({ code, setCode }) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Paste your code here..."
      className="editor"
    />
  );
}

export default CodeEditor;