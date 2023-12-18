import { useState, useEffect } from "react";
import { Carousel } from '@mantine/carousel';
import styles from "./app.module.css";

const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&past_days=1&forecast_days=2";

const sliderStyle = {
  initialSlide: 2,
  fontSize: 20,
  slideSize: "70%",
  height: 300,
  controlsOffset: "xl",
  align: "center",
  styles: {
    slide: {
      background: "#FFF8E5",
      display: "flex",
      alignItems: "center",
      paddingLeft: "40px",
      borderRadius: "30px",
      marginRight: "20px",
      marginLeft: "20px",
      fontSize: "42px",
      fontWeight: "600"
    }
  }
}

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function App() {
  const [weather, setWeather] = useState({current: {}, daily: [], isLoading: true, hasError: false});

  const days = ["вчера", "сегодня", "завтра"];

  const getData = () => {
    return fetch(API)
      .then(checkResponse)
      .then(response => setWeather({...weather, current: response.current, daily: response.daily, isLoading: false}))
      .catch(e => setWeather({...weather, isLoading: false, hasError: true}));
  };

  useEffect(() => {
      getData();
  }, []);


  return (
    <div className="page">
      <h1 className={styles.currentText}>Сейчас: <p> {weather.current.temperature_2m}° </p></h1> 

      <div className={styles.app}>
        <Carousel {...sliderStyle}>
          {weather.daily.length > 0 && weather.daily.temperature_2m_min.map((temp, index) => (
            <Carousel.Slide key={index}> {days[index]}: {temp}° </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
  }

export default App;