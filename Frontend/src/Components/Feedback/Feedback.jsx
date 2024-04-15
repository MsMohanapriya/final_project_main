
import React, { useState } from "react";
import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Rating } from "@mui/material";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
`;
const ThankYouCard = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const FeedbackForm = () => {
  const [overallProgress, setOverallProgress] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [timeline, setTimeline] = useState(0);
  const [qualityOfWork, setQualityOfWork] = useState(0);
  const [projectManagement, setProjectManagement] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      overallProgress,
      communication,
      timeline,
      qualityOfWork,
      projectManagement
    };

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      console.log('Feedback submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };
  return (
    <div style={{ fontFamily: 'Caudex, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

      {!submitted ? (
        <StyledForm onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <FormLabel component="legend">How satisfied are you with the overall progress of the project?</FormLabel>
            <Rating
              name="overall-progress"
              value={overallProgress}
              onChange={(event, newValue) => setOverallProgress(newValue)}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#19105b"
                }
              }}
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Rate the communication between team members on a scale of 1 to 5</FormLabel>
            <Rating
              name="communication"
              value={communication}
              onChange={(event, newValue) => setCommunication(newValue)}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#19105b"
                }
              }}
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Did you find the project timeline realistic? Please rate from 1 to 5</FormLabel>
            <Rating
              name="timeline"
              value={timeline}
              onChange={(event, newValue) => setTimeline(newValue)}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#19105b"
                }
              }}
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">How would you rate the quality of work delivered by the team?</FormLabel>
            <Rating
              name="quality-of-work"
              value={qualityOfWork}
              onChange={(event, newValue) => setQualityOfWork(newValue)}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#19105b"
                }
              }}
        
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Rate the effectiveness of the project management on a scale of 1 to 5</FormLabel>
            <Rating
              name="project-management"
              value={projectManagement}
              onChange={(event, newValue) => setProjectManagement(newValue)}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#19105b"
                }
              }}
            />
          </FormControl>
          <Button variant="contained" type="submit" backgroundColor="#19105b"  >Submit Feedback</Button>
        </StyledForm>
      ) : (
        <ThankYouCard>
          <h2>Thank you for your submission!</h2>
          <p>We appreciate your feedback.</p>
        </ThankYouCard>
      )}
    </div>
  );
};

export default FeedbackForm;
