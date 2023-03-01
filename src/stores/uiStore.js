import { useState } from "react";

const uiStore = () => {
  const [alert, setAlert] = useState("");
  const [readingMode, setReadingMode] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true); // side menu on all layouts
  const [readingDrawerOpen, setReadingDrawerOpen] = useState(false);

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
    loading,
    setLoading,
    hideMenu,
    setHideMenu,
    readingMode,
    setReadingMode,
    readingDrawerOpen,
    setReadingDrawerOpen,
    drawerOpen,
    setDrawerOpen
  };
};

export default uiStore;
