import React, { useState } from "react";
import Header from "../header/header";
import Main from "../mainsection/main";
import Review from "../reviewsection/reviewsection";
import Footer from "../footer/footer";
import ChatComponent from "../campaigns/chatbot";
import '../styles/landingpage.css';

function LandingPage() {
    const [loading, setLoading] = useState(false);
    // Function to set the loading state
    const setLoadingState = (isLoading) => {
        setLoading(isLoading);
    };

    return (
        <>
            <div className="landing-page-container">
                <Header setLoadingState={setLoadingState} /> {/* Pass setLoadingState to Header */}
                {loading ? (
                    <div className="loading-indicator">
                        Loading...</div> // Conditionally render a loading indicator
                ) : (
                    <>
                        <Main />
                        <Review />
                        <ChatComponent />
                        <Footer />
                    </>
                )}
            </div>
        </>
    );
}

export default LandingPage;
