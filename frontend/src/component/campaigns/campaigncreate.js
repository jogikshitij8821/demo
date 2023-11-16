import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faMedkit, faMonument, faQuestionCircle, } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import logger from '../../logger';
import ChatComponent from './chatbot';

function CampaignCreationForm() {
  // State for form data and errors
  const [campaignData, setCampaignData] = useState({
    campaignName: '',
    campaignGoal: 1000,
    campaignDescription: '',
    campaignCategory: '',
    campaignImage: null,
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState({
    campaignName: '',
    campaignGoal: '',
    campaignDescription: '',
    startDate: '',
    endDate: '',
    campaignCategory: '',
    campaignImage: '',
  });


  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_BACKEND_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic for each form field
    if (name === 'campaignName') {
      if (value.length > 50) {
        setErrors({
          ...errors,
          campaignName: 'Campaign Name should be 50 characters or less',
        });
      } else {
        setErrors({
          ...errors,
          campaignName: '',
        });
      }
    } else if (name === 'campaignGoal') {
      const goalValue = parseInt(value);
      if (goalValue < 1000) {
        setErrors({
          ...errors,
          campaignGoal: 'Minimum goal is 1000',
        });
      } else if (goalValue > 5000000) {
        setErrors({
          ...errors,
          campaignGoal: 'Maximum goal should be 5000000',
        });
      } else if (value.indexOf('.') !== -1 && value.split('.')[1].length > 2) {
        setErrors({
          ...errors,
          campaignGoal: 'Maximum two decimal places are allowed',
        });
      } else {
        setErrors({
          ...errors,
          campaignGoal: '',
        });
      }
    } else if (name === 'startDate') {
      if (value < currentDate) {
        setErrors({
          ...errors,
          [name]: 'Start Date cannot be earlier than the current date',
        });
      } else if (campaignData.endDate && value >= campaignData.endDate) {
        setErrors({
          ...errors,
          [name]: 'Start Date must be earlier than End Date',
          endDate: 'End Date must be later than Start Date',
        });
      } else {
        setErrors({
          ...errors,
          [name]: '',
        });
        if (errors.endDate) {
          setErrors({
            ...errors,
            endDate: '',
          });
        }
      }
    } else if (name === 'endDate') {
      if (campaignData.startDate && value <= campaignData.startDate) {
        setErrors({
          ...errors,
          [name]: 'End Date must be later than Start Date',
        });
      } else {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    } else if (name === 'campaignCategory') {
      if (!value) {
        setErrors({
          ...errors,
          campaignCategory: 'Campaign Category is required',
        });
      } else {
        setErrors({
          ...errors,
          campaignCategory: '',
        });
      }
    } else if (name === 'campaignImage') {
      if (!value) {
        setErrors({
          ...errors,
          campaignImage: 'Campaign Image is required',
        });
      } else {
        setErrors({
          ...errors,
          campaignImage: '',
        });
      }
    }

    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setCampaignData({ ...campaignData, campaignImage: selectedImage });
  };

  // Check if the form is complete
  const isFormComplete = () => {
    const { campaignName, campaignGoal, campaignDescription, startDate, endDate, campaignImage } = campaignData;
    return (
      campaignName &&
      campaignGoal >= 1000 &&
      campaignDescription &&
      startDate &&
      endDate &&
      campaignImage &&
      Object.values(errors).every((error) => !error)
    );
  };

  // Close the modal
  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = { ...errors };

    if (!campaignData.campaignName) {
      formErrors.campaignName = 'Campaign Name is required';
    }

    if (parseFloat(campaignData.campaignGoal) < 1000) {
      formErrors.campaignGoal = 'Minimum goal is 1000';
    } else {
      formErrors.campaignGoal = '';
    }

    if (!campaignData.campaignDescription) {
      formErrors.campaignDescription = 'Campaign Description is required';
    }
    if (!campaignData.startDate) {
      formErrors.startDate = 'Start Date is required';
    }
    if (!campaignData.endDate) {
      formErrors.endDate = 'End Date is required';
    }
    if (!campaignData.campaignCategory) {
      formErrors.campaignCategory = 'Campaign Category is required';
    }
    if (!campaignData.campaignImage) {
      formErrors.campaignImage = 'Campaign Image is required';
    }

    setErrors(formErrors);

    if (isFormComplete() && parseFloat(campaignData.campaignGoal) >= 1000) {
      const formData = new FormData();
      formData.append('campaignName', campaignData.campaignName);
      formData.append('campaignGoal', campaignData.campaignGoal);
      formData.append('campaignDescription', campaignData.campaignDescription);
      formData.append('campaignCategory', campaignData.campaignCategory);
      formData.append('campaignImage', campaignData.campaignImage);
      formData.append('startDate', campaignData.startDate);
      formData.append('endDate', campaignData.endDate);

      try {
        const response = await axios.post(`${apiUrl}/create-campaign`, formData);

        if (response.status === 201) {
          setShowModal(true);
          setModalMessage('Campaign Created Successfully');

          setTimeout(() => {
            setCampaignData({
              campaignName: '',
              campaignGoal: 1000,
              campaignDescription: '',
              campaignCategory: '',
              campaignImage: null,
              startDate: '',
              endDate: '',
            });
            setErrors({
              campaignName: '',
              campaignGoal: '',
              campaignDescription: '',
              startDate: '',
              endDate: '',
              campaignCategory: '',
              campaignImage: '',
            });
          }, 1000);
        } else {
          setModalMessage(`Failed to create campaign: ${response.status} ${response.statusText}`);
          setShowModal(true);
        }
      } catch (error) {
        setModalMessage(`Error: ${error.message}`);
        setShowModal(true);
      }
    }
  };

  // Campaign categories
  const campaignCategories = [
    {
      label: 'Education',
      icon: faGraduationCap,
    },
    {
      label: 'Medical',
      icon: faMedkit,
    },
    {
      label: 'Memorial',
      icon: faMonument,
    },
    {
      label: 'Other',
      icon: faQuestionCircle,
    },
  ];

  return (
    <div className="container mt-5 p-2 px-2 border border-dark">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3 h4 text-center">Create a Fundraising Campaign</div>
          <form onSubmit={handleSubmit} id="campaignForm">
            {/* Form fields */}
            {/* Campaign Name */}
            <div className={`form-group mb-3 ${errors.campaignName ? 'is-invalid' : ''}`}>
              <label htmlFor="campaignName" className="form-label h5">Campaign Name<span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control${errors.campaignName ? ' is-invalid' : ''}`}
                id="campaignName"
                name="campaignName"
                value={campaignData.campaignName}
                onChange={handleChange}
                required
                maxLength="50"
              />
              {errors.campaignName && (
                <div className="invalid-feedback">{errors.campaignName}</div>
              )}
            </div>

            {/* Campaign Goal */}
            <div className={`form-group mb-3 ${errors.campaignGoal ? 'is-invalid' : ''}`}>
              <label htmlFor="campaignGoal" className="form-label h5">
                Campaign Goal<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control${errors.campaignGoal ? ' is-invalid' : ''}`}
                id="campaignGoal"
                name="campaignGoal"
                value={campaignData.campaignGoal}
                onChange={handleChange}
                required
              />
              {parseFloat(campaignData.campaignGoal) < 1000 && (
                <div className="invalid-feedback">Minimum goal is 1000</div>
              )}
            </div>
            <div className={`form-group mb-3 ${errors.campaignDescription ? 'is-invalid' : ''}`}>
              <label htmlFor="campaignDescription" className="form-label h5">
                Campaign Description<span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control${errors.campaignDescription ? ' is-invalid' : ''}`}
                id="campaignDescription"
                name="campaignDescription"
                value={campaignData.campaignDescription}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{errors.campaignDescription}</div>
            </div>

            {/* Start Date */}
            <div className={`form-group mb-3 ${errors.startDate ? 'is-invalid' : ''}`}>
              <label htmlFor="startDate" className="form-label h5">
                Start Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control${errors.startDate ? ' is-invalid' : ''}`}
                id="startDate"
                name="startDate"
                value={campaignData.startDate}
                onChange={handleChange}
                min={currentDate}
                required
              />
              <div className="invalid-feedback">{errors.startDate}</div>
            </div>

            {/* End Date */}
            <div className={`form-group mb-3 ${errors.endDate ? 'is-invalid' : ''}`}>
              <label htmlFor="endDate" className="form-label h5">
                End Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control${errors.endDate ? ' is-invalid' : ''}`}
                id="endDate"
                name="endDate"
                value={campaignData.endDate}
                onChange={handleChange}
                min={campaignData.startDate}
                required
              />
              <div className="invalid-feedback">{errors.endDate}</div>
            </div>

            {/* Campaign Category */}
            <div className={`form-group mb-3 ${errors.campaignCategory ? 'is-invalid' : ''}`}>
              <label htmlFor="campaignCategory" className="form-label h5">
                Campaign Category<span className="text-danger">*</span>
              </label>
              <div className="row">
                {campaignCategories.map((category, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`category${index}`}
                        name="campaignCategory"
                        value={category.label}
                        checked={campaignData.campaignCategory === category.label}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label d-flex flex-column align-items-center"
                        htmlFor={`category${index}`}
                      >
                        <FontAwesomeIcon icon={category.icon} size="2x" />
                        {category.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="invalid-feedback">{errors.campaignCategory}</div>
            </div>
            
            {/* Campaign Image */}
            <div className={`form-group mb-3 ${errors.campaignImage ? 'is-invalid' : ''}`}>
              <label htmlFor="campaignImage" className="form-label h5">
                {campaignData.campaignImage ? 'Choose a file' : 'Upload an image'}
                <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="campaignImage"
                    name="campaignImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </div>
              <div className="invalid-feedback">{errors.campaignImage}</div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn ${isFormComplete() ? 'btn-primary' : 'btn-secondary'}`}
              disabled={!isFormComplete()}
            >
              Create Campaign
            </button>
          </form>
        </div>
      </div>
   
      {/* Modal for success/failure message */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
     

  );
}

export default CampaignCreationForm;
