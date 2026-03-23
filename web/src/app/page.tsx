import { FiEye, FiDownload } from "react-icons/fi";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import QuoteListClient from "@/src/components/quote/QuoteList";
import { getQuotes } from "../services/quote";

export default async function HomePage() {
  const quotes = await getQuotes();

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl font-bold text-black-500 mb-2">
          Générez votre nouveau devis
        </h1>
        <p className="text-base mb-5">Gérez vos devis facilement</p>
        <Link href="/quote/create-quote">
          <Button>Créer un nouveau devis</Button>
        </Link>
      </div>

      {/* Compteur */}
      <p className="text-center text-xl font-bold mb-6">
        Vous avez généré{" "}
        <span className="text-secondary-500 font-bold">
          {quotes.length} devis
        </span>{" "}
        au total
      </p>

      {/* Liste */}
      <QuoteListClient quotes={quotes} />
    </div>
  );
}