import { useEffect, useState } from "react";
import useLoggedInUserContext from "@/Context/LoggedInUserContext.ts";
import { Button, toast } from "@heroui/react";
import PageContainer from "@/Components/Layout/PageContainer.tsx";

type Forecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
};

export default function DashboardPage() {
  const { status, user, logout } = useLoggedInUserContext();
  const [forecasts, setForecasts] = useState<Forecast[]>();

  useEffect(() => {
    if (status !== "authenticated" || !user?.id) return;

    const populateWeatherData = async () => {
      const response = await fetch("/api/weatherforecast", {
        credentials: "include",
      });
      try {
        const data: Forecast[] = await response.json();
        setForecasts(data);
      } catch {
        toast("Failed to load data");
      }
    };

    void populateWeatherData();
  }, [status, user?.id]);

  return (
    <PageContainer>
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
    </PageContainer>
  );
}
