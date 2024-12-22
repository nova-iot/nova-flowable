import { Graph } from "@/components/Graph/Graph";
import { ThemeProvider } from "./components/them/provider";

// export default function Layout({ children }: { children: React.ReactNode }) {
export default function () {
  return (
    <ThemeProvider defaultTheme="light" storageKey="navo-flowable">
      <Graph />
    </ThemeProvider>
  );
}
