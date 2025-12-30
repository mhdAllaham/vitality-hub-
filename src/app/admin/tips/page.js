'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminTable from '@/components/AdminTable';

export default function AdminTips() {
    const { language, t } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/tips');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleAdd = async (data) => {
        await fetch('/api/admin/tips', { method: 'POST', body: JSON.stringify(data) });
        fetchItems();
    };

    const handleEdit = async (id, data) => {
        await fetch('/api/admin/tips', { method: 'PUT', body: JSON.stringify({ id, ...data }) });
        fetchItems();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/admin/tips?id=${id}`, { method: 'DELETE' });
        fetchItems();
    };

    const columns = [
        { key: 'contentEn', label: 'Content (EN)' },
        { key: 'contentAr', label: 'المحتوى (AR)' },
    ];

    const fields = [
        { name: 'contentEn', type: 'textarea', required: true },
        { name: 'contentAr', type: 'textarea', required: true },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <AdminTable
            title={language === 'ar' ? 'إدارة النصائح' : 'Manage Health Tips'}
            data={items}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fields={fields}
        />
    );
}
