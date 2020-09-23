
import { NodeStore } from '../store/nodes.store'
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class NodeService {

    constructor(
      private nodeStore: NodeStore,
      private http: HttpClient
    ) {
      this.http.get(`${environment.apiUrl}/node`).subscribe(nodes => {
        this.setNodes(nodes);
      })
    }

    setNodes(nodes) {
      this.nodeStore.setNodes(nodes);
    }

    getNodeWithId(nodeId) {
      return this.nodeStore.getNodeWithId(nodeId);
    }

    getNodes() {
      return this.nodeStore.getNodes();
    }

    getUnitsByLocation() {
      return this.nodeStore.unitsByLocation;
    }

    getLightUnits() {
      return this.nodeStore.lightUnits;
    }

    getTemperatureNodes() {
      return this.nodeStore.temperatureNodes;
    }

    getMockedNodes() {
      return this.nodeStore.getMockedNodes();
    }

    getUnits(nodeId) {
      return this.nodeStore.getNodeWithId(nodeId)
    }
}
