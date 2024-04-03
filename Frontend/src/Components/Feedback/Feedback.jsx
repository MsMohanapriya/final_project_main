import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

function Feedback() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
    comment: ''
  });
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    // Fetch data from the API endpoint using the token
    const fetchProjects = async () => {
      const storedToken = sessionStorage.getItem('token');
      setToken(storedToken);
      try {
        const response = await fetch('http://localhost:3000/api/feedback_status', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => !project.submission_status);

  const handleSubmitFeedback = async () => {
    // Create feedback object with selected project details
    const feedback = {
      ...feedbackData,
      project_name: selectedProject.project_name,
      project_id: selectedProject.project_id,
      email: selectedProject.email,
      user_id: selectedProject.user_id
    };

    try {
      // Submit feedback
      const response = await fetch('http://localhost:3000/api/submit_feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(feedback)
      });
      // Handle response as needed
      console.log('Feedback submitted:', response);

      // Update submission status
      const updateResponse = await fetch('http://localhost:3000/api/update_submission_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          project_id: selectedProject.project_id,
          email: selectedProject.email
        })
      });
      // Handle update response as needed
      console.log('Submission status updated:', updateResponse);

      // Show toast message
      setToastVisible(true);
      toast.current.show({ severity: 'success', summary: 'Feedback Submitted', detail: 'Your feedback has been submitted successfully.' });

      // Fetch updated projects data
      const updatedResponse = await fetch('http://localhost:3000/api/feedback_status', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedData = await updatedResponse.json();
      setProjects(updatedData);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }

    // Reset feedback data
    setFeedbackData({
      question1: 0,
      question2: 0,
      question3: 0,
      question4: 0,
      question5: 0,
      comment: ''
    });
    // Close modal
    setDisplayModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Convert to local date format
  };

  return (
    <div className="grid">
      {filteredProjects.map(project => (
        <div key={project.project_id} className="col">
          <Card title={project.project_name}>
            <div>
              <p><strong>Week Start Date:</strong> {formatDate(project.week_startdate)}</p>
              <p><strong>Week End Date:</strong> {formatDate(project.week_enddate)}</p>
              <Button label="Submit Feedback" className="p-button-success" onClick={() => {
                setSelectedProject(project);
                setDisplayModal(true);
              }} />
            </div>
          </Card>
        </div>
      ))}
      <Dialog
        visible={displayModal}
        onHide={() => setDisplayModal(false)}
        header={`Submit Feedback for ${selectedProject?.project_name}`}
        modal
        style={{ width: '500px' }}
        footer={
          <div>
            <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={() => setDisplayModal(false)} />
            <Button label="Submit" icon="pi pi-check" className="p-button-success" onClick={handleSubmitFeedback} />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="question1">Question 1</label>
            <Dropdown
              id="question1"
              value={feedbackData.question1}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(e) => setFeedbackData({ ...feedbackData, question1: e.value })}
              placeholder="Select a value"
            />
          </div>
          <div className="p-field">
            <label htmlFor="question2">Question 2</label>
            <Dropdown
              id="question2"
              value={feedbackData.question2}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(e) => setFeedbackData({ ...feedbackData, question2: e.value })}
              placeholder="Select a value"
            />
          </div>
          <div className="p-field">
            <label htmlFor="question3">Question 3</label>
            <Dropdown
              id="question3"
              value={feedbackData.question3}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(e) => setFeedbackData({ ...feedbackData, question3: e.value })}
              placeholder="Select a value"
            />
          </div>
          <div className="p-field">
            <label htmlFor="question4">Question 4</label>
            <Dropdown
              id="question4"
              value={feedbackData.question4}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(e) => setFeedbackData({ ...feedbackData, question4: e.value })}
              placeholder="Select a value"
            />
          </div>
          <div className="p-field">
            <label htmlFor="question5">Question 5</label>
            <Dropdown
              id="question5"
              value={feedbackData.question5}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(e) => setFeedbackData({ ...feedbackData, question5: e.value })}
              placeholder="Select a value"
            />
          </div>
          <div className="p-field">
            <label htmlFor="comment">Extra Comment</label>
            <textarea
              id="comment"
              value={feedbackData.comment}
              onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
              rows={3}
              cols={30}
            ></textarea>
          </div>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
}

export default Feedback;