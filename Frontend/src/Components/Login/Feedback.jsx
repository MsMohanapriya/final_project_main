import React, { useState } from 'react';
import axios from 'axios'; // You need to install axios for making HTTP requests

const FeedbackForm = ({ userId, startDate, endDate }) => {
    const [ratings, setRatings] = useState({
        q1: 5,
        q2: 5,
        q3: 5,
        q4: 5,
        q5: 5,
        q6: 5,
        q7: 5,
        q8: 5,
        q9: 5,
        q10: 5,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRatings({ ...ratings, [name]: parseInt(value) });
    };

    const handleSubmit = async () => {
        try {
            const feedbackData = {
                userId: userId,
                startDate: startDate,
                endDate: endDate,
                ratings: ratings,
            };

            // Send feedbackData to backend
            const response = await axios.post('/api/feedback', feedbackData);
            console.log(response.data); // Assuming backend returns some response

            // Reset form after successful submission
            setRatings({
                q1: 5,
                q2: 5,
                q3: 5,
                q4: 5,
                q5: 5,
                q6: 5,
                q7: 5,
                q8: 5,
                q9: 5,
                q10: 5,
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-form">
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="rating-questions">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="question">
                            <label htmlFor={`q${index + 1}`}>Q{index + 1}</label>
                            <input
                                type="number"
                                id={`q${index + 1}`}
                                name={`q${index + 1}`}
                                min="1"
                                max="10"
                                value={ratings[`q${index + 1}`]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
