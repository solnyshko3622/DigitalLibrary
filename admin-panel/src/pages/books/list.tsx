import {
    DateField,
    DeleteButton,
    EditButton,
    List,
    MarkdownField,
    ShowButton,
    useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Space, Table } from "antd";

interface Book {
    id: string;
    documentId: string;
    name: string;
    description: string;
    collections: Array<{ id: string }>; // Поле `collections` теперь массив объектов
}

export const BooksList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        meta: {
            populate: ["collections"], // Подтягиваем коллекции для каждой книги
        },
    });

    const { data: collectionData, isLoading: categoryIsLoading } = useMany({
        resource: "collections",
        ids:
            tableProps?.dataSource
                ?.flatMap((item) => item?.collections.map((col) => col.id)) // Собираем все `id` коллекций
                .filter(Boolean) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title={"ID"} />
                <Table.Column dataIndex="name" title={"Name"} />
                <Table.Column
                    dataIndex="description"
                    title={"Description"}
                    render={(value: any) => {
                        if (!value) return "-";
                        return <MarkdownField value={value.slice(0, 80) + "..."} />;
                    }}
                />
                <Table.Column
                    dataIndex="collections"
                    title={"Collections"}
                    render={(collections: any[]) =>
                        categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            collections
                                .map(
                                    (collection) =>
                                        collectionData?.data?.find(
                                            (item) => item.id === collection.id
                                        )?.name
                                )
                                .filter(Boolean)
                                .join(", ") || "-"
                        )
                    }
                />
                <Table.Column dataIndex="status" title={"Status"} />
                <Table.Column
                    dataIndex={["createdAt"]}
                    title={"Created at"}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title={"Actions"}
                    dataIndex="actions"
                    render={(_, record: Book) => (
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
