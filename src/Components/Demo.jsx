import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
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
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";

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

function AccountDetails() {
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
        multiselect: [],
        country: "",
        state: "",
        city: "",
        profileImage: null,
    });
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [selected, setSelected] = useState([]);

    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];

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
            const updatedData = {
                ...accountFormData,
                multiselect: selected.map((option) => option.value), // Save only the values
            };
            await set(ref(database, `users/${userId}`), updatedData);
            alert(editId ? "Data updated successfully!" : "Data saved successfully!");
            setEditId(null); // Reset edit mode
            setAccountFormData({
                firstname: "",
                lastname: "",
                email: "",
                mobile: "",
                gender: "",
                dob: "",
                multiselect: [],
                age: 18,
                interests: [],
                country: "",
                state: "",
                city: "",
                profileImage: "",
            });
            setSelected([]); // Reset MultiSelect
            fetchData();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


    // Edit a user
    const handleEdit = (user) => {
        setEditId(user.id);
        setAccountFormData(user);
        setSelected(user.multiselect.map((value) => options.find((option) => option.value === value)) || []);

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
        <div className="main-container text-dark">
            <Container fluid>
                <div className="d-flex justify-content-centre">
                    <h1 className="text-centre fw-bolder">Firebase Crud Form</h1>
                </div>
                <Row>
                    <Form noValidate onSubmit={handleSubmit} className="p-4 shadow rounded">
                        <h4 className="mb-4 text-center">User Information Form</h4>
                        <Row className="mb-3 gy-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    value={accountFormData.firstname}
                                    onChange={handleChange}
                                    required
                                    className="rounded-pill"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={accountFormData.lastname}
                                    onChange={handleChange}
                                    className="rounded-pill"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Profile Image URL:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="profileImage"
                                    value={accountFormData.profileImage}
                                    onChange={handleChange}
                                    placeholder="Enter image URL"
                                    className="rounded-pill"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 gy-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Gender:</Form.Label>
                                <div className="d-flex gap-3">
                                    <Form.Check
                                        inline
                                        label="Male"
                                        name="gender"
                                        type="radio"
                                        value="Male"
                                        checked={accountFormData.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        name="gender"
                                        type="radio"
                                        value="Female"
                                        checked={accountFormData.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>MultiSelect Options:</Form.Label>
                                <MultiSelect
                                    name="multiselect"
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Interests:</Form.Label>
                                <div className="d-flex flex-wrap gap-2">
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
                                </div>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 gy-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Country:</Form.Label>
                                <CountrySelect onChange={handleCountryChange} placeHolder="Select Country" />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>State:</Form.Label>
                                <StateSelect countryid={countryId} onChange={handleStateChange} placeHolder="Select State" />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>City:</Form.Label>
                                <CitySelect countryid={countryId} stateid={stateId} onChange={handleCityChange} placeHolder="Select City" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 gy-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Age:</Form.Label>
                                <Form.Control
                                    type="range"
                                    min="1"
                                    max="100"
                                    name="age"
                                    value={accountFormData.age}
                                    onChange={handleChange}
                                    step="1"
                                    className="form-range"
                                />
                                <Form.Text className="d-block">{accountFormData.age} years old</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Date of Birth:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={accountFormData.dob}
                                    onChange={handleChange}
                                    className="rounded-pill"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Email:</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="rounded-pill">@</InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={accountFormData.email}
                                        onChange={handleChange}
                                        className="rounded-pill"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Mobile No:</Form.Label>
                                <PhoneInput
                                    international
                                    defaultCountry="IN"
                                    placeholder="Enter Mobile Number"
                                    value={accountFormData.mobile}
                                    onChange={handlePhoneChange}
                                />
                            </Form.Group>
                        </Row>
                        <Button type="submit" className="btn-primary rounded-pill px-4 py-2 mt-3 ">
                            {editId ? "Update Data" : "Submit Data"}
                        </Button>
                    </Form>

                </Row>
                <Row className="mt-5" style={{ backgroundImage: "url('/public/loginBg.jpg')" }}>
                    <h1> Users Details Table</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Profile Image</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Date of Birth</th>
                                    <th scope="col">Multi Selected</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">State</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Interests</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            {user.profileImage ? (
                                                <img
                                                    className="rounded-circle border border-secondary"
                                                    src={user.profileImage}
                                                    alt="Profile"
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
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
                                        <td>{user.multiselect ? user.multiselect.join(", ") : "N/A"}</td>
                                        <td>{user.country}</td>
                                        <td>{user.state}</td>
                                        <td>{user.city}</td>
                                        <td>{user.age}</td>
                                        <td>{user.interests.join(", ")}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => handleEdit(user)}
                                                className="btn-sm mx-1"
                                            >
                                                <MdOutlineModeEdit className="fs-6" />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(user.id)}
                                                className="btn-sm mx-1"
                                            >
                                                <MdDeleteSweep className="fs-6" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </Row>
            </Container>
        </div>
    );
}

export default AccountDetails;

const handleEdit = (user) => {
    setEditId(user.id);

    // Set account form data
    setAccountFormData(user);

    // Initialize selected multi-select options
    setSelected(user.multiselect.map((value) => options.find((option) => option.value === value)) || []);

    // Initialize country and state IDs based on user data
    const selectedCountry = user.country
        ? { id: getCountryId(user.country), name: user.country }
        : null;

    const selectedState = user.state
        ? { id: getStateId(user.state, selectedCountry?.id), name: user.state }
        : null;

    setCountryId(selectedCountry?.id || 0);
    setStateId(selectedState?.id || 0);
};
