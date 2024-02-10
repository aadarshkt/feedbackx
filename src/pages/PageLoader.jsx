import { Box } from "@mui/material";

export const PageLoader = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
      }}>
      <img src={loadingImg} alt="Loading..." />
    </Box>
  );
};
