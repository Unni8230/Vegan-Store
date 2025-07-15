import { Component } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import PageWrapper from "../PageWrapper/PageWrapper";
import { Link } from "react-router-dom";
import "./index.css";

const imageVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
  };

  updateUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  updatePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const credentials = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };
    const loginResponse = await fetch(
      "http://localhost:5000/api/user",
      options
    );
    const loginData = await loginResponse.json();
    if (loginData.success === false) {
      this.setState({
        errorMsg: loginData.error,
      });
    } else {
      const jwtToken = loginData.jwt_token;
      Cookies.set('jwt_token', jwtToken, {expires: 3});
    }
  };

  render() {
    const { errorMsg, username, password } = this.state;
    return (
      <PageWrapper>
        <div className="login-bg-container">
          <div className="login-container">
            <motion.div
              className="login-left-image"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <div className="right-section">
              <img
                src="/images/VS_logo.jpg"
                alt="Vegan store Logo"
                className="logo"
              />
              <h2>
                Welcome to <span>Vegan Store</span>
              </h2>
              <p className="instructions">
                Please fill in your credentials to log in.
              </p>

              <form onSubmit={this.submitForm}>
                <input
                  type="text"
                  value={username}
                  onChange={this.updateUsername}
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={this.updatePassword}
                  placeholder="Password"
                  required
                />
                <button type="submit">Log in</button>
                <p className="error-msg">{errorMsg}</p>
                <div className="signup-prompt">
                  New here? <Link to="/register">Click here to register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
export default Login;
