import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dashboard from "../Navbar/Dashboard";

function UserDashboard() {
    
    const [feedbacks, setFeedbacks] = useState();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    let resArray = [];
    // const [resArray, setResArray] = useState([]);
    const [serialNumber, setSerialNumber] = useState(1);
    const user_id = sessionStorage.getItem('userId');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/getFeedbacks/${user_id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            // const sortedUsers = data.users.sort((a, b) => a.id - b.id);
            console.log(data.data)
            // feedbacks = data.data
            setFeedbacks(data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    if (feedbacks ) {
        console.log(feedbacks)
        resArray = {
            'user_id':feedbacks.feedbackData[0].user_id,
            'start_period':feedbacks.timesheetData[0].start_period,
            'end_period':feedbacks.timesheetData[0].end_period
        }
    }
    if(resArray) console.log(resArray);
    return (
        <>
            <Dashboard className="navbar" />
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
                <h1 style={{ textAlign: "center", marginTop: "55px", color: "black" }}>
                    User feedback Dashboard
                </h1>


                <Table
                    striped
                    bordered
                    hover
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "5px",
                    }}
                >
                    <thead style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                        <tr>
                            <th>S.No.</th>
                            {/* <th>ID</th> */}
                            <th>User_id</th>
                            <th>Start Period</th>
                            <th>End Period</th>
                            <th>Status</th>
                            {/* <th>Designation</th> */}
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                        {resArray && Object.entries(resArray).map((entry,index) => (
                            <tr
                                key={entry.user_id}
                                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                            >
                                <td>{serialNumber + index}</td>
                                {/* <td>{user.user_id}</td> */}
                                <td>{resArray.user_id}</td>
                                <td>{(resArray.start_period).split('T')[0]}</td>
                                <td>{(resArray.end_period).split('T')[0]}</td>
                                <td>{resArray ? 'Submitted' : 'Not Submitted'}</td>
                                {/* <td>{user.designation}</td> */}
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>

                <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Information updated successfully.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default UserDashboard;
