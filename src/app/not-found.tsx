import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NotFoundBody } from "@/components/NotFoundBody";

/** Global 404 (unknown URLs). The root layout has no header/footer, so this page adds them itself. */
export default function GlobalNotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <NotFoundBody />
      </main>
      <Footer />
    </>
  );
}
