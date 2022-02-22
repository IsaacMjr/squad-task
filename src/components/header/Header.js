import React, { useState } from "react";
import "./header.css";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import { Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, MenuItem } from "@material-ui/core";
import { auth } from "../../squad-config";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "light grey",
  },
  avatar: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  IconBtn: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    boxShadow: "0px 0px  5px lightgrey",
  },
  btn: {
    marginLeft: theme.spacing(1),
  },
}));

function Header({ signInWithGoogle, user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const authMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="header-lg">
        <Link to="/">
          <img src={logo} alt="header" className="header-logo" />
          <p className="header-title"> squad task</p>
        </Link>
      </div>
      <div className="header-nav">{/* <h3> Navigation</h3> */}</div>
      <div className="header-btn">
        {!user ? (
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="outlined"
            color="default"
            startIcon={<ExitToAppIcon />}
            onClick={authMenu}
          >
            SIGN UP
          </Button>
        ) : (
          <div className="header-btn-avatar">
            <IconButton className={classes.IconBtn} size="small">
              <AddIcon fontSize="large" />
            </IconButton>
            <Avatar className={classes.avatar} src={user.photoURL} />
            <Button
              className={classes.btn}
              variant="outlined"
              color="default"
              startIcon={<ExitToAppIcon />}
              onClick={() => auth.signOut()}
            >
              SIGN OUT
            </Button>
          </div>
        )}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Button
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
            >
              <img src={google} className="header-btn-img" alt="" />
              Login with google
            </Button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
