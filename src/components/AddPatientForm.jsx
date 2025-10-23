import React from "react";
import { Form, Input, Select, Row, Col, Button } from "antd";

const { TextArea } = Input;

export default function AddPatientForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Patient values:", values);
    // TODO: integrate with backend or local storage
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}> 
            <Input placeholder="Enter patient name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}> 
            <Select placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}> 
            <Input placeholder="Enter age" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="profession" label="Profession">
            <Input placeholder="Enter profession" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="weight" label="Weight (kg)">
            <Input placeholder="Enter weight" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="height" label="Height (cm)">
            <Input placeholder="Enter height" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}> 
        <Input placeholder="+91 98765 43210" />
      </Form.Item>

      <Form.Item name="medicalHistory" label="Medical History">
        <TextArea rows={4} placeholder="Enter medical history" />
      </Form.Item>

      <Form.Item name="currentSymptoms" label="Current Symptoms">
        <TextArea rows={4} placeholder="Enter current symptoms" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Save Patient</Button>
      </Form.Item>
    </Form>
  );
}