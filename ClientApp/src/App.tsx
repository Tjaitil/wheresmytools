import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

type Forecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
};

function App() {
  const jwtToken = localStorage.getItem("jwtToken");

  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken);
  const [forecasts, setForecasts] = useState<Forecast[]>();

  useEffect(() => {
    if (isAuthenticated) {
      void populateWeatherData();
    }
  }, [isAuthenticated]);

  const contents = !isAuthenticated ? (
    <LoginForm
      onLoginSuccess={(token) => {
        localStorage.setItem("jwtToken", token);
        setIsAuthenticated(true);
      }}
    />
  ) : (
    <table
      aria-labelledby="tableLabel"
      className="col-span-full md:col-span-8 md:col-start-3"
    >
      <thead>
        <tr>
          <th className="text-left">Date</th>
          <th className="text-left">Temp. (C)</th>
          <th className="text-left">Temp. (F)</th>
          <th className="text-left">Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts?.map((forecast) => (
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="w-[calc(100%-2rem)] md:w-full max-w-7xl mx-auto h-screen grid grid-cols-[repeat(12,1fr)]">
      {contents}
    </div>
  );

  async function populateWeatherData() {
    const response = await fetch("/api/weatherforecast", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    try {
      const data: Forecast[] = await response.json();
      setForecasts(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      return;
    }
  }
}

export default App;
