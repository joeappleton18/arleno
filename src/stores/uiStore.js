import { useState } from "react";

const uiStore = () => {
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const deployAlert = (message, type) => {
    setAlertOpen(true);
    setAlert(message);
    setAlertType(type);
  };

  return {
    alert,
    setAlert,
    alertOpen,
    setAlertOpen,
    deployAlert,
    alertType,
  };
};

export default uiStore;