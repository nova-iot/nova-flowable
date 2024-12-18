import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar";
import { useDnD } from '@/components/Graph/DnDContext';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DragEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
  
export function GraphSidebar() {
    const [_, setType] = useDnD();
    
    const onDragStart = (event: DragEvent<HTMLButtonElement> | DragEvent<HTMLDivElement>, nodeType: string) => {
      setType(nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
    return (
      <Sidebar>
        <SidebarHeader >
        <div className="flex w-full max-w-sm items-center space-x-1">
          <Input placeholder="Email" />
          <Button type="submit">搜索</Button>
        </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
          <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Source</AccordionTrigger>
        <AccordionContent className="p-1">
        <Button className="w-full rounded" onDragStart={(event) => onDragStart(event, 'mqtt')} draggable>
           MQTT
          </Button>
          </AccordionContent>
          <AccordionContent className="p-1">
          <Button className="w-full rounded" onDragStart={(event) => onDragStart(event, 'default')} draggable>
           Default Node
          </Button>
          </AccordionContent>
          <AccordionContent className="p-1">
          <Button className="w-full rounded" onDragStart={(event) => onDragStart(event, 'output')} draggable>
           Output Node
          </Button>
        </AccordionContent>
      </AccordionItem>
      </Accordion>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
}