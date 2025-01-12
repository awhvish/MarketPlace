import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const POST = async (req: NextRequest) => {
  try {
    const form = await req.formData();
    const file = form.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Create a unique file path
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    // Convert file to a buffer and save it
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ filePath: `/uploads/${fileName}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
};

// Set route configuration
export const runtime = 'nodejs'; // Set runtime to Node.js
export const dynamic = 'force-dynamic'; // Ensure this route always uses dynamic rendering
