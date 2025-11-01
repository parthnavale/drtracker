import { useCallback, useState, useEffect, useMemo } from 'react';

export const usePagination = (data, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useCallback(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data, currentPage, itemsPerPage]);

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedData: paginatedData(),
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    };
};

export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useSearch = (items, searchKeys = ['name']) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm);

    const filteredItems = useMemo(() => {
        if (!debouncedSearchTerm) return items;

        return items.filter(item => {
            return searchKeys.some(key => {
                const value = item[key];
                if (!value) return false;
                return value.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            });
        });
    }, [items, debouncedSearchTerm, searchKeys]);

    return {
        searchTerm,
        setSearchTerm,
        filteredItems
    };
};