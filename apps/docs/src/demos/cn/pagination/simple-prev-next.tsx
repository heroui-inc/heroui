"use client";

import {Pagination} from "@heroui/react";
import {useState} from "react";

export function PaginationSimplePrevNext() {
  const [page, setPage] = useState(1);
  const totalPages = 10;
  const itemsPerPage = 5;
  const totalItems = 50;

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Pagination className="w-full">
      <Pagination.Summary>
        第 {startItem}–{endItem} 条，共 {totalItems} 张发票
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
            <Pagination.PreviousIcon />
            <span>上一页</span>
          </Pagination.Previous>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
            <span>下一页</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
