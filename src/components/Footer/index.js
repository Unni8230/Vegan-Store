import "./index.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <h2 className="footer-logo">🌱 Vegan Store</h2>
        <p className="footer-tagline">Fresh, local, and good for the planet.</p>
      </div>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">Cart</a>
      </div>

      <div className="footer-bottom">
        <p>
          Built with 💚 by Unni •{" "}
          <a href="https://github.com/Unni8230">GitHub</a>
        </p>
        <p>© {new Date().getFullYear()} Vegan Store. All rights reserved.</p>
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⬆️ Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
