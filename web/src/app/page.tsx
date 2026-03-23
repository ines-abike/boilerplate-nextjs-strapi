import Link from "next/link";
import Button from "@/src/components/ui/Button";
import QuoteListClient from "@/src/components/quote/QuoteList";
import { getQuotes } from "../services/quote";

export default async function HomePage() {
  const { data: quotes, meta } = await getQuotes(1, 5);

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-playfair md:text-4xl text-2xl font-bold mb-2">
          Générez votre nouveau devis
        </h1>
        <p className="text-base mb-5">Générez votre nouveau devis</p>
        <Link href="/quote/create-quote">
          <Button>Créer un nouveau devis</Button>
        </Link>
      </div>

      {/* Compteur */}
      <p className="text-center md:text-xl text-lg font-semibold mb-6">
        Vous avez généré{" "}
       <span className="text-secondary-500 font-semibold">
          {meta.pagination?.total ?? 0} devis
        </span>{" "}
        au total
      </p>

      {/* Liste */}
      <QuoteListClient 
      initialQuotes={quotes}
      totalQuotes={meta.pagination?.total ?? 0} />
    </div>
  );
}