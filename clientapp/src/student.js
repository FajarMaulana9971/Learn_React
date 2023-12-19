import { useEffect, useState } from "react";
import { format } from "date-fns";

function Student() {
  const url = "http://localhost:9000/v1/student";
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [createStudentButton, setCreateStudentButton] = useState(null);
  const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
  const [selectedUpdateStudent, setSelectedUpdateStudent] = useState(null);

  const openDetailModal = (students) => {
    setSelectedStudent(students);
  };

  const closeDetailModal = () => {
    setSelectedStudent(null);
  };

  const openCreateStudent = () => {
    setCreateStudentButton(true);
  };

  const closeCreateStudent = () => {
    setCreateStudentButton(false);
  };

  const handleCreateStudent = (newStudent) => {
    setStudent([...student, newStudent]);
  };

  const openUpdateModal = (students) => {
    setSelectedUpdateStudent(students);
    setShowUpdateStudentModal(true);
  };

  const handleUpdateStudent = (updatingStudent) => {
    const updatedStudent = student.map((students) => {
      if (students.id === updatingStudent.id) {
        return updatingStudent;
      } else {
        return students;
      }
    });
    setStudent(updatedStudent);
  };

  const handleDeleteStudent = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedStudent = student.filter((students) => students.id !== id);
        setStudent(updatedStudent);
      })
      .catch((error) => {
        alert("error when deleting data" + error);
        console.error("error when deleting data" + error);
      });
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((error) => {
        alert("error when parsing data" + error);
        console.error("error when parsing data" + error);
      });
  }, []);

  return (
    <div className="container">
      <div className="heading">List Of Student</div>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {student.map((students, index) => (
            <tr key={index} className="text-center">
              <td>{index + 1}</td>
              <td>{students.name}</td>
              <td>{students.email}</td>
              <td>{students.phone}</td>
              <td>
                <button onClick={() => openDetailModal(students)}>
                  <span>detail</span>
                </button>
                <button onClick={() => openUpdateModal(students)}>
                  <span>update</span>
                </button>
                <button onClick={() => handleDeleteStudent(students.id)}>
                  <span>delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={openCreateStudent}>Create Student</button>
      {/* detail */}
      {selectedStudent && (
        <DetailStudent students={selectedStudent} onClose={closeDetailModal} />
      )}
      {/* detail end */}

      {/* create */}
      {createStudentButton && (
        <CreateStudent
          onCreate={handleCreateStudent}
          onCloseCreate={closeCreateStudent}
        />
      )}
      {/* create end */}

      {/* update */}
      {selectedUpdateStudent && showUpdateStudentModal && (
        <UpdateStudent
          onStudentUpdate={handleUpdateStudent}
          onClose={() => setShowUpdateStudentModal(false)}
          students={selectedUpdateStudent}
        />
      )}
      {/* update end */}
    </div>
  );
}

function DetailStudent({ students, onClose }) {
  const formattedDateOfBirthDetail = format(
    new Date(students.dateOfBirth),
    "dd-MM-yyyy"
  );
  const formattedIssueDateDetail = format(
    new Date(students.idCard.issueDate),
    "dd-MM-yyyy"
  );

  return (
    <div className="card">
      <button onClick={onClose}>x</button>
      <div className="card-body">
        <h5 className="card-title text-center">Name : {students.name}</h5>
        <p className="card-body">Email : {students.email}</p>
        <p className="card-body">Phone : {students.phone}</p>
        <p className="card-body">
          Date of birth : {formattedDateOfBirthDetail}
        </p>
        <p className="card-body">Issue Date : {formattedIssueDateDetail}</p>
      </div>
    </div>
  );
}

function CreateStudent({ onCreate, onCloseCreate }) {
  const url = "http://localhost:9000/v1/student";
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const handleClose = () => {
    onCloseCreate();
  };

  const generatedRandomCardNumber = () => {
    return Math.floor(Math.random() * 100000000) + 1;
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    const formattedDateOfBirth = format(new Date(dateOfBirth), "yyyy-MM-dd");
    const formattedIssueDate = format(new Date(issueDate), "yyyy-MM-dd");
    const idCard = {
      cardNumber: generatedRandomCardNumber(),
      issueDate: formattedIssueDate,
    };
    const newStudent = {
      name,
      dateOfBirth: formattedDateOfBirth,
      email,
      phone,
      idCard,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        onCreate(data);
        // kode dibawah ini fungsinnya untuk mengosongkan input setelah user berhasil create
        setName("");
        setDateOfBirth("");
        setEmail("");
        setPhone("");
        setCardNumber("");
        setIssueDate("");
      })
      .catch((error) => {
        alert("error when creating student" + error);
        console.error("error when creating student" + error);
      });
  };
  return (
    <div className="card">
      <button onClick={handleClose}>x</button>
      <div className="card-body">
        <h5 className="card-title">Create a Student</h5>
        <form onSubmit={handleSubmitStudent}>
          <div className="form-group">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth : </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number : </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="cardNumber">Card Number : </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="issueDate">Issue Date : </label>
            <input
              type="date"
              className="form-control"
              id="issueDate"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

function UpdateStudent({ onStudentUpdate, onClose, students }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const handleCloseUpdate = () => {
    onClose();
  };

  const handleSubmitUpdateStudent = (e) => {
    e.preventDefault();
    const updatedStudent = {
      name,
      email,
      phone,
      dateOfBirth,
      cardNumber,
      issueDate,
    };

    fetch(`http://localhost:9000/v1/student/${students.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        onStudentUpdate(data);
        handleCloseUpdate();
      })
      .catch((error) => {
        alert("error when update student data" + error);
        console.error("error when update student data" + error);
      });
  };
  return (
    <div className="card">
      <button onClick={handleCloseUpdate}>x</button>
      <div className="card-body">
        <div className="card-title">Update Student</div>
        <form onSubmit={handleSubmitUpdateStudent}>
          <div className="form-group">
            <label htmlFor="name">Name Student : </label>
            <input
              type="text"
              className="form-control"
              id="updateNameStudent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number Student : </label>
            <input
              type="number"
              className="form-control"
              id="updatePhoneStudent"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Student : </label>
            <input
              type="text"
              className="form-control"
              id="updateEmailStudent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="card number">Card Number Student : </label>
            <input
              type="number"
              className="form-control"
              id="updateCardNumberStudent"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date of birth">Date of Birth Student : </label>
            <input
              type="date"
              className="form-control"
              id="updateDateOfBirthStudent"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issue date">issue date Student : </label>
            <input
              type="date"
              className="form-control"
              id="updateIssueDateStudent"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Student;
