import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
         if (storedUser.email === email && storedUser.password === password) {
            navigate("/account");
         } else {
            alert("Invalid email or password");
         }
      } else {
         alert(" user not found. Please register first");
      }
   };

   return (
      <>
         <Container className="d-flex vh-100">
            <Row className="m-auto align-self-center w-100">
               <Col md="6" className="m-auto border border-5 p-3">
                  <h2 className="text-center mb-4">Login</h2>
                  <Form onSubmit={handleSubmit}>
                     <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                           type="email"
                           placeholder="Enter email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </Form.Group>

                     <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                     </Form.Group>

                     <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                     >
                        Login
                     </Button>
                     <div className="text-center">
                        <Link to="/signup">Sign Up</Link>
                     </div>
                  </Form>
               </Col>
            </Row>
         </Container>
      </>
   );
};

export default LoginForm;
