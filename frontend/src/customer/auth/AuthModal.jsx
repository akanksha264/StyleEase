import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 12,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className="mt-2">
            {location.pathname === "/register" ? <RegisterForm /> : <LoginForm />}
          </div>
          
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
