'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminTable from '@/components/AdminTable';

export default function AdminHealthyFoods() {
    const { language, t } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/healthy-foods');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleAdd = async (data) => {
        await fetch('/api/admin/healthy-foods', { method: 'POST', body: JSON.stringify(data) });
        fetchItems();
    };

    const handleEdit = async (id, data) => {
        await fetch('/api/admin/healthy-foods', { method: 'PUT', body: JSON.stringify({ id, ...data }) });
        fetchItems();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/admin/healthy-foods?id=${id}`, { method: 'DELETE' });
        fetchItems();
    };

    const columns = [
        { key: 'nameEn', label: 'Name (EN)' },
        { key: 'nameAr', label: 'الاسم (AR)' },
        { key: 'categoryEn', label: 'Category' },
    ];

    const fields = [
        { name: 'nameEn', required: true },
        { name: 'nameAr', required: true },
        { name: 'categoryEn', type: 'select', options: ['Fruits', 'Vegetables', 'Herbs'], required: true },
        { name: 'categoryAr', required: true },
        { name: 'image', type: 'image', required: false },
        { name: 'benefitsEn', type: 'textarea', required: true },
        { name: 'benefitsAr', type: 'textarea', required: true },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <AdminTable
            title={language === 'ar' ? 'إدارة الأطعمة الصحية' : 'Manage Healthy Foods'}
            data={items}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fields={fields}
        />
    );
}
