import { useState } from "react";

import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";

import { reviewCodeAPI } from "../services/api";

function Dashboard() {

  const [code, setCode] = useState("");

  const [review, setReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const reviewCode = async () => {

    if (!code.trim()) {
      setStatusMessage("Add some code before requesting a review.");
      return;
    }

    setStatusMessage("");
    setIsReviewing(true);
    try {

      const result = await reviewCodeAPI(code);

      setReview(result.review);
      setStatusMessage("Review complete. Your feedback is ready.");

    } catch (error) {
      console.log(error);
      setStatusMessage("We could not complete the review. Please try again.");
    } finally {
      setIsReviewing(false);

    }

  };

  const clearCode = () => {

    setCode("");

    setReview("");
    setStatusMessage("");
    setCopyStatus("");

  };

  const copyCode = async () => {
    if (!code.trim()) {
      setCopyStatus("There is no code to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("Code copied.");
    } catch {
      setCopyStatus("Copy failed. Please select the code manually.");
    }

  };

  return (

    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="history-eyebrow">CODE WORKSPACE</p>
          <h1>Review your code</h1>
          <p>Paste a snippet and get focused feedback on quality, bugs, and performance.</p>
        </div>
        <div className={`workspace-status ${isReviewing ? "is-busy" : ""}`}><span></span>{isReviewing ? "Reviewing code..." : "Ready to review"}</div>
      </header>

      <div className="editor-section">

        <div className="editor-box">

          <div className="panel-title"><span className="panel-icon">&lt;/&gt;</span><div><h2>Code editor</h2><span>Write or paste your code</span></div></div>

          <CodeEditor

            code={code}

            setCode={setCode}

          />

        </div>

        <div className="review-box">

          <div className="panel-title"><span className="panel-icon review-panel-icon">✦</span><div><h2>Review result</h2><span>AI-powered suggestions</span></div></div>

          <ReviewPanel

            review={review}

          />

        </div>

      </div>

      <div className="workspace-feedback" role="status" aria-live="polite">
        {statusMessage && <span>{statusMessage}</span>}
        {copyStatus && <span>{copyStatus}</span>}
      </div>

      <div className="button-group">

        <button onClick={reviewCode} disabled={isReviewing}>

          {isReviewing ? "Reviewing..." : "Review code"}

        </button>

        <button onClick={clearCode}>

          Clear

        </button>

        <button onClick={copyCode}>

          Copy

        </button>

      </div>

    </main>

  );

}

export default Dashboard;