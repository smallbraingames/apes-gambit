import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { LoadingContext, LoadingState } from "../../context/LoadingContext";

import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import SpawnPieceIfNecessary from "./SpawnPieceIfNecessary";
import { useEffect } from "react";

const Lobby = () => {
  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        <div className="absolute p-6">
          <SpawnPieceIfNecessary />
          <CenterActivePieceOnLoad />
        </div>
      </div>
    </>
  );
};

export default Lobby;
