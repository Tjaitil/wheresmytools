import { ToastProvider } from "@heroui/react";
import useLoggedInUserContext from "@/Context/LoggedInUserContext";
import LoginPage from "@/Pages/LoginPage.tsx";
import DashboardPage from "@/Pages/DashboardPage.tsx";

function App() {
  const { user } = useLoggedInUserContext();
  const contents = user === null ? <LoginPage /> : <DashboardPage />;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ToastProvider />
      {contents}
    </div>
  );
}

export default App;
