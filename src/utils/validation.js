export const sanitizeString = (str) => {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
};

// Ant Design form validator for phone
export const validatePhone = (_, value) => {
    if (!value) {
        return Promise.resolve();
    }
    
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    if (!phoneRegex.test(value)) {
        return Promise.reject(new Error('Please enter a valid phone number'));
    }
    
    return Promise.resolve();
};

// Ant Design form validator for email
export const validateEmail = (_, value) => {
    if (!value) {
        return Promise.resolve();
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        return Promise.reject(new Error('Please enter a valid email address'));
    }
    
    return Promise.resolve();
};

// Ant Design form validator for age
export const validateAge = (_, value) => {
    if (!value) {
        return Promise.resolve();
    }
    
    const ageNum = parseInt(value, 10);
    
    if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 150) {
        return Promise.reject(new Error('Please enter a valid age (1-149)'));
    }
    
    return Promise.resolve();
};

// Generic required field validator
export const validateRequired = (value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null && value !== undefined;
};