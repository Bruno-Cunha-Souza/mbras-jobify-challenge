import SectionVagas from "@/components/elements/SectionVagas";
import ToogleTheme from "@/components/elements/ToogleTheme";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <main className="w-full md:w-4/5 px-4 md:px-8 ">
        <SectionVagas />
      </main>
      <footer className="fixed bottom-0 w-full flex items-center justify-end px-6 py-4">
        <ToogleTheme />
      </footer>
    </div>
  );
}
