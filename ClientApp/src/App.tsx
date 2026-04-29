import { useEffect, useState } from "react";
import { Button, ToastProvider } from "@heroui/react";

import LoginForm from "./LoginForm";
import useLoggedInUserContext from "@/Context/LoggedInUserContext";

type Forecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
};

function App() {
  const { status, user, logout } = useLoggedInUserContext();
  const [forecasts, setForecasts] = useState<Forecast[]>();

  useEffect(() => {
    if (status !== "authenticated" || !user?.id) {
      setForecasts(undefined);
      return;
    }

    void populateWeatherData();
  }, [status, user?.id]);

  const contents =
    status === "loading" ? (
      <section>Loading</section>
    ) : user === null ? (
      <LoginForm />
    ) : (
      <section className="col-span-full md:col-span-8 md:col-start-3 mt-8">
        <div className="flex items-center justify-between mb-4">
          <p>
            Logged in as <strong>{user?.username}</strong>
          </p>
          <Button variant="danger-soft" onPress={logout}>
            Logout
          </Button>
        </div>
        <table aria-labelledby="tableLabel" className="w-full">
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
      </section>
    );

  return (
    <div className="w-full max-w-7xl bg-zinc-50">
      <ToastProvider />
      <main className="grid grid-cols-[repeat(12,1fr)] max-w-7xl">
        {contents}
      </main>
    </div>
  );

  async function populateWeatherData() {
    const response = await fetch("/api/weatherforecast", {
      credentials: "include",
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
