import { useAuth0 } from "@auth0/auth0-react";

export const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>
          <p>
            <span>{error.message}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <p>Put Some some UI</p>
    </div>
  );
};
