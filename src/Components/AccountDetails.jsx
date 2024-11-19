import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyBweSo_uyBSX_1RNMHFdrUZNaYzWcIuppg",
    authDomain: "reactotp-5a042.firebaseapp.com",
    databaseURL: "https://reactotp-5a042-default-rtdb.firebaseio.com",
    projectId: "reactotp-5a042",
    storageBucket: "reactotp-5a042.firebasestorage.app",
    messagingSenderId: "303973562168",
    appId: "1:303973562168:web:7069c804268ad8c6e973cd",
    measurementId: "G-8SM4ZTPMKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

function AccountDetails() {
    const [region, setRegion] = useState("");
    const [countryId, setCountryId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const [accountFormData, setAccountFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        gender: "",
        age: 18,
        interests: [],
        dob: "",
        country: "",
        state: "",
        city: "",
        profileImage: null,
    });
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);

    // Fetch all users
    const fetchData = async () => {
        try {
            const snapshot = await get(ref(database, "users"));
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedData = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setUsers(formattedData);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountFormData({ ...accountFormData, [name]: value });
    };


    const handlePhoneChange = (value) => {
        setAccountFormData({ ...accountFormData, mobile: value });
    };

    const handleCountryChange = (selectedCountry) => {
        if (selectedCountry) {
            setCountryId(selectedCountry.id);
            setAccountFormData({ ...accountFormData, country: selectedCountry.name });
        }
    };

    const handleStateChange = (selectedState) => {
        if (selectedState) {
            setStateId(selectedState.id);
            setAccountFormData({ ...accountFormData, state: selectedState.name });
        }
    };

    const handleCityChange = (selectedCity) => {
        if (selectedCity) {
            setAccountFormData({ ...accountFormData, city: selectedCity.name });
        }
    };

    const handleInterestChange = (e) => {
        const { name, checked } = e.target;
        setAccountFormData((prevState) => {
            const updatedInterests = checked
                ? [...prevState.interests, name]
                : prevState.interests.filter((interest) => interest !== name);
            return { ...prevState, interests: updatedInterests };
        });
    };

    // Submit data (add or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = editId || Date.now().toString();
            await set(ref(database, `users/${userId}`), accountFormData);
            alert(editId ? "Data updated successfully!" : "Data saved successfully!");
            setEditId(null); // Reset edit mode
            setAccountFormData({
                firstname: "",
                lastname: "",
                email: "",
                mobile: "",
                gender: "",
                dob: "",
                age: 18,
                interests: [],
                country: "",
                state: "",
                city: "",
                profileImage: "",
            });
            fetchData();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // Edit a user
    const handleEdit = (user) => {
        setEditId(user.id);
        setAccountFormData(user);
    };

    // Delete a user
    const handleDelete = async (id) => {
        try {
            await remove(ref(database, `users/${id}`));
            alert("Data deleted successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <Row>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Profile Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="profileImage"
                                value={accountFormData.profileImage}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstname"
                                value={accountFormData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={accountFormData.lastname}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check
                                label="Male"
                                name="gender"
                                type="radio"
                                value="Male"
                                checked={accountFormData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Female"
                                name="gender"
                                type="radio"
                                value="Female"
                                checked={accountFormData.gender === "Female"}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={accountFormData.dob}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Country</Form.Label>
                            <CountrySelect onChange={handleCountryChange} placeHolder="Select Country" />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>State</Form.Label>
                            <StateSelect countryid={countryId} onChange={handleStateChange} placeHolder="Select State" />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>City</Form.Label>
                            <CitySelect countryid={countryId} stateid={stateId} onChange={handleCityChange} placeHolder="Select City" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="range"
                                min="1"
                                max="100"
                                name="age"
                                value={accountFormData.age}
                                onChange={handleChange}
                                step="1"
                                className="range-slider"
                            />
                            <Form.Text className="fw-bold">{accountFormData.age} years old</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Interests</Form.Label>
                            <Form.Check
                                inline
                                label="Cricket"
                                name="Cricket"
                                checked={accountFormData.interests.includes("Cricket")}
                                onChange={handleInterestChange}
                            />
                            <Form.Check
                                inline
                                label="Singing"
                                name="Singing"
                                checked={accountFormData.interests.includes("Singing")}
                                onChange={handleInterestChange}
                            />
                            <Form.Check
                                inline
                                label="Drawing"
                                name="Drawing"
                                checked={accountFormData.interests.includes("Drawing")}
                                onChange={handleInterestChange}
                            />
                            <Form.Check
                                inline
                                label="Traveling"
                                name="Traveling"
                                checked={accountFormData.interests.includes("Traveling")}
                                onChange={handleInterestChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={accountFormData.email}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Mobile No.</Form.Label>
                            <PhoneInput
                                international
                                defaultCountry="IN"
                                placeholder="Enter Mobile Number"
                                value={accountFormData.mobile}
                                onChange={handlePhoneChange}
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit" className="mt-4">
                        {editId ? "Update Data" : "Submit Data"}
                    </Button>
                </Form>
            </Row>
            <Row className="mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Profile Image</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Age</th>
                            <th>Interests</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {user.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="Profile"
                                            style={{ width: 100, height: 100, borderRadius: "50%" }}
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.gender}</td>
                                <td>{user.dob}</td>
                                <td>{user.country}</td>
                                <td>{user.state}</td>
                                <td>{user.city}</td>
                                <td>{user.age}</td>
                                <td>{user.interests.join(", ")}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default AccountDetails;
