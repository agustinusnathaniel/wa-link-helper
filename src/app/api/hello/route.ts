export const GET = () => {
  return Response.json(
    { name: 'John Doe' },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
