import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const MODEL_CONTEXT = `You are an AI assistant for an art marketplace platform. Your role is to help users understand how to:
- List artworks for sale
- Place bids on artworks
- Navigate the payment system
- Understand marketplace rules and guidelines

Keep your responses focused, practical, and specific to art marketplace operations.
Include relevant tips and best practices when appropriate.
Be concise but informative.`;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { message } = body || {};
    if (!message) return NextResponse.json({ error: "message required" }, { status: 400 });

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `${MODEL_CONTEXT}\n\nUser: ${message}\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("/api/ai error", error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
