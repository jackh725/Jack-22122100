import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';
import CompanyList from "./CompanyList"; // import CompanyList  


function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

    return (
        <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
        
            <div className='summary'>
                <h3>Contact Summary:</h3>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Address:</strong> {contact.address}</p>
                <p><em>Click the contact to expand or collapse {contact.name}'s phone list</em></p>
                <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>
           
            <div style={expandStyle} onClick={(e) => e.stopPropagation()}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                <CompanyList contactId={contact.id} />
            </div>
        </div>
    );
}

export default Contact;
