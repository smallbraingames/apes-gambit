import { Asset, AssetType } from "./types";

import { deferred } from "@latticexyz/utils";

const load = async (scene: Phaser.Scene, asset: Asset) => {
  const loader = scene.load;
  if (asset.type === AssetType.IMAGE) {
    loader.image(asset.key, asset.path);
  } else if (asset.type === AssetType.SPRITESHEET) {
    loader.spritesheet(asset.key, asset.path, asset.options);
  } else if (asset.type === AssetType.MULTIATLAS) {
    loader.multiatlas(asset.key, asset.path, asset.options.imagePath);
  }
  loader.start();
  const [resolve, , promise] = deferred<void>();
  loader.on("complete", () => {
    resolve();
  });
  return promise;
};

export default load;
