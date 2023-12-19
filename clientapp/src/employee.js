import { useEffect, useState } from "react";

function Employee() {
  const url = "http://localhost:9000/v1/employee";
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSeletedEmployee] = useState(null);

  const openEmployeeDetail = (employee) => {
    setSeletedEmployee(employee);
  };

  const closeEmployeeDetail = () => {
    setSeletedEmployee(null);
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        alert("error when parsing data" + error);
        console.error("error when parsing data" + error);
      });
  }, []);

  const handleDeleteEmployee = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const updateEmploye = employee.filter(
          (employeed) => employeed.id !== id
        );
        setEmployee(updateEmploye);
      })
      .catch((error) => {
        alert("error when delete" + error);
        console.log("error when delete" + error);
      });
  };

  return (
    <div className="container">
      <div className="heading">List of Employee</div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <button onClick={() => openEmployeeDetail(employee)}>
                  <span>halo</span>
                </button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* detail */}
      {selectedEmployee && (
        <DetailEmployee
          employee={selectedEmployee}
          onClose={closeEmployeeDetail}
        />
      )}
      {/* detail end */}
    </div>
  );
}

function DetailEmployee({ employee, onClose }) {
  const [user, setUser] = useState([]);
  const url = `http://localhost:9000/v1/user/${employee.id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        alert("error when parsing user data" + error);
        console.error("error when parsing user data" + error);
      });
  }, [url]);

  return (
    <div className="card">
      <button onClick={onClose}>x</button>
      <div className="card-body">
        <h4 className="card-title">Name : {employee.name}</h4>
        {user && <p>Username : {user.username}</p>}
        <p>Phone : {employee.phone}</p>
        <p>Email : {employee.email}</p>
      </div>
    </div>
  );
}
export default Employee;
