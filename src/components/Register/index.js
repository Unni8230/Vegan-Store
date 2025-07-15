import { Component } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../PageWrapper/PageWrapper";
import { Navigate } from "react-router-dom";
import "./index.css";

const imageVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    errorMsg: "",
    redirectToLogin: false,
  };

  updateName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  updateUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  updateEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  updatePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  updateConfirmPassword = (event) => {
    this.setState({
      confirmPass: event.target.value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { name, username, email, password, confirmPass } = this.state;
    if (password !== confirmPass) {
      this.setState({
        errorMsg: "Passwords do not match",
      });
    } else {
      const userDetails = { name, username, email, password };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const userRegisterResponse = await fetch(
        "http://localhost:5000/api/user/register",
        options
      );
      const userRegisterData = await userRegisterResponse.json();
      if (userRegisterData.success === false) {
        this.setState({
          errorMsg: userRegisterData.error,
        });
      } else {
        this.setState({
          redirectToLogin: true,
        });
      }
    }
  };

  render() {
    const { name, username, email, password, confirmPass, errorMsg } =
      this.state;
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" replace />;
    }

    return (
      <PageWrapper>
        <div className="register-bg-container">
          <div className="register-container">
            <motion.div
              className="register-top-sm-image"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <div className="left-section">
              <h2>
                Welcome to <span>Vegan Store</span>
              </h2>
              <form onSubmit={this.submitForm}>
                <input
                  type="text"
                  onChange={this.updateName}
                  placeholder="Fullname"
                  value={name}
                  required
                />
                <input
                  type="text"
                  onChange={this.updateUsername}
                  placeholder="Choose a username"
                  value={username}
                  required
                />
                <input
                  type="email"
                  onChange={this.updateEmail}
                  placeholder="Email"
                  value={email}
                  required
                />
                <input
                  type="password"
                  onChange={this.updatePassword}
                  minLength={8}
                  placeholder="Password"
                  value={password}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.updateConfirmPassword}
                  value={confirmPass}
                  minLength={8}
                  required
                />
                <button type="submit">Register</button>
                <p className="error-msg">{errorMsg}</p>
              </form>
            </div>
            <motion.div
              className="register-right-image"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>
      </PageWrapper>
    );
  }
}
export default Register;
