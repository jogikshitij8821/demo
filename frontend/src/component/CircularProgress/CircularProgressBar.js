import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logger from "../../logger";
import '../styles/circularProgressBar.css';

const CircularProgressBar = ({ goal }) => {
  const raised = "1000";
  logger.log("circular bar goal", goal);
  let percentage = (raised / goal) * 100;

  if (percentage > 100) {
    percentage = 100;
  }

  const [donationAmount, setDonationAmount] = useState(0);
  const [isGoalFulfilled, setIsGoalFulfilled] = useState(percentage >= 100);

  const handleDonate = () => {
    if (percentage >= 100) {
      logger.log("Goal already fulfilled, cannot donate.");
      alert(
        "The goal has already been reached. You cannot donate to this post."
      );
      return;
    }

    const newRaised = raised + Number(donationAmount);
    const updatedRaised = Math.min(newRaised, goal);
    setDonationAmount(0);
    raised = updatedRaised;
    setIsGoalFulfilled(updatedRaised >= goal);
  };

  return (
    <div className="circular-progress-container">
      <div className="circular-progress-bar">
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={{
            path: { className: "circular-progress-bar-path" },
            text: { className: "circular-progress-bar-text" },
            trail: { className: "circular-progress-bar-trail" },
          }}
        />
      </div>
      <div className="circular-progress-text">
        <p>Raised {raised} of {goal}</p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
