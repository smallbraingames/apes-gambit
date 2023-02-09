import { Perlin, createPerlin } from "@latticexyz/noise";

import { Coord } from "@latticexyz/utils";

const createBananaMananger = () => {
  let perlin: Perlin;

  const setup = async () => {
    perlin = await createPerlin();
  };

  const isBananaOnTile = (position: Coord) => {
    const depth = perlin(position.x, position.y, 0, 50);
    console.log(depth);
  };

  return { setup, isBananaOnTile };
};

export default createBananaMananger;
