import {Pagination} from "@heroui/react";

export function PaginationSimplePrevNext() {
  return (
    <Pagination className="w-full">
      <Pagination.Summary>1 to 5 of 10 invoices</Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous>
            <Pagination.PreviousIcon />
            <span>Prev</span>
          </Pagination.Previous>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
