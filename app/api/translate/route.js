// /api/translate/route.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const apiKey = process.env.GOOGLE_API_KEY;

async function translate(text, targetLanguage) {
    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLanguage,
            }),
        });

        const data = await response.json();

        if (!data.data || !data.data.translations || !data.data.translations[0]) {
            throw new Error('Invalid response format from Google Translate API');
        }

        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating message:', error);
        throw error;
    }
}

export async function POST(req) {
    const { text, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
        return new NextResponse('Invalid input', { status: 400 });
    }

    try {
        const translatedText = await translate(text, targetLanguage);
        return new NextResponse(JSON.stringify({ translatedText }), { status: 200 });
    } catch (error) {
        return new NextResponse('Error translating message', { status: 500 });
    }
}
