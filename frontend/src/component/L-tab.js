import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CampaignList from './campaigns/campainglist';
import CampaignCreationForm from './campaigns/campaigncreate';
import TransactionHistory from './campaigns/TransactionHistory';

function Tab() {
  const [activeTab, setActiveTab] = useState('campaignList');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/home/campaignList"
            onClick={() => handleTabClick('campaignList')}
            className={`nav-link ${activeTab === 'campaignList' ? 'active' : ''}`}
          >
            Campaign List
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/home/createCampaign"
            onClick={() => handleTabClick('createCampaign')}
            className={`nav-link ${activeTab === 'createCampaign' ? 'active' : ''}`}
          >
            Create Campaign
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/home/transactionHistory"
            onClick={() => handleTabClick('transactionHistory')}
            className={`nav-link ${activeTab === 'transactionHistory' ? 'active' : ''}`}
          >
            Transaction History
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        <div
          id="campaignList"
          className={`tab-pane ${activeTab === 'campaignList' ? 'active' : ''}`}
        >
          <CampaignList />
        </div>
        <div
          id="createCampaign"
          className={`tab-pane ${activeTab === 'createCampaign' ? 'active' : ''}`}
        >
          <CampaignCreationForm />
        </div>
        <div
          id="transactionHistory"
          className={`tab-pane ${activeTab === 'transactionHistory' ? 'active' : ''}`}
        >
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}

export default Tab;