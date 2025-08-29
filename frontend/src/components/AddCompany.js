import React, { useState } from "react";

const AddCompany = ({ contactId, onAdd }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name: name,
        company_address: address,
        contact_id: contactId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data); 
        setName("");
        setAddress("");
      })
      .catch((err) => console.error(err));
  };


    return (
        <div className="add-company">
          <h4>Companies</h4>
          <hr />
          <form onSubmit={handleSubmit} className="new-phone">
            <input
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className="button green" type="submit">
              Add Company
            </button>
          </form>
        </div>
      );
    };

    export default AddCompany;
    
    