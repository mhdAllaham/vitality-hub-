'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminTable from '@/components/AdminTable';

export default function AdminUsers() {
    const { language, t } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleEdit = async (id, data) => {
        await fetch('/api/admin/users', {
            method: 'PUT',
            body: JSON.stringify({ id, role: data.role })
        });
        fetchItems();
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            alert(err.error);
        }
        fetchItems();
    };

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
    ];

    const fields = [
        { name: 'role', type: 'select', options: ['USER', 'ADMIN'], required: true },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <AdminTable
            title={language === 'ar' ? 'إدارة المستخدمين' : 'Manage Users'}
            data={items}
            columns={columns}
            onAdd={() => alert('Use registration page to add users')}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fields={fields}
        />
    );
}
