'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminTable from '@/components/AdminTable';

export default function AdminExercises() {
    const { language, t } = useLanguage();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExercises = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/exercises');
        const data = await res.json();
        setExercises(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const handleAdd = async (data) => {
        await fetch('/api/admin/exercises', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        fetchExercises();
    };

    const handleEdit = async (id, data) => {
        await fetch('/api/admin/exercises', {
            method: 'PUT',
            body: JSON.stringify({ id, ...data }),
        });
        fetchExercises();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/admin/exercises?id=${id}`, {
            method: 'DELETE',
        });
        fetchExercises();
    };

    const columns = [
        { key: 'nameEn', label: 'Name (EN)' },
        { key: 'nameAr', label: 'الاسم (AR)' },
        { key: 'categoryEn', label: 'Category' },
    ];

    const fields = [
        { name: 'nameEn', required: true },
        { name: 'nameAr', required: true },
        { name: 'categoryEn', type: 'select', options: ['Cardio', 'Strength', 'Yoga', 'Flexibility'], required: true },
        { name: 'categoryAr', required: true },
        { name: 'image', type: 'image', required: false },
        { name: 'descriptionEn', type: 'textarea', required: true },
        { name: 'descriptionAr', type: 'textarea', required: true },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <AdminTable
            title={language === 'ar' ? 'إدارة التمارين' : 'Manage Exercises'}
            data={exercises}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fields={fields}
        />
    );
}
