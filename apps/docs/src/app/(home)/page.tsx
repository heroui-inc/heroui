import {Button, Chip} from "@heroui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <Chip variant="primary"> 3.0.0-alpha.0</Chip>
        <h1 className="text-foreground mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Build your product,
          <br />
          we maintain the UI library
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl text-lg">
          Create stunning interfaces with 50% smaller bundle size, lightning-fast native CSS
          animations, and effortless customization that adapts to your design vision.
        </p>

        {/* Demonstrate React components */}
        <div className="mb-8 flex gap-4">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>

        {/* Demonstrate CSS utility classes from the plugin */}
        <div className="grid max-w-lg grid-cols-3 gap-4">
          <div className="bg-accent text-accent-foreground rounded-lg p-4">Accent Color</div>
          <div className="bg-success text-success-foreground rounded-lg p-4">Success Color</div>
          <div className="bg-warning text-warning-foreground rounded-lg p-4">Warning Color</div>
        </div>

        <Link
          className="bg-panel hover:bg-accent-hover text-foreground mt-8 inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          href="/docs"
        >
          Explore Docs
        </Link>
      </section>
    </main>
  );
}
