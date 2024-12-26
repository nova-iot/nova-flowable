import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  ReactFlowProvider,
} from "@xyflow/react";
import { DnDProvider, useDnD } from "@/components/Graph/DnDContext";
import "@xyflow/react/dist/style.css";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { GraphSidebar } from "./GraphSider";
import MqttSource from "./Source/MqttSource";
import { nanoid } from "nanoid";

const initialNodes: any[] = [];

const initialEdges: any[] = [];

// 创建一个包装组件来处理 ReactFlow 的内部逻辑
function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const nodeTypes = {
    mqtt: MqttSource,
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: { preventDefault: () => void; clientX: any; clientY: any }) => {
      event.preventDefault();
      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, type]
  );
  const [zoomOnScroll, setZoomOnScroll] = useState(true);

  // 鼠标进入节点时禁用 zoomOnScroll
  const handleNodeMouseEnter = () => setZoomOnScroll(false);

  // 鼠标离开节点时恢复 zoomOnScroll
  const handleNodeMouseLeave = () => setZoomOnScroll(true);

  return (
    <div className="h-[100%] pb-10" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        zoomOnScroll={zoomOnScroll}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

// 主组件包装 Provider
export function Graph() {
  return (
    <SidebarProvider>
      <DnDProvider>
        <GraphSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </main>
      </DnDProvider>
    </SidebarProvider>
  );
}
