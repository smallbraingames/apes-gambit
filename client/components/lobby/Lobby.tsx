import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { LoadingContext, LoadingState } from "../../context/LoadingContext";

import SpawnPiece from "./SpawnPiece";
import { useEffect } from "react";

const Lobby = () => {
  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        <div className="absolute p-6">
          <SpawnPiece />
        </div>
      </div>
    </>
  );
};

export default Lobby;
