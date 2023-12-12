import Footer from "@/components/patterns/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Alura Cases - HomePage</h1>
      <Link href="/teste">Teste</Link>
      <Footer />
    </div>
  );
}
