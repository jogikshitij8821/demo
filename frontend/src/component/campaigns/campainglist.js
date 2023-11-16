import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CampaignCard from "./campaingcards";
import CampaignDetail from "./campaingdetails";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import logger from "../../logger";
import 'react-chat-widget/lib/styles.css';
 



const CampaignList = () => { // State and variables
  const [campaigns, setCampaigns] = useState([]);
  const currentDate = new Date();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // const user1 = useSelector((state) => state?.auth?.user?.token);
  const defaultImageSrc = "https://lh3.googleusercontent.com/IxvpK1DMCJBF2wzINTMQeT1Iohg1mPvsK4aX9aNlNpisZZwenk1dpaYC1H2RIXrt3zmCS6e02fTPkok7-b9wjIDSQV3VfB1O6tAPbzvmG5hCfD7jcqoe7oZaXl2G0QKLzhbqnwwc";
  const itemsPerPage = 9;  //item to display per page
  const [currentPage, setCurrentPage] = useState(0);  //current page
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  //fetching campaigns from backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${apiurl}/campaigns`);
        logger.log("response", response)

        if (response) {
          const data = await response.data;
          logger.log("Fetched campaign data:", data);
          setCampaigns(data);
        } else {
          logger.error("Failed to fetch campaigns");
        }
      } catch (error) {
        logger.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  //pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCampaigns = campaigns.slice(startIndex, endIndex);

  // Open campaign detail modal
  const openCampaignDetail = (campaign) => {
    setSelectedCampaign(campaign);

  };
  // Close campaign detail modal
  const closeCampaignDetail = () => {
    setSelectedCampaign(null);

  };
  // Calculate the number of pages for pagination
  const pageCount = Math.ceil(campaigns.length / itemsPerPage);

  // Handle page change for pagination
  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div className="container my-4">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div className="row">
            {displayedCampaigns.map((campaign) => (
              <CampaignCard
                campaign={campaign}
                openCampaignDetail={openCampaignDetail}
                defaultImageSrc={defaultImageSrc}
                apiUrl={apiurl}
                currentDate={currentDate}
                key={campaign._id}
              />
            ))}
          </div>
          {pageCount > 1 && (
            <div className="text-center mt-3">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                previousClassName={"page-link"}
                nextClassName={"page-link"}
                pageLinkClassName={"page-link"}
              />
            </div>
          )}
        </div>
      )}
      {selectedCampaign && (
        <CampaignDetail
          campaign={selectedCampaign}
          onClose={closeCampaignDetail}
        />
      )}
    </div>
  );
};

export default CampaignList