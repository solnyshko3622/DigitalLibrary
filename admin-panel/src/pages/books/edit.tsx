import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";

interface Book {
    id: string;
    documentId: string;
    name: string;
    description: string;
    collections: Array<{ id: string; name: string }>;
}

interface Collection {
    id: string;
    name: string;
    description: string;
}

export const BooksEdit = () => {
    const { formProps, saveButtonProps, queryResult, formLoading } = useForm({
        meta: {
            populate: "*",
        },
    });

    const bookData = queryResult?.data?.data;

    const { selectProps: categorySelectProps } = useSelect<Collection>({
        resource: "collections",
        optionLabel: "name",
        optionValue: "id",
        defaultValue: bookData?.collections?.map((collection) => collection.id),
        queryOptions: {
            enabled: !!bookData,
        },
    });

    // Устанавливаем значения формы, когда данные книги загружены
    useEffect(() => {
        formProps.form?.setFieldsValue({
            collections: bookData?.collections?.map((collection) => collection.id),
        });
    }, [bookData, formProps.form]);

    const handleFinish = (values: any) => {
        // Преобразуем значения в формат { "collections": { "connect": [...] } }
        values.collections = {
            connect: values.collections.map((id: string) => id),
        };

        // Отправляем запрос через `formProps.onFinish`, чтобы данные отправились на сервер
        formProps.onFinish?.(values);
    };

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
            <Form {...formProps} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the book name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a description",
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>

                <Form.Item
                    label="Collections"
                    name="collections"
                    rules={[
                        {
                            required: true,
                            message: "Please select at least one collection",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        {...categorySelectProps}
                        fieldNames={{
                            label: "label",
                            value: "value",
                        }}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
