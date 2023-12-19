import { useEffect, useState } from "react";

function Region() {
  const url = "http://localhost:9000/v1/region";
  const [region, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [createRegionButton, setCreateRegionButton] = useState(false);
  const [showUpdateRegionModal, setShowUpdateRegionModal] = useState(false);
  const [selectedUpdateRegion, setSelectedUpdateRegion] = useState(null);

  const openCreateRegion = () => {
    setCreateRegionButton(true);
  };

  const closeCreateRegion = () => {
    setCreateRegionButton(false);
  };

  const handleCreateRegion = (newRegion) => {
    setRegions([...region, newRegion]);
  };

  const openDetailRegions = (region) => {
    setSelectedRegion(region);
  };

  const closeDetailRegions = () => {
    setSelectedRegion(null);
  };

  const openUpdateModal = (region) => {
    setSelectedUpdateRegion(region);
    setShowUpdateRegionModal(true);
  };

  const handleUpdateRegion = (updateRegion) => {
    const updatedRegion = region.map((regions) => {
      if (regions.id === updateRegion.id) {
        return updateRegion;
      } else {
        return regions;
      }
    });
    setRegions(updatedRegion);
  };

  const handleDeleteRegion = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const updateRegions = region.filter((regions) => regions.id !== id);
        setRegions(updateRegions);
      })
      .catch((error) => {
        alert("Error when delete" + error);
        console.error("error when delete" + error);
      });
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => {
        alert("Error when parsing data" + error);
        console.error("error when parsing data" + error);
      });
  }, []);

  return (
    <div className="container">
      <div className="heading">List Of Regions</div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {region.map((region, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{region.name}</td>
              <td>
                <button onClick={() => openDetailRegions(region)}>
                  <span className="material-symbols-outlined">info</span>
                </button>
                <button onClick={() => openUpdateModal(region)}>
                  <span className="material-symbols-outlined">update</span>
                </button>
                <button onClick={() => handleDeleteRegion(region.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* create */}
      <button onClick={openCreateRegion}>Create New Region</button>
      {createRegionButton && (
        <CreateRegion
          onCreate={handleCreateRegion}
          onClose={closeCreateRegion}
        />
      )}
      {/* create end */}

      {/* detail */}
      {selectedRegion && (
        <RegionDetails region={selectedRegion} onClose={closeDetailRegions} />
      )}
      {/* detail end */}

      {/* update */}
      {selectedUpdateRegion && showUpdateRegionModal && (
        <UpdateRegion
          onUpdate={handleUpdateRegion}
          onClose={() => setShowUpdateRegionModal(false)}
          region={selectedUpdateRegion}
        />
      )}
      {/* update end */}
    </div>
  );
}

function RegionDetails({ region, onClose }) {
  const [country, setCountry] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/v1/country")
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        alert("error when get country list" + error);
        console.error("error when get country list" + error);
      });
  }, []);

  useEffect(() => {
    if (country.length > 0 && region) {
      const filtered = country.filter(
        (c) => c.region.id === region.id || c.regionId === region.id
      );
      setFilteredCountries(filtered);
    }
  }, [country, region]);

  return (
    <div className="card">
      <button onClick={onClose}>x</button>
      <div className="card-body">
        <h5 className="card-title">{region.name}</h5>
        <p className="card-body">{region.id}</p>
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CreateRegion({ onCreate, onClose }) {
  const [name, setName] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newRegion = { name };

    fetch("http://localhost:9000/v1/region", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegion),
    })
      .then((response) => response.json())
      .then((data) => {
        onCreate(data);
        setName("");
      })
      .catch((error) => {
        alert("error when create region" + error);
        console.error("error when create region" + error);
      });
  };

  return (
    <div className="card">
      <div className="card">
        <button onClick={handleClose}>X</button>
        <div className="card-body">
          <div className="card-title">create new region</div>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="regionName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function UpdateRegion({ onUpdate, onClose, region }) {
  const [name, setName] = useState("");

  const handleClose = () => {
    onClose();
  };

  // (e) itu artinya event yang maksudnya adalah sifat browser bawaan
  const handleSubmitUpdate = (e) => {
    // lalu e.preventDefault() maksudnya adalah menghilangkan sifat bawaan browser dimana sifat bawaannya adalah harus merefresh setiap terjadi sesuatu
    // sehingga kita tidak perlu me refresh apabila setelah melakukan update ini
    e.preventDefault();
    const updatedRegion = { name };

    fetch(`http://localhost:9000/v1/region/${region.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRegion),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data);
        handleClose();
      })
      .catch((error) => {
        alert("error when updating region" + error);
        console.error("error when updating region" + error);
      });
  };

  return (
    <div className="card">
      <button onClick={handleClose}>X</button>
      <div className="card-body">
        <div className="card-title">Update Region</div>
        <form onSubmit={handleSubmitUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name Region :</label>
            <input
              type="text"
              className="form-control"
              id="updateName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
export default Region;
