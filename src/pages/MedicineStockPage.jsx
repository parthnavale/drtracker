import React, { useState, useMemo, useCallback } from 'react';
import { Card, Row, Col, Table, Button, Badge, Tag } from 'antd';
import { PlusOutlined, MedicineBoxOutlined } from '@ant-design/icons';

const MedicineStockPage = () => {
    // Sample medicine data
    const [medicines] = useState([
        { id: 1, name: 'Paracetamol', dosage: '500mg', category: 'Pain Relief', stock: 150, price: 2.5, manufacturer: 'GSK', status: 'In Stock' },
        { id: 2, name: 'Ibuprofen', dosage: '400mg', category: 'Pain Relief', stock: 120, price: 3.2, manufacturer: 'Cipla', status: 'In Stock' },
        { id: 3, name: 'Aspirin', dosage: '75mg', category: 'Cardiovascular', stock: 80, price: 1.8, manufacturer: 'Bayer', status: 'In Stock' },
        { id: 4, name: 'Paracetamol', dosage: '500mg', category: 'Pain Relief', stock: 150, price: 2.5, manufacturer: 'GSK', status: 'Low Stock' },
        { id: 5, name: 'Ibuprofen', dosage: '400mg', category: 'Pain Relief', stock: 120, price: 3.2, manufacturer: 'Cipla', status: 'In Stock' },
        { id: 6, name: 'Aspirin', dosage: '75mg', category: 'Cardiovascular', stock: 80, price: 1.8, manufacturer: 'Bayer', status: 'In Stock' },
        { id: 7, name: 'Paracetamol', dosage: '500mg', category: 'Pain Relief', stock: 0, price: 2.5, manufacturer: 'GSK', status: 'Critical Stock' },
        { id: 8, name: 'Ibuprofen', dosage: '400mg', category: 'Pain Relief', stock: 120, price: 3.2, manufacturer: 'Cipla', status: 'In Stock' },
        { id: 9, name: 'Aspirin', dosage: '75mg', category: 'Cardiovascular', stock: 80, price: 1.8, manufacturer: 'Bayer', status: 'In Stock' },
    ]);

    // Calculate stats
    const stats = useMemo(() => {
        const total = medicines.length;
        const wellStocked = medicines.filter(m => m.status === 'In Stock').length;
        const lowStock = medicines.filter(m => m.status === 'Low Stock').length;
        const criticalStock = medicines.filter(m => m.status === 'Critical Stock').length;
        
        return { total, wellStocked, lowStock, criticalStock };
    }, [medicines]);

    // Status tag renderer
    const getStatusTag = useCallback((status) => {
        const statusConfig = {
            'In Stock': { color: '#52c41a', background: '#f6ffed', border: '#b7eb8f' },
            'Low Stock': { color: '#fa8c16', background: '#fff7e6', border: '#ffd591' },
            'Critical Stock': { color: '#ff4d4f', background: '#fff1f0', border: '#ffa39e' }
        };
        
        const config = statusConfig[status] || statusConfig['In Stock'];
        
        return (
            <Tag 
                style={{ 
                    color: config.color,
                    background: config.background,
                    border: `1px solid ${config.border}`,
                    borderRadius: 4,
                    padding: '2px 8px',
                    fontWeight: 500
                }}
            >
                {status}
            </Tag>
        );
    }, []);

    // Table columns
    const columns = [
        {
            title: 'Medicine Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Dosage',
            dataIndex: 'dosage',
            key: 'dosage',
            width: '12%',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: '15%',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            width: '10%',
        },
        {
            title: 'Price (₹)',
            dataIndex: 'price',
            key: 'price',
            width: '12%',
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            width: '15%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '13%',
            render: (status) => getStatusTag(status),
        },
        {
            title: 'Action',
            key: 'action',
            width: '8%',
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
                    Update Reorder
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            {/* Summary Cards */}
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
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
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Total Medicines</h3>
                                <p style={{ fontSize: '30px', fontWeight: 600, margin: 0, lineHeight: '38px' }}>{stats.total}</p>
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
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Well Stocked</h3>
                                <p style={{ fontSize: '30px', fontWeight: 600, margin: 0, lineHeight: '38px' }}>{stats.wellStocked}</p>
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
                                <Badge 
                                    count={0}
                                    dot 
                                    style={{ 
                                        backgroundColor: '#52c41a',
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%'
                                    }}
                                />
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
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Low Stock</h3>
                                <p style={{ fontSize: '30px', fontWeight: 600, margin: 0, lineHeight: '38px', color: '#fa8c16' }}>{stats.lowStock}</p>
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
                                <Badge 
                                    count={0}
                                    dot 
                                    style={{ 
                                        backgroundColor: '#fa8c16',
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%'
                                    }}
                                />
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
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '14px', color: '#666', marginBottom: 8, fontWeight: 500, lineHeight: '20px' }}>Critical Stock</h3>
                                <p style={{ fontSize: '30px', fontWeight: 600, margin: 0, lineHeight: '38px', color: '#ff4d4f' }}>{stats.criticalStock}</p>
                            </div>
                            <div style={{ 
                                background: '#FFF1F0', 
                                padding: '12px', 
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 48,
                                height: 48,
                                flexShrink: 0
                            }}>
                                <Badge 
                                    count={0}
                                    dot 
                                    style={{ 
                                        backgroundColor: '#ff4d4f',
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%'
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Medicine Inventory Section */}
            <div>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 24 
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>Medicine Inventory</h2>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        style={{ 
                            background: '#00b896',
                            borderColor: '#00b896',
                            fontWeight: 500
                        }}
                    >
                        Add Medicine
                    </Button>
                </div>
                
                <Card 
                    bordered={false}
                    style={{ 
                        borderRadius: 8,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={medicines.map((item) => ({
                            ...item,
                            key: item.id
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

export default MedicineStockPage;
