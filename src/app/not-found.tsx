import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NotFoundContent } from "@/components/not-found-content";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
