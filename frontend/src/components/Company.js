import React, { useState } from "react";

const Company = ({ company, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(company.company_name);
    const [address, setAddress] = useState(company.company_address);

    const handleDelete = () => {
        fetch(`/api/companies/${company.company_id}`, { method: "DELETE" })
            .then(() => onDelete(company.company_id))
            .catch((err) => console.error(err));
    };

    const handleUpdate = () => {
        fetch(`/api/companies/${company.company_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                company_name: name,
                company_address: address,
                contact_id: company.contact_id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                onUpdate(data);
                setIsEditing(false);
            })
            .catch((err) => console.error(err));
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </td>
                    <td>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} />
                    </td>
                    <td>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{company.company_name}</td>
                    <td>{company.company_address}</td>
                    
                    <td style={{ textAlign: "right" }}>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="button red" onClick={handleDelete}>
                            Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Company;
