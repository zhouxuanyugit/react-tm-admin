import React from "react";
import { Form, Input, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
const { TextArea } = Input;
moment.locale("zh-cn");
const EditForm = ({ visible, onCancel, onOk, confirmLoading, editData }) => {
  const [form] = Form.useForm();
  const { id, familyName, familyDes } = editData;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal
      title="编辑"
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            onOk(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      confirmLoading={confirmLoading}
      destroyOnClose
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{
          id,
          familyName,
          familyDes
        }}
      >
        <Form.Item label="序号:" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="家庭名称:"
          name="familyName"
          rules={[{ required: true, message: "家庭名称!" }]}>
          <Input placeholder="标题" />
        </Form.Item>
        <Form.Item
          label="家庭描述:"
          name="familyDes">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditForm;
