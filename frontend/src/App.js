import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./component/login/login";
import Signup from "./component/login/signup";
import MyProfile from "./component/L-header/myprofile";
import Home from "./component/Home/home";
import Google from "./component/usermanagement/Google";
import LandingPage from "./component/main/landingpage";
import ContactUs from "./component/footer/Contactus"
import AboutUs from "./component/footer/Aboutus";
import DonationForm from "./component/campaigns/donation";
import CampaignDetail from "./component/campaigns/campaingdetails";
import TransactionHistory from "./component/campaigns/TransactionHistory";
import CampaignList from "./component/campaigns/campainglist";
import CampaignCreationForm from "./component/campaigns/campaigncreate";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Donation" element={<DonationForm />} />
          <Route path="donation" element={<DonationForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/google" element={<Google />} />
          <Route path="/home" element={<Home />}>
            <Route path="campaignList" element={<CampaignList />} />
            <Route path="createCampaign" element={<CampaignCreationForm />} />
            <Route path="transactionHistory" element={<TransactionHistory />} />
          </Route>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/campaigndetails/:campaignId" element={<CampaignDetail />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
