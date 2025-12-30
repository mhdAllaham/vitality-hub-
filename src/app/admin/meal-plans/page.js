'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminTable from '@/components/AdminTable';

export default function AdminMealPlans() {
    const { language, t } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/meal-plans');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleAdd = async (data) => {
        await fetch('/api/admin/meal-plans', { method: 'POST', body: JSON.stringify(data) });
        fetchItems();
    };

    const handleEdit = async (id, data) => {
        await fetch('/api/admin/meal-plans', { method: 'PUT', body: JSON.stringify({ id, ...data }) });
        fetchItems();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/admin/meal-plans?id=${id}`, { method: 'DELETE' });
        fetchItems();
    };

    const columns = [
        { key: 'nameEn', label: 'Name (EN)' },
        { key: 'nameAr', label: 'الاسم (AR)' },
        { key: 'type', label: 'Type' },
    ];

    const fields = [
        { name: 'nameEn', required: true },
        { name: 'nameAr', required: true },
        { name: 'type', type: 'select', options: ['Breakfast', 'Lunch', 'Dinner'], required: true },
        { name: 'image', type: 'image', required: false },
        { name: 'descriptionEn', type: 'textarea', required: true },
        { name: 'descriptionAr', type: 'textarea', required: true },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <AdminTable
            title={language === 'ar' ? 'إدارة خطط الوجبات' : 'Manage Meal Plans'}
            data={items}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fields={fields}
        />
    );
}
