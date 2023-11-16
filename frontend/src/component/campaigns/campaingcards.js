import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CircularProgressBar from '../CircularProgress/CircularProgressBar';
import DonationForm from './donation';
import '../styles/campaigncard.css'; // Corrected the stylesheet name
import 'bootstrap/dist/css/bootstrap.min.css';
import logger from '../../logger';
import ShareButtons from './ShareButtons';
function CampaignCard({
  campaign,
  openCampaignDetail,
  defaultImageSrc,
  apiUrl,
  currentDate,
}) {
  const [showShareButton, setShowShareButton] = useState(false);
  const handlePaymentSuccess = () => {
    setShowShareButton(true);
  };
  const isEndDateValid = !campaign.endDate || new Date(campaign.endDate) >= currentDate;

  let badgeVariant = 'danger';
  let badgeLabel = 'Expired';

  if (isEndDateValid) {
    if (campaign.startDate && currentDate >= new Date(campaign.startDate)) {
      if (currentDate <= new Date(campaign.endDate)) {
        badgeVariant = 'success';
        badgeLabel = 'In Progress';
        logger.log('Campaign is in progress');
      } else {
        badgeVariant = 'danger';
        badgeLabel = 'Expired';
        logger.log('Campaign has expired');
      }
    } else if (currentDate < new Date(campaign.startDate)) {
      badgeVariant = 'primary';
      badgeLabel = 'Upcoming';
      logger.log('Campaign is upcoming');
    }
  } else {
    badgeVariant = 'danger';
    badgeLabel = 'Expired';
    logger.log('Campaign has expired');
  }

  return (
    <div className="col-md-4 mb-4 card-shadow" key={campaign._id}>
      <div className="card" style={{ height: '100%' }}>
        <div
          onClick={() => {
            openCampaignDetail(campaign);
            logger.log('Campaign details opened');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              openCampaignDetail(campaign);
              logger.log('Campaign details opened');
            }
          }}
          role="button"
          tabIndex="0"
        >
          {campaign.campaignImage ? (
            <img
              src={`${apiUrl}/${campaign.campaignImage}`}
              alt={campaign.campaignName}
              className="card-img-top img-fluid campaign-image"
              onError={(e) => {
                e.target.src = defaultImageSrc;
                logger.error('Error loading campaign image');
              }}
            />
          ) : (
            <img
              src={defaultImageSrc}
              alt=""
              className="card-img-top img-fluid campaign-image"
            />
          )}
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-title campaign-name campaign-name-bold">
                {campaign.campaignName}
              </div>
              <Badge pill bg={badgeVariant} className="status-badge badge-large">
                {badgeLabel}
              </Badge>
            </div>
            {campaign.startDate && (
              <div>
                Start Date:
                {' '}
                {new Date(campaign.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
            {campaign.endDate && (
              <div>
                End Date:
                {' '}
                {new Date(campaign.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
            <div className="card-text">
              <OverlayTrigger
                placement="top"
                overlay={(
                  <Tooltip id={`tooltip-${campaign._id}`}>
                    {campaign.campaignDescription}
                  </Tooltip>
                )}
              >
                <div className="description truncate-text">
                  {campaign.campaignDescription}
                </div>
              </OverlayTrigger>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <CircularProgressBar
                percentage={campaign.progress}
                goal={campaign.campaignGoal}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="button"
            className={`donation-button btn btn-sm mb-3 ${!isEndDateValid || campaign.currentAmount >= campaign.goalAmount || (campaign.startDate && currentDate < new Date(campaign.startDate) && new Date(campaign.endDate) >= currentDate) ? 'btn-secondary' : 'btn-primary'}`}
            disabled={
              !isEndDateValid
              || campaign.currentAmount >= campaign.goalAmount
              || (campaign.startDate
                && currentDate < new Date(campaign.startDate)
                && new Date(campaign.endDate) >= currentDate)
            }
          >
            <DonationForm campaignName={campaign.campaignName} campaignCategory={campaign.campaignCategory} onSuccess={handlePaymentSuccess} />
          </button>
        </div>
        <div className="share-buttons">
          
            <ShareButtons
              campaign={campaign}
              campaignName={campaign.campaignName}
              campaignImage={campaign.campaignImage}
              campaignDescription={campaign.campaignDescription}
            />

</div>
      </div>
    </div>
  );
}

CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    campaignName: PropTypes.string.isRequired,
    campaignDescription: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    campaignImage: PropTypes.string,
    campaignCategory: PropTypes.string,
    campaignGoal: PropTypes.number,
    progress: PropTypes.number, // Add progress prop type
    currentAmount: PropTypes.number, // Add currentAmount prop type
    goalAmount: PropTypes.number, // Add goalAmount prop type
  }),
  openCampaignDetail: PropTypes.func.isRequired,
  defaultImageSrc: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
};
CampaignCard.defaultProps = {
  campaign: {
    campaignDescription: '',
    startDate: '',
    endDate: '',
    campaignImage: '',
    campaignCategory: '',
    campaignGoal: 0,
    progress: 0,
    currentAmount: 0,
    goalAmount: 0,
  },
};
export default CampaignCard;