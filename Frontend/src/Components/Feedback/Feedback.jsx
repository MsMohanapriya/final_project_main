import React, { useState } from "react";
import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Rating } from "@mui/material";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeedbackForm = () => {
  const [overallProgress, setOverallProgress] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [timeline, setTimeline] = useState(0);
  const [qualityOfWork, setQualityOfWork] = useState(0);
  const [projectManagement, setProjectManagement] = useState(0);

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
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormControl component="fieldset">
        <FormLabel component="legend">How satisfied are you with the overall progress of the project?</FormLabel>
        <Rating
          name="overall-progress"
          value={overallProgress}
          onChange={(event, newValue) => setOverallProgress(newValue)}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Rate the communication between team members on a scale of 1 to 5</FormLabel>
        <RadioGroup
          name="communication"
          value={communication}
          onChange={(event) => setCommunication(parseInt(event.target.value))}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Did you find the project timeline realistic? Please rate from 1 to 5</FormLabel>
        <Rating
          name="timeline"
          value={timeline}
          onChange={(event, newValue) => setTimeline(newValue)}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">How would you rate the quality of work delivered by the team?</FormLabel>
        <Rating
          name="quality-of-work"
          value={qualityOfWork}
          onChange={(event, newValue) => setQualityOfWork(newValue)}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Rate the effectiveness of the project management on a scale of 1 to 5</FormLabel>
        <Rating
          name="project-management"
          value={projectManagement}
          onChange={(event, newValue) => setProjectManagement(newValue)}
        />
      </FormControl>
      <Button variant="contained" type="submit">Submit Feedback</Button>
    </StyledForm>
  );
};

export default FeedbackForm;

