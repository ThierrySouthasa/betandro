import { NextResponse } from 'next/server';
import { supabase, Pronostic } from '../../../lib/supabase';
import { z } from 'zod';

// Validation Zod pour sécuriser les entrées
const pronosticSchema = z.object({
    sport: z.enum(['FOOTBALL', 'TENNIS', 'BASKET']),
    teamA: z.string(),
    teamB: z.string(),
    odds: z.number().positive(),
    prediction: z.string(),
    result: z.enum(['PENDING', 'WON', 'LOST']).default('PENDING'),
    visibleTo: z.enum(['FREE', 'BASIC', 'PREMIUM']).default('FREE'),
});

// Handle POST request
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = pronosticSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation error', issues: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;

        const { data: pronostic, error } = await supabase
            .from('Pronostic')
            .insert(data)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(pronostic, { status: 201 });
    } catch (err) {
        console.error('Erreur lors de l’insertion du pronostic :', err);
        return NextResponse.json({ error: 'Erreur serveur', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

// Handle GET request (list pronostics)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const takeParam = searchParams.get('take');
        const skipParam = searchParams.get('skip');

        const take = takeParam ? Math.min(Math.max(parseInt(takeParam, 10) || 0, 0), 100) : 50;
        const skip = skipParam ? Math.max(parseInt(skipParam, 10) || 0, 0) : 0;

        const { data: pronostics, error } = await supabase
            .from('Pronostic')
            .select('id, sport, teamA, teamB, odds, prediction, result, visibleTo, createdAt, updatedAt')
            .order('createdAt', { ascending: false })
            .range(skip, skip + take - 1);

        if (error) {
            throw error;
        }

        return NextResponse.json(pronostics);
    } catch (err) {
        console.error('Erreur lors de la récupération des pronostics :', err);
        return NextResponse.json({ error: 'Erreur serveur', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

// Handle PATCH request (update result)
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const patchSchema = z.object({
            id: z.number().int().positive(),
            result: z.enum(['PENDING', 'WON', 'LOST']).refine((v) => v !== 'PENDING', {
                message: 'Result must be WON or LOST when updating',
            }),
        });
        const validation = patchSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Validation error', issues: validation.error.issues }, { status: 400 });
        }
        const { id, result } = validation.data;
        const { data: updated, error } = await supabase
            .from('Pronostic')
            .update({ result })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du pronostic :', err);
        return NextResponse.json({ error: 'Erreur serveur', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}
