import React, { useCallback, useState, useContext } from 'react';
import { usePatients } from '../context/PatientContext';
import { Card, Input, Row, Col, Button, Modal, Divider, Timeline, Form, Select, message } from 'antd';
import { SearchOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useSearch } from '../hooks/useDataManagement';
import { ThemeContext } from '../themeContext';

const { Search } = Input;

const PatientInsightsPage = () => {
    const { tokens } = useContext(ThemeContext);
    const { patients } = usePatients();
    const { searchTerm, setSearchTerm, filteredItems } = useSearch(patients, ['name', 'condition', 'gender']);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPrescriptionModalVisible, setIsPrescriptionModalVisible] = useState(false);
    const [prescriptionForm] = Form.useForm();

    const handleSearch = useCallback((value) => {
        setSearchTerm(value);
    }, [setSearchTerm]);

    const handleViewDetails = useCallback((patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false);
        setSelectedPatient(null);
    }, []);

    const handleOpenPrescriptionModal = useCallback(() => {
        setIsPrescriptionModalVisible(true);
    }, []);

    const handleClosePrescriptionModal = useCallback(() => {
        setIsPrescriptionModalVisible(false);
        prescriptionForm.resetFields();
    }, [prescriptionForm]);

    const handleSavePrescription = useCallback(async () => {
        try {
            const values = await prescriptionForm.validateFields();
            // In a real app, you would save this to the backend or context
            message.success('Prescription added successfully!');
            handleClosePrescriptionModal();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    }, [prescriptionForm, handleClosePrescriptionModal]);

    // Mock prescription data - in real app, this would come from patient data
    const getPrescriptions = (patientId) => [
        {
            id: 1,
            date: '2024-01-18',
            medication: 'Paracetamol 500mg',
            dosage: 'twice daily for 3 days'
        },
        {
            id: 2,
            date: '2024-01-10',
            medication: 'Vitamin D3 60000 IU',
            dosage: 'Once weekly for 8 weeks'
        }
    ];

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 64px)' }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: 16, color: '#000' }}>
                    Patient Insights
                </h1>
                <Search
                    placeholder="Search patients..."
                    prefix={<SearchOutlined style={{ color: '#666' }} />}
                    style={{ maxWidth: 400 }}
                    size="large"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Patient Cards Grid */}
            <Row gutter={[24, 24]}>
                {filteredItems.map((patient) => (
                    <Col xs={24} sm={12} lg={6} key={patient.id}>
                        <Card
                            bordered={false}
                            style={{
                                borderRadius: 8,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                height: '100%'
                            }}
                            bodyStyle={{ padding: '20px' }}
                        >
                            {/* Patient Header */}
                            <div style={{ marginBottom: 16 }}>
                                <h3 style={{ 
                                    fontSize: '16px', 
                                    fontWeight: 600, 
                                    margin: 0, 
                                    marginBottom: 4,
                                    color: '#000'
                                }}>
                                    {patient.name}
                                </h3>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: '#666', 
                                    margin: 0 
                                }}>
                                    {patient.age} yrs
                                </p>
                            </div>

                            {/* Patient Details */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ marginBottom: 8 }}>
                                    <span style={{ 
                                        fontSize: '12px', 
                                        color: '#999',
                                        display: 'block',
                                        marginBottom: 2
                                    }}>
                                        Gender:
                                    </span>
                                    <span style={{ 
                                        fontSize: '14px', 
                                        color: '#333',
                                        textTransform: 'capitalize'
                                    }}>
                                        {patient.gender}
                                    </span>
                                </div>

                                <div style={{ marginBottom: 8 }}>
                                    <span style={{ 
                                        fontSize: '12px', 
                                        color: '#999',
                                        display: 'block',
                                        marginBottom: 2
                                    }}>
                                        Phone:
                                    </span>
                                    <span style={{ 
                                        fontSize: '14px', 
                                        color: '#333'
                                    }}>
                                        {patient.phone}
                                    </span>
                                </div>

                                <div style={{ marginBottom: 8 }}>
                                    <span style={{ 
                                        fontSize: '12px', 
                                        color: '#999',
                                        display: 'block',
                                        marginBottom: 2
                                    }}>
                                        Last Visit:
                                    </span>
                                    <span style={{ 
                                        fontSize: '14px', 
                                        color: '#333'
                                    }}>
                                        {patient.lastVisit}
                                    </span>
                                </div>

                                <div>
                                    <span style={{ 
                                        fontSize: '12px', 
                                        color: '#999',
                                        display: 'block',
                                        marginBottom: 2
                                    }}>
                                        Condition:
                                    </span>
                                    <span style={{ 
                                        fontSize: '14px', 
                                        color: '#333'
                                    }}>
                                        {patient.condition}
                                    </span>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <Button
                                type="link"
                                onClick={() => handleViewDetails(patient)}
                                style={{
                                    color: tokens.colorPrimary,
                                    padding: 0,
                                    fontWeight: 500,
                                    fontSize: '14px'
                                }}
                            >
                                View Details →
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#999'
                }}>
                    <p style={{ fontSize: '16px' }}>No patients found</p>
                </div>
            )}

            {/* Patient Details Modal */}
            <Modal
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={600}
                closeIcon={<CloseOutlined style={{ fontSize: '16px', color: '#666' }} />}
                style={{ top: 40 }}
            >
                {selectedPatient && (
                    <div>
                        {/* Modal Header */}
                        <h2 style={{ 
                            fontSize: '18px', 
                            fontWeight: 600, 
                            marginBottom: 24,
                            color: '#000'
                        }}>
                            Patient Details
                        </h2>

                        {/* Patient Information Section */}
                        <div style={{ marginBottom: 32 }}>
                            <h3 style={{ 
                                fontSize: '14px', 
                                fontWeight: 600, 
                                marginBottom: 16,
                                color: '#000'
                            }}>
                                Patient Information
                            </h3>

                            <Row gutter={[24, 16]}>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Full Name:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            {selectedPatient.name}
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Age:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            {selectedPatient.age} years
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Gender:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500,
                                            textTransform: 'capitalize'
                                        }}>
                                            {selectedPatient.gender}
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Phone:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            {selectedPatient.phone}
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Occupation:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            {selectedPatient.occupation || 'Software Engineer'}
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Weight:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            70 kg
                                        </p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Last Visit:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            {selectedPatient.lastVisit}
                                        </p>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <div>
                                        <p style={{ 
                                            fontSize: '12px', 
                                            color: '#999', 
                                            marginBottom: 4 
                                        }}>
                                            Current Condition:
                                        </p>
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#000', 
                                            margin: 0,
                                            fontWeight: 500
                                        }}>
                                            {selectedPatient.condition}
                                        </p>
                                    </div>
                                </Col>
                            </Row>

                            <div style={{ marginTop: 16 }}>
                                <p style={{ 
                                    fontSize: '12px', 
                                    color: '#999', 
                                    marginBottom: 4 
                                }}>
                                    Medical History:
                                </p>
                                <p style={{ 
                                    fontSize: '14px', 
                                    color: '#000', 
                                    margin: 0 
                                }}>
                                    No significant medical history
                                </p>
                            </div>
                        </div>

                        <Divider style={{ margin: '24px 0' }} />

                        {/* Prescription History Section */}
                        <div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: 16 
                            }}>
                                <h3 style={{ 
                                    fontSize: '14px', 
                                    fontWeight: 600, 
                                    margin: 0,
                                    color: '#000'
                                }}>
                                    Prescription History
                                </h3>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={handleOpenPrescriptionModal}
                                    style={{
                                        backgroundColor: tokens.colorPrimary,
                                        borderColor: tokens.colorPrimary,
                                        fontSize: '12px',
                                        height: '28px'
                                    }}
                                >
                                    Add Prescription
                                </Button>
                            </div>

                            <Timeline
                                items={getPrescriptions(selectedPatient.id).map((prescription, index) => ({
                                    color: tokens.colorPrimary,
                                    children: (
                                        <div key={prescription.id}>
                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: 4
                                            }}>
                                                <div>
                                                    <p style={{ 
                                                        fontSize: '14px', 
                                                        fontWeight: 500,
                                                        margin: 0,
                                                        marginBottom: 4,
                                                        color: '#000'
                                                    }}>
                                                        Visit Date: {prescription.date}
                                                    </p>
                                                    <p style={{ 
                                                        fontSize: '13px', 
                                                        color: '#666',
                                                        margin: 0,
                                                        marginBottom: 2
                                                    }}>
                                                        {prescription.medication} - {prescription.dosage}
                                                    </p>
                                                </div>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    style={{
                                                        color: tokens.colorPrimary,
                                                        padding: 0,
                                                        fontSize: '12px',
                                                        height: 'auto'
                                                    }}
                                                >
                                                    #{index + 1} View
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }))}
                            />
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Prescription Modal */}
            <Modal
                open={isPrescriptionModalVisible}
                onCancel={handleClosePrescriptionModal}
                footer={null}
                width={500}
                closeIcon={<CloseOutlined style={{ fontSize: '16px', color: '#666' }} />}
                style={{ top: 80 }}
            >
                <div>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: 600, 
                        marginBottom: 24,
                        color: '#000'
                    }}>
                        Add Prescription
                    </h2>

                    <Form
                        form={prescriptionForm}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label={<span style={{ fontSize: '13px', fontWeight: 500 }}>Medicine Name</span>}
                                    name="medicineName"
                                    rules={[{ required: true, message: 'Please enter medicine name' }]}
                                >
                                    <Input 
                                        placeholder="Enter medicine name" 
                                        style={{ height: '36px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<span style={{ fontSize: '13px', fontWeight: 500 }}>Frequency</span>}
                                    name="frequency"
                                    rules={[{ required: true, message: 'Please select frequency' }]}
                                >
                                    <Select 
                                        placeholder="Select frequency"
                                        style={{ width: '100%' }}
                                    >
                                        <Select.Option value="once">Once daily</Select.Option>
                                        <Select.Option value="twice">Twice daily</Select.Option>
                                        <Select.Option value="thrice">Thrice daily</Select.Option>
                                        <Select.Option value="weekly">Once weekly</Select.Option>
                                        <Select.Option value="asNeeded">As needed</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label={<span style={{ fontSize: '13px', fontWeight: 500 }}>Duration</span>}
                                    name="duration"
                                    rules={[{ required: true, message: 'Please enter duration' }]}
                                >
                                    <Input 
                                        placeholder="e.g., 7 days" 
                                        style={{ height: '36px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<span style={{ fontSize: '13px', fontWeight: 500 }}>When to take</span>}
                                    name="whenToTake"
                                    rules={[{ required: true, message: 'Please select when to take' }]}
                                >
                                    <Select 
                                        placeholder="Select timing"
                                        style={{ width: '100%' }}
                                    >
                                        <Select.Option value="beforeFood">Before food</Select.Option>
                                        <Select.Option value="afterFood">After food</Select.Option>
                                        <Select.Option value="withFood">With food</Select.Option>
                                        <Select.Option value="anytime">Anytime</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label={<span style={{ fontSize: '13px', fontWeight: 500 }}>Special Instructions</span>}
                            name="instructions"
                        >
                            <Input.TextArea 
                                rows={3}
                                placeholder="Enter any special instructions..."
                                style={{ resize: 'none' }}
                            />
                        </Form.Item>

                        <div style={{ 
                            display: 'flex', 
                            gap: '12px', 
                            justifyContent: 'flex-start',
                            marginTop: 24 
                        }}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleSavePrescription}
                                style={{
                                    backgroundColor: tokens.colorPrimary,
                                    borderColor: tokens.colorPrimary,
                                    height: '36px',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}
                            >
                                Save Prescription
                            </Button>
                            <Button
                                onClick={handleClosePrescriptionModal}
                                style={{
                                    height: '36px',
                                    fontSize: '14px'
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default PatientInsightsPage;
