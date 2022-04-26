import { Spinner } from "@chakra-ui/react";
import React from "react";
import CenterOnPage from "../centerOnPage/CenterOnPage.jsx";

function Loader() {
  return (
    <CenterOnPage>
      <Spinner />
    </CenterOnPage>
  );
}

export default Loader;
