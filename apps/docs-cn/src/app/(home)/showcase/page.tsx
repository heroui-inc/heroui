"use client";

import {ShowcaseItem} from "@/components/showcase-item";
import {getShowcaseCategories} from "@/showcases";

export default function ShowcasePage() {
  const categories = getShowcaseCategories();

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.name}>
          <h2 className="text-md mb-4 rounded-full text-foreground">{category.name}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <ShowcaseItem key={item.name} href={`/showcase/${item.name}`} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
