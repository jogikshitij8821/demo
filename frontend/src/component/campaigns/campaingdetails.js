import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import CircularProgressBar from "../CircularProgress/CircularProgressBar";
import logger from "../../logger";
import DonationForm from "./donation";

const CampaignDetail = (props) => {
  const [campaign, setCampaign] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const apiurl = process.env.REACT_APP_API_BACKEND_URL;
  const defaultImageSrc =
    "https://lh3.googleusercontent.com/IxvpK1DMCJBF2wzINTMQeT1Iohg1mPvsK4aX9aNlNpisZZwenk1dpaYC1H2RIXrt3zmCS6e02fTPkok7-b9wjIDSQV3VfB1O6tAPbzvmG5hCfD7jcqoe7oZaXl2G0QKLzhbqnwwc";

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/campaigns/${props.campaign._id}`
        );
        logger.log("Fetching campaign details:", response);

        if (response.data) {
          const data = response.data;
          setCampaign(data);
        } else {
          logger.error("Failed to fetch campaign details");
        }
      } catch (error) {
        logger.error("Error:", error);
      }
    };

    fetchCampaignDetails();
  }, [props.campaign]);

  const closeModal = () => {
    setShowModal(false);
    props.onClose();
  };

  const openDonationForm = () => {
    setShowModal(false); // Close the modal
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }
  const today = new Date();
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const isCampaignActive = today >= startDate && today <= endDate;

  return (
    <div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-uppercase">
            {" "}
            campaignName-{campaign.campaignName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {campaign.campaignImage ? (
            <img
              src={`${apiurl}/${campaign.campaignImage}`}
              alt={campaign.campaignName}
              className="card-img-top img-fluid"
              onError={(e) => {
                e.target.src = defaultImageSrc;
              }}
            />
          ) : (
            <img
              src={defaultImageSrc}
              alt="Default Campaign Image"
              className="card-img-top img-fluid"
            />
          )}
          <div>
            <div>
              <div className="font-weight-bold text-center text-md">
                {campaign.campaignDescription}
              </div>
            </div>
          </div>

          {campaign.startDate && (
            <div>
              Start Date:{" "}
              {new Date(campaign.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          {campaign.endDate && (
            <div>
              End Date:{" "}
              {new Date(campaign.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          <div>Campaign Goal: {campaign.campaignGoal}</div>
          <div>Additional Details: {campaign.additionalDetails}</div>
          <div>Location: {campaign.location}</div>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <CircularProgressBar
                percentage={campaign.progress}
                goal={campaign.campaignGoal}
              />
            </div>
          </div>
          {isCampaignActive && (
            <Button>
              <DonationForm onClick={openDonationForm} />
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CampaignDetail;