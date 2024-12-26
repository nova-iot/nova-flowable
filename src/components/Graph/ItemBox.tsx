import { memo, useEffect, useState } from "react";
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function ItemBox({ id, data }: NodeProps<Node<{ [x: string]: string }>>) {
  const { updateNodeData } = useReactFlow();

  const formSchema = z.object({
    server: z.string().url({ message: "无效的url" }),
    topic: z.string({
      required_error: "MQTT 主题是必填的",
      invalid_type_error: "必填的内容",
    }),
    clientId: z.string().optional(), // 可选字段
    protocolVersion: z.string().optional(), // 可选字段
    qos: z.string().optional(), // 可选字段
    username: z.string().optional(), // 可选字段
    password: z.string().min(6, { message: "密码至少 6 个字符" }).optional(),
    certificationPath: z.string().optional(), // 可选字段
    privateKeyPath: z.string().optional(), // 可选字段
    rootCaPath: z.string().optional(), // 可选字段
    certficationRaw: z.string().optional(), // 可选字段
    privateKeyRaw: z.string().optional(), // 可选字段
    rootCARaw: z.string().optional(), // 可选字段
    insecureSkipVerify: z.boolean().optional(), // 可选字段
    retained: z.boolean().optional(), // 可选字段
    compression: z.enum(["zlib", "gzip", "flate", "zstd"]).optional(),
    connectionSelector: z.string().optional(), // 可选字段
  });

  // 初始化表单
  const form = useForm<z.infer<typeof formSchema>>({
    // 指定表单验证规则
    resolver: zodResolver(formSchema),
    // 验证模式，onChange表示输入框值变化时触发验证
    mode: "onChange",
    defaultValues: {
      password: data.password || "", // 确保包含 password
    },
  });

  // 监听表单值变化并自动更新节点数据
  useEffect(() => {
    const subscription = form.watch((values) => {
      form.trigger();
      updateNodeData(id, values); // 在值变化时调用 updateNodeData
    });
    return () => subscription.unsubscribe(); // 清理订阅
  }, [form, id, updateNodeData]);

  const [openPopover, setOpenPopover] = useState(false);

  const buttonHandle = () => {
    setOpenPopover((prev) => !prev);
  };

  return (
    <div className="border rounded border-gray-400 overflow-hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-none" onClick={buttonHandle}>
            MQTT
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-100 max-w-md overflow-hidden">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">
              eKuiper 为 MQTT 源流提供了内置支持，流可以订阅来自 MQTT
              代理的消息并输入 eKuiper 处理管道。
            </span>
          </div>
          <div className="overflow-y-auto max-h-96">
            <Form {...form}>
              <form className="space-y-1 p-1">
                <FormField
                  control={form.control}
                  name="server"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>服务器地址</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>主题</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>客户端ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="protocolVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>协议版本</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>服务质量</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>连接密码</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certificationPath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>证书路径</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateKeyPath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>私钥路径</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rootCaPath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>根证书路径</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certficationRaw"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>base64编码过的证书(优先)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateKeyRaw"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>base64编码过的密钥原文(优先)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rootCARaw"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>base64编码过的根证书原文(优先)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="insecureSkipVerify"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TLS验证</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="retained"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>保留最后一条消息和其Qos</FormLabel>
                      {/* <FormDescription>
                                      Receive emails about your account security.
                                    </FormDescription> */}
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compression"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        压缩方法(选择指定的压缩方法压缩Payload)
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="zlib">zlib压缩</SelectItem>
                            <SelectItem value="gzip">gzip压缩</SelectItem>
                            <SelectItem value="flate">flate压缩</SelectItem>
                            <SelectItem value="zstd">zstd压缩</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="connectionSelector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>根证书路径</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {/* <Button type="submit">Submit</Button> */}
              </form>
            </Form>
          </div>
          {/* </div> */}
        </PopoverContent>
      </Popover>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(ItemBox);
