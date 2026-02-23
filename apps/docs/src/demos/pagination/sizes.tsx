import {Pagination} from "@heroui/react";

export function PaginationSizes() {
  return (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted capitalize">{size}</span>
          <Pagination className="justify-center" size={size}>
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
                <Pagination.Next>
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      ))}
    </div>
  );
}
