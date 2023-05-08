import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Holiday.less';

function App() {

  function handleButtonClick(){
    if (inputValue.trim() !== '') {
      const param1 = inputValue.trim()
      const url = `http://localhost:8000/weather?date=${param1}`;
      window.open(url);
    }
  }

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const options = ['', 'US', 'CA', 'GB', 'AU'];
  const [country, setCountry] = useState(options[0]);
  const [holidays, setHolidays] = useState([]);

  const handleCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    console.log(`Selected option: ${event.target.value}`);

    const response = await fetch(`https://holidayapi.com/v1/holidays?key=d0c34149-fcb6-471c-9954-99019ed2c422&country=${countryCode}&year=2022`);
    const data = await response.json();
    setHolidays(data.holidays);
  };

  return (
    <div>
      <p>choose a country and paste the date into the blank and go on</p>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleButtonClick} disabled={inputValue.trim() === ''}>
          Move next
        </button>
      </div>
      <label htmlFor="countries">Choose a country:</label>
      <select id="countries" onChange={handleCountryChange}>
        <option value="">Select a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="GB">United Kingdom</option>
        <option value="AU">Australia</option>
        {/* Add more options for other countries */}
      </select>

      {holidays.length > 0 && (
        <div>
          <h2>Public Holidays for {country}:</h2>
          <ul>
            {holidays.map((holiday) => (
              <li key={holiday.date}>{`${holiday.name} (${holiday.date})`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
