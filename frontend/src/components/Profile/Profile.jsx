import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import { useAPI, useAuth, useRoute } from "../GlobalProviders";
import { v4 } from "uuid";
import _ from "lodash";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { CommentDialogPaginated } from "../Comment";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";

export const Profile = () => {
  const { pageTitle, setPageTitle } = useRoute();
  const { get } = useAPI();
  const { user } = useAuth();

  useEffect(() => {
    setPageTitle("Profile");
  });
  const [votes, setVotes] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);
  const limit = 5;

  const fetchAllVotes = async () => {
    try {
      setIsLoadingVotes(true);

      const response = await get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/users/${user.userId}/votes`,
      );
      setVotes(response.data);
      setExpanded(new Array(response.data.length).fill(false));
    } finally {
      setIsLoadingVotes(false);
    }
  };

  useEffect(() => {
    fetchAllVotes();
  }, []);
  const [openComments, setOpenComments] = useState(false);
  const [currVoteId, setCurrVoteId] = useState("");

  const handleToggleCommentsDialog = (voteId) => {
    setOpenComments(!openComments);
    setCurrVoteId(voteId);
  };

  if (!user) {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        You need to login to see this page.
      </Typography>
    );
  }
  return (
    <Box mt={10} textAlign="center">
      <CommentDialogPaginated
        openComments={openComments}
        setOpenComments={setOpenComments}
        userId={user.userId}
        voteId={currVoteId}
        voteTitle={
          currVoteId &&
          votes &&
          votes.find((vote) => vote._id === currVoteId).title
        }
      />
    </Box>
  );
};
