import {Pagination} from "@heroui/react";
import {Icon} from "@iconify/react";

export function PaginationCustomIcons() {
  return (
    <Pagination className="justify-center">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous>
            <Pagination.PreviousIcon>
              <Icon icon="gravity-ui:arrow-left" />
            </Pagination.PreviousIcon>
            <span>Back</span>
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
            <span>Forward</span>
            <Pagination.NextIcon>
              <Icon icon="gravity-ui:arrow-right" />
            </Pagination.NextIcon>
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
