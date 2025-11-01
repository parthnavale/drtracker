import React, { useMemo, useCallback } from 'react';
import { usePatients } from '../context/PatientContext';
import { Card, Input, Row, Col, Button, Table } from 'antd';
import { SearchOutlined, UserOutlined, CalendarOutlined, PlusCircleOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useSearch } from '../hooks/useDataManagement';

const { Search } = Input;

const OverviewPage = () => {
    const { patients } = usePatients();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const todaysAppointments = patients.filter(patient => patient.lastVisit === todayStr);

    const { searchTerm, setSearchTerm, filteredItems } = useSearch(patients, ['name', 'condition']);

    const handleSearch = useCallback((value) => {
        setSearchTerm(value);
    }, [setSearchTerm]);

    // Table columns configuration
    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '15%',
        },
        {
            title: 'Last Visit',
            dataIndex: 'lastVisit',
            key: 'lastVisit',
            width: '20%',
        },
        {
            title: 'Condition',
            dataIndex: 'condition',
            key: 'condition',
            width: '25%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            align: 'right',
            render: () => (
                <Button 
                    type="link" 
                    style={{ 
                        color: '#00b896',
                        padding: 0,
                        fontWeight: 500
                    }}
                >
                    View Details
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            {/* Search Section */}
            <Row style={{ marginBottom: 32 }}>
                <Col span={24}>
                    <Search
                        placeholder="Search existing patients..."
                        prefix={<SearchOutlined style={{ color: '#666' }} />}
                        style={{ maxWidth: 400 }}
                        size="large"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
            </Row>

            {/* Quick Actions Section */}
            <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: 24 }}>Quick Actions</h2>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: 8,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                height: '100%',
                                minHeight: 120
                            }}
                            bodyStyle={{ padding: '24px', height: '100%' }}
                            hoverable
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Today's Appointments</h3>
                                    <p style={{ fontSize: '30px', fontWeight: 600, margin: 0, lineHeight: '38px' }}>{todaysAppointments.length}</p>
                                </div>
                                <div style={{ 
                                    background: '#E6F7FF', 
                                    padding: '12px', 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    flexShrink: 0
                                }}>
                                    <CalendarOutlined style={{ fontSize: '24px', color: '#1890FF' }} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: 8,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                height: '100%',
                                minHeight: 120
                            }}
                            bodyStyle={{ padding: '24px', height: '100%' }}
                            hoverable
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Total Patients</h3>
                                    <p style={{ fontSize: '30px', fontWeight: 600, margin: 0, lineHeight: '38px' }}>{patients.length}</p>
                                </div>
                                <div style={{ 
                                    background: '#D4F4E7', 
                                    padding: '12px', 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    flexShrink: 0
                                }}>
                                    <UserOutlined style={{ fontSize: '24px', color: '#00b896' }} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: 8,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                cursor: 'pointer',
                                height: '100%',
                                minHeight: 120
                            }}
                            bodyStyle={{ padding: '24px', height: '100%' }}
                            hoverable
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Add New Patient</h3>
                                    <p style={{ fontSize: '13px', color: '#999', margin: 0, lineHeight: '38px' }}>Register a patient</p>
                                </div>
                                <div style={{ 
                                    background: '#FFF7E6', 
                                    padding: '12px', 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    flexShrink: 0
                                }}>
                                    <PlusCircleOutlined style={{ fontSize: '24px', color: '#FA8C16' }} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: 8,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                cursor: 'pointer',
                                height: '100%',
                                minHeight: 120
                            }}
                            bodyStyle={{ padding: '24px', height: '100%' }}
                            hoverable
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Medicine Stock</h3>
                                    <p style={{ fontSize: '13px', color: '#999', margin: 0, lineHeight: '38px' }}>Manage inventory</p>
                                </div>
                                <div style={{ 
                                    background: '#E6FFFB', 
                                    padding: '12px', 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    flexShrink: 0
                                }}>
                                    <MedicineBoxOutlined style={{ fontSize: '24px', color: '#13C2C2' }} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Recent Patients Section */}
            <div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: 24 }}>Recent Patients</h2>
                <Card 
                    bordered={false}
                    style={{ 
                        borderRadius: 8,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={filteredItems.map((item, index) => ({
                            ...item,
                            key: index
                        }))}
                        pagination={false}
                        size="middle"
                        style={{
                            background: '#fff'
                        }}
                    />
                </Card>
            </div>
        </div>
    );
};

export default OverviewPage;