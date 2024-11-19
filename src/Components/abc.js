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
