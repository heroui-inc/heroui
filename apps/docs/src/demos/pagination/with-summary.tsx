import {Pagination} from "@heroui/react";

export function PaginationWithSummary() {
  return (
    <Pagination className="w-full">
      <Pagination.Summary>Showing 1-10 of 120 results</Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>11</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>12</Pagination.Link>
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
