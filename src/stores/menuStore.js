import { useState } from "react";
import pages from "../../pages.json";

const menuStore = () => {
  const [menuItems, setMenuItems] = useState(pages);
  if (!pages) throw "pages were not indexed";
  return { menuItems, setMenuItems };
};

export default menuStore;
