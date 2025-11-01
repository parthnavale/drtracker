import React from 'react';
import { Card } from 'antd';
import AddPatientForm from '../components/AddPatientForm';

const PatientsPage = () => {
    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: 24 }}>Add New Patient</h2>
            <Card 
                bordered={false}
                style={{ 
                    borderRadius: 8,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    background: '#fff'
                }}
                bodyStyle={{ padding: '32px' }}
            >
                <AddPatientForm />
            </Card>
        </div>
    );
};

export default PatientsPage;