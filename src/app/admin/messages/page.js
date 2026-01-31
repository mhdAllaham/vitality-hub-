'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminTable from '@/components/AdminTable';

export default function AdminMessages() {
    const { language } = useLanguage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/messages');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleEdit = async (id, data) => {
        await fetch('/api/admin/messages', {
            method: 'PUT',
            body: JSON.stringify({ id, status: data.status })
        });
        fetchItems();
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            alert(err.error);
        }
        fetchItems();
    };

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'message', label: 'Message' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Date' },
    ];

    const fields = [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'text', required: true },
        { name: 'subject', type: 'text', required: true },
        { name: 'message', type: 'textarea', required: true },
        { name: 'status', type: 'select', options: ['unread', 'read', 'replied'], required: true },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <AdminTable
            title={language === 'ar' ? 'رسائل التواصل' : 'Contact Messages'}
            data={items.map(item => ({
                ...item,
                createdAt: new Date(item.createdAt).toLocaleDateString()
            }))}
            columns={columns}
            onAdd={() => alert('Messages are submitted via the Contact page.')}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fields={fields}
        />
    );
}
