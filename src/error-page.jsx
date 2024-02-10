import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography variant="h2">Oops!</Typography>
      <Typography variant="body1">Sorry, an unexpected error has occurred.</Typography>
      <Typography variant="body2">
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Box>
  );
}
