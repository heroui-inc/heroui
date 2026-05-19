"use client";

import {Pagination} from "@heroui/react";
import {useState} from "react";

const linkBase =
  "min-w-9 rounded-none border-0 bg-transparent text-neutral-600 shadow-none hover:bg-neutral-100/80 dark:text-neutral-400 dark:hover:bg-neutral-800/80";

const activeLink =
  "bg-neutral-900 font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200";

export function CustomStyles() {
  const [page, setPage] = useState(2);
  const totalPages = 5;

  return (
    <Pagination className="justify-center">
      <Pagination.Content className="gap-0 overflow-hidden rounded-full border border-border/80 bg-surface p-1 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <Pagination.Item>
          <Pagination.Previous
            className={`${linkBase} rounded-l-full pl-3`}
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
        <Pagination.Item>
          <Pagination.Next
            className={`${linkBase} rounded-r-full pr-3`}
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
