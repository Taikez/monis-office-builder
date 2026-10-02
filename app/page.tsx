import WorkspaceBuilder from "@/components/workspace/workspace-builder";

export const metadata = {
  title: "Monis Workspace Builder",
  description: "Design and rent your perfect workspace in Bali.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans antialiased">
      <WorkspaceBuilder />
    </main>
  );
}
