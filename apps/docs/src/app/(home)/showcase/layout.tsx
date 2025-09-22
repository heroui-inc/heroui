export default function ShowcaseLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-[68rem]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Showcase</h1>
        <p className="text-muted mb-12 text-lg font-light">
          Explore interactive examples showcasing HeroUI components in real-world scenarios.
        </p>
        {children}
      </div>
    </main>
  );
}
