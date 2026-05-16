export default function ShowcaseLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-[68rem]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Showcase</h1>
        <p className="mb-12 text-lg font-light text-muted">
          Explore interactive examples showcasing HeroUI components in real-world scenarios.
        </p>
        {children}
      </div>
    </main>
  );
}
