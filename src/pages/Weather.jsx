import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Weather.less';

import axios from "axios";

const API_KEY = '0590e5fff95c9a16a5b2e952b818a305';
const searchParams = new URLSearchParams(window.location.search);
const date = searchParams.get('date');

const mockData = [[1,"streetA","111$"],[2,"streetB","222$"]];

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [accommodation, setAccommodation] = useState(null);

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&dt=${date}&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Select a city:</label>
        <select id="city" value={city} onChange={handleChangeCity}>
          <option value="">--Please choose a city--</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
        </select>

        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Accommodation(mock): </p>
          <table>
            <tbody>
              {mockData.map((row, i) => (
                <tr key={i}>
                  {row.map((value, j) => (
                    <td key={`${i}-${j}`}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
