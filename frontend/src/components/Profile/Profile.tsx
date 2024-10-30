import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import {  useAuth, useRoute } from "../GlobalProviders";


export const Profile = () => {
  const { pageTitle, setPageTitle } = useRoute();
  const { user } = useAuth();

  useEffect(() => {
    setPageTitle("Profile");
  });

  if (!user) {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        You need to login to see this page.
      </Typography>
    );
  }
  return <Box mt={10} textAlign="center"></Box>;
};
