"use client";

import {Pagination} from "@heroui/react";
import {useState} from "react";

const SIZE_LABELS = {
  lg: "大",
  md: "中",
  sm: "小",
} as const;

function SizePagination({size}: {size: "sm" | "md" | "lg"}) {
  const [page, setPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted">{SIZE_LABELS[size]}</span>
      <Pagination className="justify-center" size={size}>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
              <Pagination.PreviousIcon />
              <span>上一页</span>
            </Pagination.Previous>
          </Pagination.Item>
          {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
              <span>下一页</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}

export function PaginationSizes() {
  return (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <SizePagination key={size} size={size} />
      ))}
    </div>
  );
}
