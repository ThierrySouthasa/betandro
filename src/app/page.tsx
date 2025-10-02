'use client';

import React, { useState } from 'react';
import PronosticCard from "@/components/PronosticCard";
import PriceCard from "@/components/PriceCard";
import { usePronostics } from "@/hooks/usePronostics";
import ContactForm from '@/components/ContactForm';

export default function HomePage() {
    const { data, isLoading, error } = usePronostics({ take: 100 });
    const offers = [
        {
          plan: 'Formule Débutant',
          description: '3 pronostics / semaine',
          price: '9,99 €',
        },
        {
          plan: 'Formule Pro',
          description: '1 pronostic / jour',
          price: '19,99 €',
        },
        {
          plan: 'VIP 30J',
          description: 'Accès à tous les paris + conseils',
          price: '39,99 €',
        },
      ];

    return (
        <div className="space-y-20 px-4 py-12 max-w-screen-xl mx-auto">
<section className="text-center">
  <h1 className="text-4xl font-bold text-white mb-4">Le Meilleur Pronostiqueur</h1>
  <p className="text-gray-300 max-w-2xl mx-auto">
    {"Fort d'une expérience de plusieurs années dans le monde du pari sportif, j'analyse chaque match avec précision. Mon objectif : vous faire gagner !"}
  </p>
</section>


<section>
  <h2 className="text-2xl font-bold text-white text-center mb-6">
    Offres et Abonnements
  </h2>
  <div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <PriceCard
          key={index}
          plan={offer.plan}
          description={offer.description}
          price={offer.price}
        />
      ))}
    </div>
  </div>
</section>


            <section>
                <h2 className="text-2xl font-bold text-white text-center mb-6">Exemples de Paris Récents</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading && <div className="text-sm text-gray-500">Chargement…</div>}
                    {error && <div className="text-sm text-red-600">Erreur: {error.message}</div>}
                    {!isLoading && !error && (data ?? [])
                        .filter(p => p.result !== 'PENDING')
                        .slice(0, 4)
                        .map((p) => (
                            <PronosticCard
                                key={p.id}
                                equipe1={p.teamA}
                                equipe2={p.teamB}
                                cote={p.odds}
                                pronostic={p.prediction}
                                result={p.result}
                            />
                        ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white text-center mb-6">Contact</h2>
                <ContactForm />
            </section>
        </div>
    );
}
