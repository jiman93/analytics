import { Component, OnInit, ViewEncapsulation, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NotificationService } from '../../../common/NotificationService';
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css'],
  providers: [NotificationService],
  encapsulation: ViewEncapsulation.None
})
export class JsonViewerComponent implements OnInit {
  @Input('jsonData') jsonData: any= {};
  @ViewChild('tree') tree: TreeComponent;
  nodes= [
  /*  {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    } */
  ];
  options= {};
  nodeId= 100;

  constructor(private notificationService: NotificationService) {
    console.log ("tree", this.tree);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log ("tree2", this.tree);
    this.tree.treeModel.expandAll();
    this.initOnNotification();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log ("ngOnChanges", changes);
    if (changes.jsonData.currentValue["submitResourceAction"]) {
      console.log ("ngOnChanges", changes.jsonData.currentValue["submitResourceAction"].nbncoOrderId, " vs ", this.jsonData.submitResourceAction.nbncoOrderId); 
      this.refreshTree(this.jsonData);
    }
  }


  onUpdateData (treeComponent: TreeComponent, $event) {
    console.log ("onUpdateData", treeComponent, $event);
    treeComponent.treeModel.expandAll(); // needed 
  }

  initOnNotification() {
    var vm = this;
    this.notificationService.addObserver().subscribe(notifyEvent => {
      console.log("Notification event1 received", notifyEvent);
      if (notifyEvent) {
        switch (notifyEvent.eventId) {
          case "JsonViewer.Refresh":
            var jsonData = notifyEvent.value;
            this.refreshTree(jsonData);
            break;
        }
      }
    });
  }

  refreshTree(jsonData) {
    var jsonArray = [];
    var newNode = {
      id: this.getNextNodeId(),
      name : "Request",
      title: "",
      children: []
    };

    jsonArray.push(newNode);
    jsonArray.push ({
      name : "End",
      title: "",
      children: []
    })
    this.printList(newNode, newNode.children, jsonData, 0);
    this.nodes = jsonArray;

    // not required as we are using onUpdateData to refresh
    // this.tree.treeModel.update();
    // this.tree.treeModel.expandAll();    
  }
  

  printList(jsonNode, jsonArray, jsonData, depth) {
    if (jsonData instanceof Object) {
      //console.log("children detected");
      this.getChildren(jsonNode, jsonArray, jsonData, depth);
    }
    else if (jsonData instanceof Array) {
      //console.log("array detected");
      this.printArray(jsonNode, jsonArray, jsonData, depth);
    }
    else if (jsonData instanceof String) {
      //console.log("string detected", jsonData);
      jsonNode.title = jsonData;
    }
    else {
      //console.log("title detected", jsonData);
      jsonNode.title = jsonData;
    }
  }

  getChildren(node, array, parent, depth) {
    for (var child in parent) {
      var newNode = {
        id: this.getNextNodeId(),
        name : child,
        title: "",
        children: []
      };
      array.push(newNode);
      //console.log("<li>child["+ depth+"]:" + child + "<ul>");
      this.printList(newNode, newNode.children, parent[child], depth);
      depth++;
    }
  }
  printArray(node, array, myArray, depth) {
    for (var i = 0; i < myArray.length; i++) {
      //console.log("<li>array:" + myArray[i] + "</li>");
      var newNode = {
        id: this.getNextNodeId(),
        name : "array",
        title: "",
        children: []
      };
      array.push(newNode);
      this.printList(newNode, newNode.children, myArray[i], depth);
    }
  }

  getNextNodeId() {
    this.nodeId = this.nodeId+1;
    return this.nodeId;
  }
}
