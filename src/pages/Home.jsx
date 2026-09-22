import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-container">
      <div className="hero-grid">
        <div className="hero">
          <p className="hero-kicker">INTELLIGENT CODE QUALITY</p>
          <h1>Ship code with more confidence.</h1>
          <p className="hero-copy">
            Review code in seconds with practical AI feedback that helps you find bugs,
            improve clarity, and build better software.
          </p>
          <div className="hero-stats">
            <div><strong>01</strong><span>Paste your code</span></div>
            <div><strong>02</strong><span>Get clear feedback</span></div>
            <div><strong>03</strong><span>Improve your craft</span></div>
          </div>
        </div>

        <div className="home-buttons">
          <Link className="hero-primary" to="/register">Start reviewing code <span>→</span></Link>
          <Link className="hero-secondary" to="/login">Sign in</Link>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="showcase-window">
            <div className="window-bar"><span></span><span></span><span></span><em>review.js</em></div>
            <div className="code-lines">
              <p><i>01</i> <b>function</b> improveCode(input) {'{'}</p>
              <p><i>02</i> &nbsp; <b>return</b> reviewer.analyze(input);</p>
              <p><i>03</i> {'}'}</p>
              <p className="code-gap"><i>04</i></p>
              <p className="success-line"><i>05</i> <span>✓</span> 3 suggestions found</p>
            </div>
          </div>
          <div className="showcase-note"><span>✦</span><div><strong>Clear, actionable insights</strong><small>Built for better code</small></div></div>
        </div>
      </div>
    </main>
  );
}

export default Home;