import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";


function MyProfile() {
  const user1 = useSelector((state) => state.mongodb.mongodbData);
  const user2 = useSelector((state) => state.google.googleData);
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="btn-lavender"
        style={{ cursor: 'pointer' }}
        onClick={handleShow}
      >
        <span className="bi bi-person-fill"></span> My Profile
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Username: {user1.username || user2.name  }</p>
          <p>Email: {user1.email || user2.email }</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyProfile;
