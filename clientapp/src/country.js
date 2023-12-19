import { useEffect, useState } from "react";

function Country() {
  const url = "http://localhost:9000/v1/country";
  // useState([]); itu maksudnya nilai awalnya berupa apa. bisa array kosong, bisa tipenya null, bisa juga boolean
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [createCountryButton, setCreateCountryButton] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdateCountry, setSelectedUpdateCountry] = useState(null);

  useEffect(() => {
    fetch(url)
      // disini kita mengambil data yang awalnya bentuknya response dan diubah ke json dikarenakan js lebih mudah mengolah dan dimengerti oleh javscript
      .then((response) => response.json())
      // lalu menyimpan data tersebut menggunakan setCountries dan disimpan ke countries
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        alert("error when fetching data : " + error);
      });
  }, []);

  const handleCreate = (newCountry) => {
    // codingan dibawah ini  maksudnya adalah membuat array baru yang isinya adalah countries yang sudah ada ditambah dengan nilai newCountry lalu disimpan ke countries (line 6) menggunakan setCountries
    setCountries([...countries, newCountry]);
  };

  // ini maksudnya merubah nilai createCountryButton menjadi false apabila ditutup
  const closeCreateCountry = () => {
    setCreateCountryButton(false);
  };

  const openCreateCountry = () => {
    setCreateCountryButton(true);
  };

  // inituh maksudnya mengatur nilai selected country agar mempunyai nilai country di bagian
  //{selectedCountry && (
  // <CountryDetail country={selectedCountry} onClose={closeCountryDetail} />
  // )}
  // tujuan agar selectedCountry harus mempunyai sebuah nilai adalah agar codingan di atas pada bagian countryDetail itu dipanggil
  const showCountryDetail = (country) => {
    setSelectedCountry(country);
  };

  // lalu ini digunakan untuk menutup detail  sehingga nilainya menjadi null lagi
  const closeCountryDetail = () => {
    setSelectedCountry(null);
  };

  const handleShowUpdateModal = (country) => {
    setSelectedUpdateCountry(country);
    setShowUpdateModal(true);
  };

  // tujuan dari handleUpdate ini adalah untuk mengecek, apakah ada perubahan berdasarkan id yang sesuai dengan country id
  // apabila ada, maka buat updatedCountries memiliki nilai updatedCountry lalu setCountries dengan nilai tersebut
  // Jadi, prinsipnya begini : handleUpdate memeriksa perubahan berdasarkan ID yang sesuai dengan ID negara yang ingin diperbarui.
  // Jika ditemukan kesamaan ID, updatedCountry akan menggantikan nilai negara yang sudah ada dalam array countries, kemudian array countries yang baru akan disimpan menggunakan setCountries.
  const handleUpdate = (updatedCountry) => {
    const updatedCountries = countries.map((country) =>
      country.id === updatedCountry.id ? updatedCountry : country
    );
    setCountries(updatedCountries);
  };
  // ini bisa juga seperti ini
  // const handleUpdate = (updatedCountry) => {
  //   const updatedCountries = countries.map((country) => {
  //     if (country.id === updatedCountry.id) {
  //       return updatedCountry; // Jika id sama, kembalikan updatedCountry
  //     } else {
  //       return country; // Jika id tidak sama, kembalikan negara aslinya tanpa perubahan
  //     }
  //   });
  //   setCountries(updatedCountries); // Perbarui state countries dengan array yang telah diperbarui
  // };

  // lakukan penghapusan menggunakan fetch
  const handleDelete = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // setelah itu filter setiap nilai yang ada didalam countries berdasarkan id nya. (apabila country berdasarkan id tersebut ada maka simpan ke updateCounnaries)
        const updateCounries = countries.filter((country) => country.id !== id);
        // setelah itu set nilai countries mengguunakan setCountries berdasarkan hasil filter dari updateCounnaries
        setCountries(updateCounries);
      })
      .catch((error) => {
        alert("Error when deleting country" + error);
        console.error("error when deleting country" + error);
      });
  };

  return (
    <div className="container">
      <h1 className="heading text-center">Daftar negara</h1>

      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col-1">No</th>
            <th scope="col-3">Name</th>
            {/* <th scope="col">Code</th> */}
            <th scope="col-3">Region</th>
            <th scope="col-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={country.id} className="text-center">
              <td className="">{index + 1}</td>
              <td className="">{country.name}</td>
              {/* <td>{country.code}</td> */}
              <td className="">{country.region.name}</td>
              <td>
                <button
                  className="ms-3"
                  onClick={() => showCountryDetail(country)}
                >
                  <span className="material-symbols-outlined ">info</span>
                </button>
                <button onClick={() => handleShowUpdateModal(country)}>
                  <span className="material-symbols-outlined">update</span>
                </button>
                <button onClick={() => handleDelete(country.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateModal && selectedUpdateCountry && (
        <UpdateCountry
          onUpdate={handleUpdate}
          onClose={() => setShowUpdateModal(false)}
          country={selectedUpdateCountry}
        />
      )}
      {selectedCountry && (
        <CountryDetail country={selectedCountry} onClose={closeCountryDetail} />
      )}
      {/* apabila user mengklik button ini, maka akan menjalankan function openCreateCountry dan mengubah nilainya menjadi true*/}
      <button
        onClick={openCreateCountry}
        className="d-flex justify-content-end"
      >
        Create New Country
      </button>
      {/* lalu dibawah ini adalah sebuah kondisi pengecekan, apabila createCountryButton ini memiliki nilai (yang awalnya null) menjadi true, maka function pembuka modal CreateCountry akan dijalankan */}
      {createCountryButton && (
        // maksud dari onCreate ini adalah untuk menampung function handleCreate yang nantinya akan digunakan oleh CreateCountry. itu yang disebut props
        // props ini berfungsi agar function CreateCountry tidak perlu membuat function handleCreate lagi dikarenakan kalau tidak menggunakan props, maka di function country harus membuat handleCreate, dan di function createCountry juga membuat handleCreate. itu yang menyebabkan duplikasi kode
        <CreateCountry onCreate={handleCreate} onClose={closeCreateCountry} />
      )}
    </div>
  );
}

