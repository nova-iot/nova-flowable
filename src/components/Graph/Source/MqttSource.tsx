import { memo } from 'react';
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
} from '@xyflow/react';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function MqttSource({ id, data }: NodeProps<Node<{ text: string }>>) {
  const { updateNodeData } = useReactFlow();
 
  return (
    <div className="border-[1px] rounded border-black">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded w-full">MQTT {id}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-slate-200 rounded">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input
                    onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                    value={data.text}
                    id="width"
                    defaultValue="100%"
                    className="col-span-3 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                    id="maxWidth"
                    defaultValue="300px"
                    className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                    id="maxHeight"
                    defaultValue="none"
                    className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
 
export default memo(MqttSource);