import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "../pages/PageLoader";
// import { PageLoader } from "../pages/PageLoader.jsx";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
