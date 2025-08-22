import { useState } from 'react';

function NewContact(props) {
    const {contacts, setContacts} = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState(''); // Added address state

    async function createContact(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address // Include address in the request body
            })
        });

        const data = await response.json();

        if (data.id) {
            setContacts([...contacts, data]);
        }

        setName('');
        setAddress(''); // Reset address field after creation
    }

	return (
        <form className='new-contact' onSubmit={createContact}>            
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            <button className='button green' type='submit'>Create Contact</button>
        </form>
	);
}

export default NewContact;