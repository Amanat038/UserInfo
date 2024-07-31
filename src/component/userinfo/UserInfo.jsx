import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import {
   FaUser,
   FaEdit,
   FaEnvelope,
   FaLock,
   FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
   // fetch user  store in local storage
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const navigate = useNavigate();

   // if user is not found in local storage then create a new one
   useEffect(() => {
      if (!storedUser) {
         navigate("/");
      }
   }, [navigate, storedUser]);

   const [name, setName] = useState(storedUser ? storedUser.name : "");
   const [email, setEmail] = useState(storedUser ? storedUser.email : "");
   const [password, setPassword] = useState(
      storedUser ? storedUser.password : ""
   );
   const [showModal, setShowModal] = useState(false);

   // handle Update
   const handleUpdate = (e) => {
      e.preventDefault();

      const updatedUser = { name, email, password };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("Account updated:", updatedUser);
      alert("Account information updated successfully");
      setShowModal(false);
   };

   // handle Edit Account
   const handleEditClick = () => {
      setShowModal(true);
   };

   // handle Logout Click
   const handleLogOutClick = () => {
      localStorage.removeItem("user");
      navigate("/");
   };

   // handle Close modal Click
   const handleClose = () => {
      setShowModal(false);
   };

   return (
      <Container>
         <Row className="justify-content-md-center mt-5">
            <Col xs={12}>
               <div className="w-100 bg-warning border border-3 d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                     <FaUser className="text-white mr-3" size={24} />
                     <h3 className="text-white mb-0">User Information</h3>
                  </div>
                  <div className="d-flex">
                     <Button
                        className="btn btn-primary d-flex align-items-center mr-2"
                        onClick={handleEditClick}
                     >
                        <FaEdit className="mr-2" size={16} />
                        Edit
                     </Button>
                     <Button
                        className="btn btn-danger d-flex align-items-center"
                        onClick={handleLogOutClick}
                     >
                        <FaSignOutAlt className="mr-2" size={16} />
                        Log Out
                     </Button>
                  </div>
               </div>
            </Col>
         </Row>

         {storedUser && (
            <Row className="justify-content-md-center mt-4">
               <Col md={8}>
                  <div className="bg-light p-4 border rounded">
                     <Row className="mb-3">
                        <Col xs={2}>
                           <FaUser size={32} />
                        </Col>
                        <Col>
                           <h5 className="mb-0">Name:</h5>
                           <p className="text-muted">{storedUser.name}</p>
                        </Col>
                     </Row>
                     <Row className="mb-3">
                        <Col xs={2}>
                           <FaEnvelope size={32} />
                        </Col>
                        <Col>
                           <h5 className="mb-0">Email:</h5>
                           <p className="text-muted">{storedUser.email}</p>
                        </Col>
                     </Row>
                     <Row className="mb-3">
                        <Col xs={2}>
                           <FaLock size={32} />
                        </Col>
                        <Col>
                           <h5 className="mb-0">Password:</h5>
                           <p className="text-muted">{storedUser.password}</p>
                        </Col>
                     </Row>
                  </div>
               </Col>
            </Row>
         )}

         <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit User Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleUpdate}>
                  <Form.Group controlId="formName">
                     <Form.Label>Name:</Form.Label>
                     <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                     <Form.Label>Email:</Form.Label>
                     <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                     <Form.Label>Password:</Form.Label>
                     <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                     Save Changes
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </Container>
   );
};

export default AccountPage;
