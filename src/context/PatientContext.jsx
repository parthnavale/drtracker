import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const PatientContext = createContext();

const STORAGE_KEY = 'drtracker_patients';

const INITIAL_PATIENTS = [
    {
        id: 1,
        name: "Amit Patel",
        age: 34,
        gender: "male",
        phone: "+91 98765 43210",
        lastVisit: "2024-01-15",
        condition: "Routine Checkup"
    },
    {
        id: 2,
        name: "Sunita Devi",
        age: 45,
        gender: "female",
        phone: "+91 98765 43211",
        lastVisit: "2024-01-14",
        condition: "Hypertension"
    }
];

export function PatientProvider({ children }) {
    const [patients, setPatientsState] = useState(() => {
        // Load patients from localStorage on initial render
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load patients from localStorage:', error);
        }
        return INITIAL_PATIENTS;
    });

    // Persist to localStorage whenever patients change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
        } catch (error) {
            console.error('Failed to save patients to localStorage:', error);
        }
    }, [patients]);

    const addPatient = useCallback((newPatient) => {
        setPatientsState(prev => [
            ...prev,
            {
                ...newPatient,
                id: Date.now(), // Simple ID generation
            }
        ]);
    }, []);

    const updatePatient = useCallback((id, updatedData) => {
        setPatientsState(prev => 
            prev.map(patient => 
                patient.id === id ? { ...patient, ...updatedData } : patient
            )
        );
    }, []);

    const deletePatient = useCallback((id) => {
        setPatientsState(prev => prev.filter(patient => patient.id !== id));
    }, []);

    const getPatientById = useCallback((id) => {
        return patients.find(patient => patient.id === id);
    }, [patients]);

    const value = {
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        getPatientById
    };

    return (
        <PatientContext.Provider value={value}>
            {children}
        </PatientContext.Provider>
    );
}

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
};