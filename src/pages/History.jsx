import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/history`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setReviews(response.data.reviews);
    } catch {
      setErrorMessage("We could not load your review history.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="history-container">
      <section className="history-hero">
        <div>
          <p className="history-eyebrow">YOUR WORKSPACE</p>
          <h1>Review history</h1>
          <p className="history-intro">
            Revisit your previous code reviews and keep your improvements moving forward.
          </p>
        </div>
        <div className="history-count" aria-label={`${reviews.length} saved reviews`}>
          <strong>{reviews.length}</strong>
          <span>saved {reviews.length === 1 ? "review" : "reviews"}</span>
        </div>
      </section>

      {isLoading ? (
        <div className="history-empty history-loading" role="status">
          <div className="loading-spinner" aria-hidden="true"></div>
          <h2>Loading your reviews</h2>
          <p>Fetching your saved code reviews...</p>
        </div>
      ) : errorMessage ? (
        <div className="history-empty" role="alert">
          <div className="empty-icon" aria-hidden="true">!</div>
          <h2>History is unavailable</h2>
          <p>{errorMessage}</p>
          <button className="retry-button" onClick={fetchHistory}>Try again</button>
        </div>
      ) : reviews.length === 0 ? (
        <div className="history-empty">
          <div className="empty-icon" aria-hidden="true">↗</div>
          <h2>No review history yet</h2>
          <p>Your completed reviews will appear here when you submit code.</p>
        </div>
      ) : (
        <section className="history-list" aria-label="Saved code reviews">
          {reviews.map((item, index) => (
            <article key={item._id} className="history-card">
              <div className="history-card-header">
                <div>
                  <p className="review-label">CODE REVIEW {String(index + 1).padStart(2, "0")}</p>
                  <h2>Review #{index + 1}</h2>
                </div>
                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleString()}
                </time>
              </div>

              <div className="review-columns">
                <section className="review-section">
                  <div className="section-heading">
                    <span className="section-icon code-icon" aria-hidden="true">&lt;/&gt;</span>
                    <h3>Source code</h3>
                  </div>
                  <pre className="code-block">{item.code}</pre>
                </section>

                <section className="review-section">
                  <div className="section-heading">
                    <span className="section-icon ai-icon" aria-hidden="true">✦</span>
                    <h3>AI review</h3>
                  </div>
                  <pre className="review-block">{item.review}</pre>
                </section>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default History;