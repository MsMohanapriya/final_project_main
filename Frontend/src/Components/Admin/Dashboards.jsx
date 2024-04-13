import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dashboard from '../Dashboard/Dashboard';

function UserList() {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [serialNumber, setSerialNumber] = useState(1);
    const [userTypeFilter, setUserTypeFilter] = useState("All");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (userTypeFilter === "All") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(
                (user) => user.user_type === userTypeFilter
            );
            setFilteredUsers(filtered);
        }
    }, [users, userTypeFilter]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data.users);

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const sortedUsers = data.sort((a, b) => a.id - b.id);
            setUsers(sortedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
        setErrorMessage(null);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    return (
        <>
            <Dashboard className='navbar' />
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

                <br />
                <br />
                <br />
                <br />
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ marginRight: "10px" }} htmlFor="userTypeFilter">
                        Filter by User Type:
                    </label>
                    <select
                        id="userTypeFilter"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            borderRadius: "5px",
                        }}
                        value={userTypeFilter}
                        onChange={(e) => setUserTypeFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="">Select Designation</option>
                        <option value="Business Administrator">Business Administrator</option>
                        <option value="CEO">CEO</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Intern">Intern</option>
                        <option value="Manager">Manager</option>
                        <option value="Senior Associate Consultant">Senior Associate Consultant</option>
                        <option value="Senior Consultant">Senior Consultant</option>
                        <option value="Solutions Consultant">Solutions Consultant</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Solution Enabler">Solution Enabler</option>
                        <option value="Senior Software Engineer">Senior Software Engineer</option>

                    </select>
                </div>

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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                        {filteredUsers.map((user, index) => (
                            <tr
                                key={user.user_id}
                                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                            >
                                <td>{serialNumber + index}</td>
                                <td>{user.user_id}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.designation}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser?.username || ""}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, username: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser?.name || ""}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, name: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={selectedUser?.mail_id || ""}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, mail_id: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUser?.phone_number || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            phone_number: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formUserType">
                                <Form.Label>User Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedUser?.user_type || ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            user_type: e.target.value,
                                        })
                                    }
                                >
                                    <option value="Employee">Employee</option>
                                    <option value="Intern">Intern</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        {errorMessage && (
                            <div className="alert alert-danger mt-3">{errorMessage}</div>
                        )}
                    </Modal.Body>
                </Modal> */}

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

export default UserList;
