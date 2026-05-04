import { HttpError } from './http-error';

export function handleError(error: unknown) {
  if (error instanceof HttpError) {
    return Response.json(
      {
        error: error.message,
        details: error.details,
      },
      { status: error.statusCode },
    );
  }

  console.error('Unexpected error:', error);

  return Response.json({ error: 'Internal Server Error' }, { status: 500 });
}
