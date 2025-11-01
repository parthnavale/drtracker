import React, { useCallback } from "react";
import { Form, Input, Select, Row, Col, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientContext";
import { validatePhone, validateAge } from "../utils/validation";

const { TextArea } = Input;

export default function AddPatientForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addPatient } = usePatients();

  const onFinish = useCallback((values) => {
    const newPatient = {
      name: values.fullName,
      age: parseInt(values.age, 10),
      gender: values.gender,
      phone: values.phone,
      profession: values.profession || 'N/A',
      weight: values.weight ? `${values.weight} kg` : 'N/A',
      height: values.height ? `${values.height} cm` : 'N/A',
      medicalHistory: values.medicalHistory || 'None',
      currentSymptoms: values.currentSymptoms || 'None',
      lastVisit: new Date().toISOString().split('T')[0],
      condition: values.currentSymptoms || "New Patient"
    };

    addPatient(newPatient);
    message.success("Patient added successfully!");
    form.resetFields();
    navigate("/overview");
  }, [addPatient, navigate, form]);

  return (
    <Form 
      layout="vertical" 
      form={form} 
      onFinish={onFinish}
      requiredMark="optional"
    >
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item 
            name="fullName" 
            label="Full Name" 
            rules={[{ 
              required: true, 
              message: 'Please enter patient name' 
            }]}
          >
            <Input 
              placeholder="Enter patient name" 
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item 
            name="gender" 
            label="Gender" 
            rules={[{ 
              required: true, 
              message: 'Please select gender' 
            }]}
          >
            <Select 
              placeholder="Select gender"
              size="large"
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item 
            name="age" 
            label="Age" 
            rules={[{ 
              required: true, 
              message: 'Please enter age' 
            }, {
              validator: validateAge
            }]}
          >
            <Input 
              placeholder="Enter age" 
              type="number"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item 
            name="profession" 
            label="Profession"
          >
            <Input 
              placeholder="Enter profession" 
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item 
            name="weight" 
            label="Weight (kg)"
          >
            <Input 
              placeholder="Enter weight" 
              type="number"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item 
            name="height" 
            label="Height (cm)"
          >
            <Input 
              placeholder="Enter height" 
              type="number"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item 
        name="phone" 
        label="Phone Number" 
        rules={[{ 
          required: true, 
          message: 'Please enter phone number' 
        }, {
          validator: validatePhone
        }]}
      >
        <Input 
          placeholder="+91 98765 43210" 
          size="large"
        />
      </Form.Item>

      <Form.Item 
        name="medicalHistory" 
        label="Medical History"
      >
        <TextArea 
          rows={4} 
          placeholder="Enter medical history" 
          size="large"
        />
      </Form.Item>

      <Form.Item 
        name="currentSymptoms" 
        label="Current Symptoms"
      >
        <TextArea 
          rows={4} 
          placeholder="Enter current symptoms" 
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          size="large"
          style={{ minWidth: 150 }}
        >
          Save Patient
        </Button>
      </Form.Item>
    </Form>
  );
}