function CreateCountry({ onCreate, onClose }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/v1/region")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => {
        alert("Error when fetching regions: " + error);
        console.error("Error when fetching regions: " + error);
      });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCountry = { name, code, regionId: parseInt(regionId) };

    fetch("http://localhost:9000/v1/country/dto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCountry),
    })
      .then((response) => response.json())
      .then((data) => {
        onCreate(data);
        setName("");
        setCode("");
        setRegionId("");
      })
      .catch((error) => {
        alert("Error when creating a country" + error);
        console.error("Error when creating a country" + error);
      });
  };

  return (
    <div className="card mb-3" data-aos="fade-down">
      <div className="card mb-3" data-aos="fade-down">
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "red",
          }}
        >
          X
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">Create New Country</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
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
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="region">Region:</label>
            <select
              className="form-control"
              id="region"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

function CountryDetail({ country, onClose }) {
  return (
    <div>
      <div className="card mb-3" data-aos="fade-down">
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "red",
          }}
        >
          X
        </button>
        <div className="card-body">
          <h5 className="card-title text-center">{country.name}</h5>
          <p className="card-body text-center">ID country : {country.id}</p>
          <p className="card-body text-center">Code country : {country.code}</p>
          <p className="card-body text-center">
            Region Name : {country.region && country.region.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function UpdateCountry({ onUpdate, onClose, country }) {
  const [code, setCode] = useState(country.code || " ");
  const [name, setName] = useState(country.name || " ");
  const [regionId, setRegionId] = useState(country.regionId || " ");
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/v1/region")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => {
        alert("error when get region data " + error);
        console.error("error when get region data " + error);
      });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const updatedCountry = { name, code, regionId: parseInt(regionId) };

    fetch(`http://localhost:9000/v1/country/${country.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCountry),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data);
        handleClose();
      })
      .catch((error) => {
        alert("Error when updating a country" + error);
        console.error("Error when updating a country" + error);
      });
  };

  return (
    <div className="card mb-3" data-aos="fade-down">
      <div className="card mb-3" data-aos="fade-down">
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "red",
          }}
        >
          X
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">Update Country</h5>
        <form onSubmit={handleSubmitUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
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
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="region">Region:</label>
            <select
              className="form-control"
              id="region"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Country;
