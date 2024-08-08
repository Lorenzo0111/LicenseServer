export default async function NotFound() {
  return (
    <main className="m-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bold">404</h1>
        <div>
          <h2 className="text-2xl font-bold">Not found!</h2>
          <p>The requested resource could not be found.</p>
        </div>
      </div>
    </main>
  );
}
