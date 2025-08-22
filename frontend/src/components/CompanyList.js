import React, { useState, useEffect } from "react";
import Company from "./Company";
import AddCompany from "./AddCompany";

const CompanyList = ({ contactId }) => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contactId + '/companies')
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error(err));
    }, [contactId]);

    const addCompany = (company) => setCompanies([...companies, company]);
    const deleteCompany = (id) =>
        setCompanies(companies.filter((c) => c.company_id !== id));
    const updateCompany = (updated) =>
        setCompanies(
            companies.map((c) =>
                c.company_id === updated.company_id ? updated : c
            )
        );

    return (
        <div className="company-list">
            <AddCompany contactId={contactId} onAdd={addCompany}/>

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => {
                        return (
                            <Company
                                key={company.company_id}
                                company={company}
                                companies={companies}
                                setCompanies={setCompanies}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;
