import createObjectRegistry from "./createPhaserObjectRegistry";

export enum AssetType {
  IMAGE,
  SPRITESHEET,
  MULTIATLAS,
}

export type Asset =
  | {
      type: AssetType.IMAGE;
      key: string;
      path: string;
    }
  | {
      type: AssetType.SPRITESHEET;
      key: string;
      path: string;
      options: {
        frameWidth: number;
        frameHeight: number;
      };
    }
  | {
      type: AssetType.MULTIATLAS;
      key: string;
      path: string;
      options: {
        imagePath: string;
      };
    };

export type GameConfig = {
  scenes: { [key: string]: { assets: { [key: string]: Asset } } };
};

export type ObjectRegistry = ReturnType<typeof createObjectRegistry>;
