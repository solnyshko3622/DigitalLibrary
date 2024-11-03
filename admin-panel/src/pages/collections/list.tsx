import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

interface Collection {
    id: string;
    name: string;
    documentId: string;
    description: string;
}


export const CollectionList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"name"} />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: Collection) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.documentId} />
              <ShowButton hideText size="small" recordItemId={record.documentId} />
              <DeleteButton hideText size="small" recordItemId={record.documentId} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
