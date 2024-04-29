import "./MyForm.css";
import React, { useState } from "react";
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';


interface FormData {
  venueTitle: string;
  altName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  parkingInfo: string;
  showParkingFee: boolean;
  parkingFee: string;
}

interface FormErrors {
  venueTitle: boolean;
  altName: boolean;
  address: boolean;
  city: boolean;
  country: boolean;
  state: boolean;
  zip: boolean;
  parkingInfo: boolean;
  parkingFee: boolean;
}

const App: React.FC = () => {
  const [formList, setFormList] = useState<FormData[]>([
    {
      venueTitle: "Test",
      altName: "",
      address: "Jalija",
      city: "Zenica",
      country: "Bosnia and Herzegovina",
      state: "",
      zip: "00000",
      parkingInfo: "",
      showParkingFee: false,
      parkingFee: ""
    },
  ]);
  const [errors, setErrors] = useState<FormErrors[]>(
    formList.map(() => ({
      venueTitle: false,
      altName: false,
      address: false,
      city: false,
      country: false,
      state: false,
      zip: false,
      parkingInfo: false,
      parkingFee: false
    }))
  );
  const addForm = () => {
    const newFormData = {
      venueTitle: "",
      altName: "",
      address: "",
      city: "",
      country: "",
      state: "",
      zip: "",
      parkingInfo: "",
      showParkingFee: false,
      parkingFee: ""
    };

    const newFormError = {
      venueTitle: false,
      altName: false,
      address: false,
      city: false,
      country: false,
      state: false,
      zip: false,
      parkingInfo: false,
      parkingFee: false
    };

    setFormList((prevFormList) => [...prevFormList, newFormData]);
    setErrors((prevErrors) => [...prevErrors, newFormError]);
  };

  const copyForm = (index: number) => {
    const copiedForm = { ...formList[index] };
    const updatedForms = [...formList];
    updatedForms.splice(index + 1, 0, copiedForm);
    const updatedErrors = [...errors];
    updatedErrors.splice(index + 1, 0, { ...errors[index] });
  
    setFormList(updatedForms);
    setErrors(updatedErrors);
  };
  
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedForms = [...formList];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: name === "zip" ? value.padStart(5, "0") : value,
    };
    setFormList(updatedForms);
  };

  const handleCountryChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedForms = [...formList];
    updatedForms[index] = {
      ...updatedForms[index],
      country: event.target.value,
    };
    setFormList(updatedForms);
  };

  const handleStateChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedForms = [...formList];
    updatedForms[index] = { ...updatedForms[index], state: event.target.value };
    setFormList(updatedForms);
  };

  const handleParkingInfoChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedForms = [...formList];
    updatedForms[index] = {
      ...updatedForms[index],
      parkingInfo: event.target.value,
    };
    setFormList(updatedForms);
  };

  const handleShowParkingFeeChange = (
    index: number,
    newValue: boolean
  ) => {
    const updatedForms = [...formList];
    updatedForms[index] = {
      ...updatedForms[index],
      showParkingFee: newValue,
    };
    setFormList(updatedForms);
  };

  const handleParkingFeeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedForms = [...formList];
    updatedForms[index] = {
      ...updatedForms[index],
      parkingFee: value,
    };
    setFormList(updatedForms);
  };

  const isFormValid = () => {
      return formList.every(formData => {
      return (
        formData.venueTitle.trim() !== "" &&
        formData.altName.trim() !== "" &&
        formData.address.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.country !== "" &&
        formData.state !== "" &&
        formData.zip !== "" &&
        formData.parkingInfo.trim() !== "" &&
        (!formData.showParkingFee || formData.parkingFee.trim() !== "")
      );
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    const formData = formList[index];
  
    const fieldErrors: FormErrors = {
      venueTitle: !formData.venueTitle.trim(),
      altName: !formData.altName.trim(),
      address: !formData.address.trim(),
      city: !formData.city.trim(),
      country: !formData.country,
      state: !formData.state,
      zip: !formData.zip,
      parkingInfo: !formData.parkingInfo.trim(),
      parkingFee: formData.showParkingFee && !formData.parkingFee.trim()
    };
  
    const newErrors = [...errors];
    newErrors[index] = fieldErrors;
  
    const hasError = Object.values(fieldErrors).some((error) => error);
    if (!hasError && isFormValid()) {
      console.log("Form data is valid:", formData);
      } else {
          console.log("Form data is not valid");
    }
  
    setErrors(newErrors);
  };
  
  return (
    <div>
    <div className="Title">
      <div className="title-text">Locations</div>
      <div className="add-button">
        <button onClick={addForm}>+ Add new location</button>
      </div>
    </div>

      <div className="form-container">
        {formList.map((formData, index) => (
          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className="form-header">
              <button className="copy-button" onClick={() => copyForm(index)}>
              <FontAwesomeIcon icon={faCopy} /> Copy
              </button>
            </div>
            <div>
              <label htmlFor={`venueTitle-${index}`}>Venue Title:</label>
              <input
                type="text"
                id={`venueTitle-${index}`}
                name="venueTitle"
                value={formData.venueTitle}
                onChange={(e) => handleInputChange(index, e)}
              />
               {errors[index].venueTitle && (
    <span className="error-message">Venue Title is required</span>
  )}
            </div>
            <div>
              <label htmlFor={`altName-${index}`}>Alt Name:</label>
              <input
                type="text"
                id={`altName-${index}`}
                name="altName"
                value={formData.altName}
                onChange={(e) => handleInputChange(index, e)}
              />
              
              <small>
                Example: Gym 1, Gym 2, Gym 3. Leave blank if not using.
              </small>
            </div>
            <hr />
            <div className="address-container">
              <div>
                <label htmlFor={`address-${index}`}>Address:</label>
                <input
                  type="text"
                  id={`address-${index}`}
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {errors[index].address && <span className="error-message">Adress is required</span>}
              </div>
              <div>
                <label htmlFor={`city-${index}`}>City:</label>
                <input
                  type="text"
                  id={`city-${index}`}
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange(index, e)}
              
                />
                {errors[index].city && <span className="error-message">City is required</span>}
              </div>
            </div>
            <div>
              <label htmlFor={`country-${index}`}>Country:</label>
              <select
                id={`country-${index}`}
                name="country"
                value={formData.country}
                onChange={(e) => handleCountryChange(index, e)}
                
              >
                <option value="">Select Country</option>
                <option value="Bosnia and Herzegovina">
                <FontAwesomeIcon icon={faFlag} /> Bosnia and Herzegovina
                </option>
                <option value="Hrvatska">Hrvatska</option>
                <option value="Bangladeš">Bangladeš</option>
                <option value="Srbija">Srbija</option>
                <option value="Slovenija">Slovenija</option>
                <option value="Crna Gora">Crna Gora</option>
                <option value="Sjeverna Makedonija">Sjeverna Makedonija</option>
              </select>
              {errors[index].country && <span className="error-message">Country is required</span>}
            </div>
            <div className="state-container">
              <div>
                <label htmlFor={`state-${index}`}>State:</label>
                <select
                  id={`state-${index}`}
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleStateChange(index, e)}
                 
                >
                  <option value="">Select State</option>
                  <option value="Federacija Bosna i Hercegovina">
                    Federacija Bosna i Hercegovina
                  </option>
                </select>
                {errors[index].state && <span className="error-message">State is required</span>}
              </div>
              <div>
                <label htmlFor={`zip-${index}`}>ZIP:</label>
                <input
                  type="text"
                  id={`zip-${index}`}
                  name="zip"
                  value={formData.zip}
                  onChange={(e) => handleInputChange(index, e)}
                 
                />
                {errors[index].zip &&<span className="error-message">Zip/Postal is required</span>}
              </div>
            </div>
            <hr />
            <div>
              <label>Parking Fee:</label>
              <Switch
                checked={formData.showParkingFee}
                onChange={(event) => handleShowParkingFeeChange(index, event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            {formData.showParkingFee && (
              <div>
                <label htmlFor={`parkingFee-${index}`}>Parking Fee:</label>
                <input
                  type="text"
                  id={`parkingFee-${index}`}
                  name="parkingFee"
                  value={formData.parkingFee}
                  onChange={(e) => handleParkingFeeChange(index, e)}
                />
                {errors[index].parkingFee && <span className="error-message">Parking Fee is required</span>}
              </div>
            )}
            <div>
              <label htmlFor={`parkingInfo-${index}`}>Parking Info:</label>
              <textarea
                id={`parkingInfo-${index}`}
                name="parkingInfo"
                value={formData.parkingInfo}
                onChange={(e) => handleParkingInfoChange(index, e)}
               
              ></textarea>
               {errors[index].parkingInfo && <span className="error-message">Parking Info is required</span>}
            </div>
            <div className="button-container">
              <button type="button" className="cancel">Cancel</button>
              <button type="submit" className="submit">Submit</button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default App;
