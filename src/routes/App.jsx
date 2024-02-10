import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AuthenticationGuard } from "../components/AuthenticationGuard";
import { PageLoader } from "../pages/PageLoader";
import { CallbackPage } from "../pages/CallbackPage";
import { AccountPage } from "../pages/AccountPage";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Routes>
      <Route path="/" element={<AuthenticationGuard component={HomePage} />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/user-account" element={<AccountPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
