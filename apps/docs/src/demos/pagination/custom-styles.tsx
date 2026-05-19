"use client";

import {Pagination} from "@heroui/react";
import {useState} from "react";

const linkBase =
  "size-8 min-w-8 rounded-md! border-0 bg-transparent! text-sm font-medium text-muted shadow-none hover:bg-muted/50! data-[hovered=true]:bg-muted/50!";

const activeLink =
  "rounded-md! bg-foreground! font-medium text-background shadow-sm hover:bg-foreground/90! data-[active=true]:bg-foreground! data-[hovered=true]:bg-foreground/90!";

export function CustomStyles() {
  const [page, setPage] = useState(2);
  const totalPages = 5;

  return (
    <Pagination className="justify-center">
      <Pagination.Content className="gradient-border relative gap-1.5 rounded-xl bg-linear-to-b from-neutral-50/95 to-white p-1.5 shadow-sm ring-1 ring-black/5 [--gradient-border-width:1px] [--gradient-border:linear-gradient(315deg,#e5e5e5_0%,#fafafa_50%,#c4c4c4_100%)] dark:from-neutral-900/95 dark:to-neutral-950 dark:ring-white/10 dark:[--gradient-border:linear-gradient(315deg,#404040_0%,#262626_50%,#525252_100%)]">
        <Pagination.Item className="mr-0.5">
          <Pagination.Previous
            className={`${linkBase} min-w-auto gap-1 px-2.5`}
            isDisabled={page === 1}
            onPress={() => setPage((p) => p - 1)}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link
              className={p === page ? activeLink : linkBase}
              isActive={p === page}
              onPress={() => setPage(p)}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item className="ml-0.5">
          <Pagination.Next
            className={`${linkBase} min-w-auto gap-1 px-2.5`}
            isDisabled={page === totalPages}
            onPress={() => setPage((p) => p + 1)}
          >
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
