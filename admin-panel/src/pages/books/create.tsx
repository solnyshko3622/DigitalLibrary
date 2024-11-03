import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export const BooksCreate = () => {
    const { formProps, saveButtonProps } = useForm({
        resource: "books",
        redirect: "list",
        onSubmit: (values) => {
            // Обработка данных перед отправкой
            return {
                ...values,
                collections: {
                    connect: values.collections,
                },
                // Преобразование загруженных файлов в формат, ожидаемый API
                image: values.image && values.image.fileList.map(file => file.originFileObj), // Если загружено изображение
                document: values.document && values.document.fileList.map(file => file.originFileObj), // Если загружен документ
            };
        },
    });

    const { selectProps: categorySelectProps } = useSelect({
        resource: "collections",
        optionLabel: "name",
        optionValue: "id",
        mode: "multiple",
    });

    const [fileListImage, setFileListImage] = useState([]);
    const [fileListDocument, setFileListDocument] = useState([]);

    const handleImageChange = ({ fileList }) => {
        setFileListImage(fileList);
    };

    const handleDocumentChange = ({ fileList }) => {
        setFileListDocument(fileList);
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the book name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Please enter the author' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Collections"
                    name="collections"
                    rules={[{ required: true, message: 'Please select at least one collection' }]}
                >
                    <Select {...categorySelectProps} mode="multiple" />
                </Form.Item>

                {/* Поле для загрузки фотографии */}
                <Form.Item label="Upload Image" name="image">
                    <Upload
                        fileList={fileListImage}
                        onChange={handleImageChange}
                        beforeUpload={() => false} // Чтобы предотвратить автоматическую загрузку
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                {/* Поле для загрузки документа */}
                <Form.Item label="Upload Document" name="book">
                    <Upload
                        fileList={fileListDocument}
                        onChange={handleDocumentChange}
                        beforeUpload={() => false} // Чтобы предотвратить автоматическую загрузку
                    >
                        <Button icon={<UploadOutlined />}>Upload Document</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Create>
    );
};
