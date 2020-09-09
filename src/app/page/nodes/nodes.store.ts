import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';

@Injectable({
    providedIn: 'root'
  })
export class NodeStore {

    @observable.shallow nodes = [];

    getNodes() {
      return this.nodes;
    }

    @action setNodes(nodes) {
      this.nodes = nodes;
    }

    @computed get temperatureNodes() {
      let auxNodes = this.nodes;
      auxNodes.forEach((node, nodeIndex) => node.units.forEach(
        (unit, unitIndex) => {
          if(unit.type != 'TEMPERATURE_SENSOR') {
            auxNodes[nodeIndex].units.splice(unitIndex, 1);
          }
        }));

      return auxNodes.filter(
        node =>
          node.units.length != 0
        );
    }

    @computed get locations() {
      let locations = [];
      let auxNodes = this.nodes;
      auxNodes.forEach((node, nodeIndex) => {
        node.units.forEach(
        (unit, unitIndex) => {

        })
      });

      return auxNodes.filter(
        node =>
          node.units.length != 0
        );
    }

    @computed get lightUnits() {
      let lightUnits = [];
      this.nodes.forEach((node, nodeIndex) =>
      node.units.forEach(unit => {
          if(unit.type == 'DIMMER') {
            lightUnits.push(unit);
          }
        }));
      return lightUnits;
    }

    getMockedNodes() {
      return mockedNodes;
    }

    getNodeWithId(nodeId) {
      return this.nodes[nodeId];
    }
}

export const mockedNodes = [
    {
      name: 'Node1',
      description: 'Lampara de la mesa negra',
      nodeId: 1,
      connectedSince: 1111122222,
      units: [
        {
            unitId: 1,
            name: 'Relé',
            description: 'Relé de activación',
            type: 'ACTUATOR',
            graphColor: 'red'
        }
    ]
    },
    {
      name: 'Node2',
      description: 'Lampara de la mesa negra',
      nodeId: 2,
      connectedSince: 1111122222,
      units: [
        {
            unitId: 2,
            name: 'Actuador2',
            description: 'Relé de activación2',
            type: 'ACTUATOR',
            graphColor: 'green'
        },
        {
            unitId: 1,
            name: 'Actuador1',
            description: 'Rele de activación1',
            type: 'ACTUADOR',
            graphColor: 'yellow'
        }
    ]
    },
    {
      name: 'Node3',
      description: 'Lampara de la mesa negra',
      nodeId: 3,
      connectedSince: 1111122222,
      units: [
        {
            unitId: 2,
            name: 'Sensor2',
            description: 'Sensor de humedad',
            type: 'TEMPERATURE_SENSOR'
        },
        {
            unitId: 1,
            name: 'Sensor1',
            description: 'Sensor de temperatura2',
            type: 'SENSOR'
        }
    ]
    }
]
