import './index.css';

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
        <a href="/about">About Us</a>
      </div>

      <div className="footer-bottom">
        <p>
          Built with 💚 by Unni • <a href="https://github.com/Unni8230">GitHub</a>
        </p>
        <p>© {new Date().getFullYear()} Vegan Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;