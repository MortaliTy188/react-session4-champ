import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { styled } from "@mui/system";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "lightgreen", 
  position: "relative",
  padding: theme.spacing(1, 2),
}));

const Logo = styled(Typography)(({ theme }) => ({
  backgroundColor: "darkgreen", 
  borderRadius: "50%",
  padding: "25px 10px", 
  color: "white",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  margin: "0px 0px 0px 70px", 
  backgroundColor: "white", 
  padding: theme.spacing(1, 2),
  borderRadius: "20px", 
  width: "80%", 
}));

const Header = ({ onSearchChange }) => {
  return (
    <CustomAppBar>
      <Toolbar>
        <Logo variant="h6">Логотип</Logo>

        <Box flexGrow={1}>
          <SearchInput
            placeholder="Введите для поиска"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
