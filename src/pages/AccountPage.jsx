import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Typography } from "@mui/material";

export const AccountPage = () => {
  const { user } = useAuth0();
  return (
    <div>
      <Avatar src={user.picture} alt="Profile Image" />
      <Typography variant="h5">Hello {user.name}!</Typography>
    </div>
  );
};
