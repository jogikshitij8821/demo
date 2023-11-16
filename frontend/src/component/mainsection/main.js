import React from "react";
import '../styles/main.css';


function Main() {

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="main-title">
              Your Generosity, Their Brighter Tomorrow
            </div>
            <div className="main-description">
              As you extend your helping hand, you become a beacon of light, illuminating the lives of those in need. Together, we can continue to make a meaningful difference and build a world where everyone has the chance to thrive.
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="https://www.backabuddy.co.za/assets/images/donate_instantly.png"
              alt="Image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div className="main-banner container">
        <div className="col-md-4 col-sm-12">
          <div className="feature-text">Free promotional tools</div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="feature-text">Dedicated campaign manager</div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="feature-text">Withdraw money at any time</div>
        </div>
      </div>

      <div className="container mt-5 main-content">
        <div className="row">
          <div className="col-md-6 order-md-2">
            <div className="main-title">
              Facing Financial Challenges?
            </div>
            <ul className="main-description">
              <li>Depleted your financial resources?</li>
              <li>Exhausted your emergency savings?</li>
              <li>Appealed to friends and family for help?</li>
              <li>Still struggling to secure funds for your loved one's needs?</li>
            </ul>
          </div>
          <div className="col-md-6 order-md-1">
            <img
              src="https://media.istockphoto.com/id/1261900247/vector/financial-problems-and-bankruptcy-concept.jpg?s=612x612&w=0&k=20&c=RG_ord-XbPbTWPOtIlCSfpipm6WMMjQugwae4fNFxhM="
              alt="Image"
              className="img-fluid"
              width="370"
              height="300"
            />
          </div>
        </div>
      </div>

      <div className="container mt-3 text-center">
        <div className="row">
          <div className="col-md-12">
            <div className="sub-title">
              Start a free fundraiser on SEVA
            </div>
            <div className="sub-description">
              To raise money for your loved ones
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6">
            <div class="step text-center">
              <div>Step 1. Sign up for a SEVA account.</div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="step text-center">
              <div>Step 2. Create your fundraising campaign.</div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="step text-center">
              <div>Step 3. Share your campaign with friends and family.</div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="step text-center">
              <div>Step 4. Start raising funds and making a difference.</div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Main;