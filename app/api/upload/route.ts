import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';
import { Readable } from 'stream';

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming form data
    const form = await req.formData();
    const file = form.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a promise to handle Cloudinary upload response
    const cloudinaryUploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Automatically detect file type (e.g., image, video)
        (error, result) => {
          if (error) {
            reject(error); // Reject the promise if there's an error
          } else {
            if (result) {
              resolve(result); // Resolve the promise with the result
            } else {
              reject(new Error('Upload failed, no result returned')); // Reject if result is undefined
            }
          }
        }
      );

      // Use the stream to send the buffer to Cloudinary
      const readableStream = Readable.from(buffer);
      readableStream.pipe(uploadStream);
    });

    // Wait for Cloudinary upload to finish and handle response
    const result = await cloudinaryUploadPromise;

    // Ensure the response is sent after the upload is complete
    return NextResponse.json({ filePath: result?.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);

    // Return an error response if any issue occurs
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
};


  // Set route configuration
  export const runtime = 'nodejs'; // Use Node.js runtime
  export const dynamic = 'force-dynamic'; // Ensure the route is always dynamically rendered
