import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const BooksShow = () => {
    const { queryResult } = useShow({
        meta: {
            populate: "*",
        },
    });
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>{"ID"}</Title>
            <TextField value={record?.id} />
            <Title level={5}>{"Name"}</Title>
            <TextField value={record?.name} />
            <Title level={5}>{"Description"}</Title>
            <MarkdownField value={record?.description} />
            <Title level={5}>{"Collections"}</Title>
            { record?.collections.map((collection: any) => (
                    <TextField key={collection.id} value={collection.name} />
                )
            )}
            <Title level={5}>{"Status"}</Title>
            <TextField value={record?.status} />
            <Title level={5}>{"CreatedAt"}</Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
