import React from "react";
import Header from "../L-header/header";
import Tab from "../L-tab";
import Footer from "../footer/footer";
import { Container, Navbar } from 'react-bootstrap';
import ChatComponent from "../campaigns/chatbot";

function Home() {
  return (
    <>
    <div>
      <div className=" min-vh-100 ">
        <Navbar bg="light" variant="light" sticky="top">
          <Container>
          <div className="d-flex align-items-center">
          <div className="brand-text">
            SEVA
          </div>
        </div>
            <div>
              <Header />
            </div>
          </Container>
        </Navbar>
        <div className="home">
          <div>
            <Tab />
          </div>
        </div>
      </div>
      <div>
        <ChatComponent />
      </div>
      <Footer />
     </div>
    </>
  );
}

export default Home;
