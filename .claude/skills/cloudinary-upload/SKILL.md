---
name: cloudinary-upload
description: Integrate Cloudinary image uploads into a Next.js project — lib setup, upload API route, upload hook, and ImageUpload component. Use this skill whenever the user asks about image uploads, file storage, Cloudinary, cover images, or avatar uploads. Always use this skill when adding any kind of file or image upload feature.
---

# Cloudinary Upload Skill

Handles image uploads to Cloudinary via a protected Next.js API route.

## Setup

```bash
npm install cloudinary
```

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Find these in your Cloudinary dashboard → Settings → API Keys.

## `lib/cloudinary.ts`

```ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  file: Buffer,
  folder: string = 'blog',
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(file);
  });
};

export const deleteImage = async (url: string): Promise<void> => {
  const parts = url.split('/');
  const folder = parts.at(-2);
  const filename = parts.at(-1)?.split('.')[0];
  const publicId = `${folder}/${filename}`;
  await cloudinary.uploader.destroy(publicId);
};
```

## `app/api/upload/route.ts`

```ts
import { uploadImage } from '@/lib/cloudinary';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    getUserFromRequest(req); // protected — must be logged in

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return Response.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(buffer);

    return Response.json({ url });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

## `hooks/api/upload.hooks.ts`

File uploads use `FormData` — cannot use the `poster` helper. Use manual fetch:

```ts
import { useState } from 'react';

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Do NOT set Content-Type — browser sets it with boundary automatically
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Upload failed');
      }

      const data: { url: string } = await res.json();
      return data.url;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading, error };
};
```

## Folder organization

Pass a `folder` argument to `uploadImage` to organize by content type:

```ts
uploadImage(buffer, 'avatars'); // → cloudinary.com/.../avatars/abc123.jpg
uploadImage(buffer, 'blog'); // → cloudinary.com/.../blog/abc123.jpg
uploadImage(buffer, 'covers'); // → cloudinary.com/.../covers/abc123.jpg
```

## Rules

- Always protect the upload route with `getUserFromRequest`
- Never set `Content-Type` manually when using `FormData`
- Always validate file type and size before uploading
- Store the returned `secure_url` — always use HTTPS
- Use `deleteImage(url)` when deleting a resource that has an image
