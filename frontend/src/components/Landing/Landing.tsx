import React, { useEffect } from "react";

import { useRoute } from "../GlobalProviders";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  CardActionArea,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useMediaQuery } from "@mui/material";

export const Landing = () => {
  const navigate = useNavigate();

  // mobile view check
  const isMobile = useMediaQuery("(max-width:600px)");
  let cardLayout = { maxWidth: 500, margin: "4px" };
  if (isMobile) {
    cardLayout = { width: 500, margin: "4px" };
  }

  const { pageTitle, setPageTitle } = useRoute();
  useEffect(() => {
    setPageTitle("Landing");
  });
  return <Box mt={10}></Box>;
};
