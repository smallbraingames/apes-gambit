import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";

import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import { useEffect } from "react";

const Lobby = () => {
  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        <div className="absolute p-6">
          <CenterActivePieceOnLoad />
        </div>
      </div>
    </>
  );
};

export default Lobby;
