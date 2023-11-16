import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaShare } from 'react-icons/fa6';

const ShareButtons = ({ campaign, campaignName, campaignImage, campaignDescription }) => {
  const campaignDetailUrl = `${window.location.href}/campaigns/${campaign._id}`;

  const shareText = `Check out this campaign: ${campaignName}\n\n${campaignImage}\n\n${campaignDescription}`;

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const openInstagram = () => {
    // Construct the Instagram URL with prefilled content
    const instagramUrl = `https://www.instagram.com/create/story/?url=${encodeURIComponent(campaignDetailUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(instagramUrl, '_blank'); // Open Instagram in a new tab
  };
  return (
    <div className="share-dropdown">
      {/* Helmet component for adding meta tags to the head */}
      <Helmet>
        {/* Open Graph meta tags */}
        <meta property="og:url" content={campaignDetailUrl} />
        <meta property="og:title" content={campaignName} />
        <meta property="og:description" content={campaignDescription} />
        <meta property="og:image" content={campaignImage} />
      </Helmet>

      <button className="btn btn-social" onClick={toggleDropdown}>
        <FaShare /> 
      </button>

      {showDropdown && (
        <div className="dropdown-content">
          {/* Facebook Share Button */}
          <FacebookShareButton url={campaignDetailUrl} quote={shareText}>
            <button className="btn btn-social">
              <FontAwesomeIcon icon={faFacebook} />
            </button>
          </FacebookShareButton>

          {/* Twitter Share Button */}
          <TwitterShareButton url={campaignDetailUrl} title={shareText}>
            <button className="btn btn-social">
              <FontAwesomeIcon icon={faTwitter} />
            </button>
          </TwitterShareButton>

          {/* Instagram Share Button (Note: Instagram does not support direct sharing) */}
          <button className="btn btn-social" onClick={openInstagram}>
            <FontAwesomeIcon icon={faInstagram} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
