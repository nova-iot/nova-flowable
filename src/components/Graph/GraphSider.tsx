import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useDnD } from "@/components/Graph/DnDContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DragEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function GraphSidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: DragEvent<HTMLButtonElement> | DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const sourceList = [
    {
      key: "mqttSource",
      label: "MQTT",
    },
    {
      key: "neuronSource",
      label: "Neuron",
    },
    {
      key: "edgexSource",
      label: "EdgeX",
    },
    {
      key: "httppullSource",
      label: "HTTP Pull",
    },
    {
      key: "httppushSource",
      label: "HTTP Push",
    },
    {
      key: "fileSource",
      label: "File",
    },
    {
      key: "memorySource",
      label: "Memory",
    },
    {
      key: "redisSource",
      label: "Redis",
    },
    {
      key: "redissubSource",
      label: "RedisSub",
    },
    {
      key: "websocketSource",
      label: "Websocket",
    },
    {
      key: "simulatorSource",
      label: "Simulator",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full max-w-sm items-center space-x-1">
          <Input placeholder="Email" />
          <Button type="submit">搜索</Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-2">Source</AccordionTrigger>
              {sourceList.map((item) => (
                <AccordionContent className="py-1 px-2" key={item.key}>
                  <Button
                    className="w-full rounded"
                    onDragStart={(event) => onDragStart(event, item.key)}
                    draggable
                  >
                    {item.label}
                  </Button>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
