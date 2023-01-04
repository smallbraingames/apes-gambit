// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// NOTE: This file is autogenerated via `mud codegen-libdeploy` from `deploy.json`. Do not edit manually.

// Foundry
import { DSTest } from "ds-test/test.sol";
import { console } from "forge-std/console.sol";

// Solecs
import { World } from "solecs/World.sol";
import { Component } from "solecs/Component.sol";
import { getAddressById } from "solecs/utils.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { ISystem } from "solecs/interfaces/ISystem.sol";

// Components (requires 'components=...' remapping in project's remappings.txt)
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";

// Systems (requires 'systems=...' remapping in project's remappings.txt)
import { RevokeControllerSystem, ID as RevokeControllerSystemID } from "systems/RevokeControllerSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { TransferOwnerSystem, ID as TransferOwnerSystemID } from "systems/TransferOwnerSystem.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetPieceTypeSystem, ID as SetPieceTypeSystemID } from "systems/SetPieceTypeSystem.sol";
import { MovePieceSystem, ID as MovePieceSystemID } from "systems/MovePieceSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRStartGameSystem, ID as BRStartGameSystemID } from "systems/BRStartGameSystem.sol";
import { BRMovePieceSystem, ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";

struct DeployResult {
  World world;
  address deployer;
}

library LibDeploy {
  function deploy(
    address _deployer,
    address _world,
    bool _reuseComponents
  ) internal returns (DeployResult memory result) {
    result.deployer = _deployer;

    // ------------------------
    // Deploy
    // ------------------------

    // Deploy world
    result.world = _world == address(0) ? new World() : World(_world);
    if (_world == address(0)) result.world.init(); // Init if it's a fresh world

    // Deploy components
    if (!_reuseComponents) {
      Component comp;

      console.log("Deploying OwnerComponent");
      comp = new OwnerComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ControllerComponent");
      comp = new ControllerComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying PieceTypeComponent");
      comp = new PieceTypeComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying PiecePositionComponent");
      comp = new PiecePositionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying BRGameComponent");
      comp = new BRGameComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying BRInGameComponent");
      comp = new BRInGameComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying BRIsAliveComponent");
      comp = new BRIsAliveComponent(address(result.world));
      console.log(address(comp));
    }

    // Deploy systems
    deploySystems(address(result.world), true);
  }

  function authorizeWriter(
    IUint256Component components,
    uint256 componentId,
    address writer
  ) internal {
    Component(getAddressById(components, componentId)).authorizeWriter(writer);
  }

  /**
   * Deploy systems to the given world.
   * If `init` flag is set, systems with `initialize` setting in `deploy.json` will be executed.
   */
  function deploySystems(address _world, bool init) internal {
    World world = World(_world);
    // Deploy systems
    ISystem system;
    IUint256Component components = world.components();

    console.log("Deploying RevokeControllerSystem");
    system = new RevokeControllerSystem(world, address(components));
    world.registerSystem(address(system), RevokeControllerSystemID);
    authorizeWriter(components, ControllerComponentID, address(system));
    console.log(address(system));

    console.log("Deploying SetControllerSystem");
    system = new SetControllerSystem(world, address(components));
    world.registerSystem(address(system), SetControllerSystemID);
    authorizeWriter(components, ControllerComponentID, address(system));
    console.log(address(system));

    console.log("Deploying TransferOwnerSystem");
    system = new TransferOwnerSystem(world, address(components));
    world.registerSystem(address(system), TransferOwnerSystemID);
    authorizeWriter(components, OwnerComponentID, address(system));
    console.log(address(system));

    console.log("Deploying SpawnSystem");
    system = new SpawnSystem(world, address(components));
    world.registerSystem(address(system), SpawnSystemID);
    authorizeWriter(components, OwnerComponentID, address(system));
    authorizeWriter(components, PieceTypeComponentID, address(system));
    authorizeWriter(components, PiecePositionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying SetPieceTypeSystem");
    system = new SetPieceTypeSystem(world, address(components));
    world.registerSystem(address(system), SetPieceTypeSystemID);
    authorizeWriter(components, PieceTypeComponentID, address(system));
    console.log(address(system));

    console.log("Deploying MovePieceSystem");
    system = new MovePieceSystem(world, address(components));
    world.registerSystem(address(system), MovePieceSystemID);
    authorizeWriter(components, PiecePositionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BRCreateGameSystem");
    system = new BRCreateGameSystem(world, address(components));
    world.registerSystem(address(system), BRCreateGameSystemID);
    authorizeWriter(components, BRGameComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BRJoinGameSystem");
    system = new BRJoinGameSystem(world, address(components));
    world.registerSystem(address(system), BRJoinGameSystemID);
    authorizeWriter(components, BRInGameComponentID, address(system));
    authorizeWriter(components, BRIsAliveComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BRStartGameSystem");
    system = new BRStartGameSystem(world, address(components));
    world.registerSystem(address(system), BRStartGameSystemID);
    authorizeWriter(components, BRGameComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BRMovePieceSystem");
    system = new BRMovePieceSystem(world, address(components));
    world.registerSystem(address(system), BRMovePieceSystemID);
    authorizeWriter(components, BRIsAliveComponentID, address(system));
    console.log(address(system));
  }
}
