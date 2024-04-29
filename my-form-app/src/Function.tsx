import React, { useState } from 'react';
import './MyForm.css';
interface LocationData {
    [key: string]: string;
    venuetitle: string;
    altname: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zip: string;
    parkingInfo: string;
  }
  
const MyForm: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([
    {
      venuetitle: 'Test',
      altname: '',
      address: 'Jalija',
      city: 'Zenica',
      country: 'Bosnia and Herzegovina',
      state: '',
      zip: '00000',
      parkingInfo: ''
    }
  ]);

  const addNewLocation = () => {
    // Napravimo kopiju cijelog stanja lokacija
    const newLocations = [...locations];
    // Dodamo novu lokaciju na kraju kopije
    newLocations.push({
      venuetitle: 'Test',
      altname: '',
      address: '',
      city: '',
      country: '',
      state: '',
      zip: '',
      parkingInfo: ''
    });
    // Postavimo novo stanje sa dodanom lokacijom
    setLocations(newLocations);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    const newLocations = [...locations];
    newLocations[index][name] = name === 'zip' ? value.padStart(5, '0') : value;
    setLocations(newLocations);
  };

  // Implement other handle functions similarly...

  const handleSubmit = (event: React.FormEvent, index: number) => {
    event.preventDefault();
    console.log(locations[index]); // Handle form submission
  };

  return (
    <div>
      {locations.map((location, index) => (
        <div key={index}>
          <h3>Location {index + 1}</h3>
          <form onSubmit={(e) => handleSubmit(e, index)}>
            {/* Form fields */}
            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
      <button onClick={addNewLocation}>Add new location</button>
    </div>
  );
};

export default MyForm;
