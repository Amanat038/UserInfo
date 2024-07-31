import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
   const [isLogin, setIsLogin] = useState(false);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const navigate = useNavigate();

   // handle login
   const loginHandler = () => {
      setIsLogin(!isLogin);
      setError({
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      });
   };

   // handle login or registration logic
   const handleSubmit = (e) => {
      // Registration logic

      e.preventDefault();

      // Clear previous errors
      setError({
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      });

      if (!isLogin) {
         let validate = true;

         // check if the name is valid
         if (name.trim() === "") {
            setError((pre) => ({ ...pre, name: "name is required" }));
            validate = false;
         }

         // check if the email is valid
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if (!emailRegex.test(email)) {
            setError((prev) => ({ ...prev, email: "Email is not valid" }));
            validate = false;
         }

         // Check if the password is valid
         if (password.length < 6) {
            setError((prev) => ({
               ...prev,
               password: "Password must be at least 6 characters",
            }));
            validate = false;
         }

         // check if the confirm password is correct
         if (password !== confirmPassword) {
            setError((prev) => ({
               ...prev,
               confirmPassword: "Passwords do not match",
            }));
            validate = false;
         }

         if (!validate) return;
         else {
            const user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));
            console.log("Registration:", user);

            setIsLogin(!isLogin);
         }
      } else {
         // Login logic

         e.preventDefault();

         const storedUser = JSON.parse(localStorage.getItem("user"));
         let validate = true;

         // check if the email is valid
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if (!emailRegex.test(email)) {
            setError((prev) => ({ ...prev, email: "Email is not valid" }));
            validate = false;
         }

         // Check if the password is valid
         if (password.length < 6) {
            setError((prev) => ({
               ...prev,
               password: "Password must be at least 6 characters",
            }));
            validate = false;
         }

         // check if the confirm password is correct
         if (password !== confirmPassword) {
            setError((prev) => ({
               ...prev,
               confirmPassword: "Passwords do not match",
            }));
            validate = false;
         }

         if (!validate) return;

         if (storedUser) {
            if (
               storedUser.email === email &&
               storedUser.password === password
            ) {
               navigate("/account");
            } else {
               alert("Invalid email or password");
            }
         } else {
            alert("No user found. Please register first");
         }
      }
   };

   return (
      <Container>
         <Row className="justify-content-md-center mt-5">
            <Col
               md="6"
               className="box border border-10 p-4 shadow-lg rounded-4"
            >
               <h2 className="text-center mb-4">
                  {isLogin ? "Login" : "Signup"}
               </h2>
               <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                     <Form.Group controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Full Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="custom-input"
                        />
                        {error && (
                           <div className="text-danger">{error.name}</div>
                        )}
                     </Form.Group>
                  )}

                  <Form.Group controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                     />
                     {error && <div className="text-danger">{error.email}</div>}
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input"
                     />
                     {error && (
                        <div className="text-danger">{error.password}</div>
                     )}
                  </Form.Group>

                  <Form.Group controlId="formBasicConfirmPassword">
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="custom-input"
                     />
                     {error && (
                        <div className="text-danger">
                           {error.confirmPassword}
                        </div>
                     )}
                  </Form.Group>

                  <Button
                     variant="primary"
                     type="submit"
                     className="w-100 my-4"
                  >
                     {!isLogin ? "Signup " : "Login"}
                  </Button>

                  <div className="text-center">
                     <p>
                        {isLogin ? "New User? " : " Already have an account?"}
                        <span
                           onClick={loginHandler}
                           className="cursor text-primary"
                        >
                           {isLogin ? "SignUp " : "Login"}
                        </span>
                     </p>
                  </div>
               </Form>
            </Col>
         </Row>
      </Container>
   );
};

export default RegistrationForm;
