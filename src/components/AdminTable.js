'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminTable({ title, data, columns, onAdd, onEdit, onDelete, fields }) {
    const { t, language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setFormData(item || {});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            onEdit(editingItem.id, formData);
        } else {
            onAdd(formData);
        }
        handleCloseModal();
    };

    return (
        <div className="card glass" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>{title}</h2>
                <button onClick={() => handleOpenModal()} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    + {t('add')}
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                            {columns.map(col => (
                                <th key={col.key} style={{ padding: '1rem' }}>{t(col.key)}</th>
                            ))}
                            <th style={{ padding: '1rem' }}>{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                {columns.map(col => (
                                    <td key={col.key} style={{ padding: '1rem', fontSize: '0.9rem' }}>
                                        {typeof item[col.key] === 'string' && item[col.key].length > 50
                                            ? item[col.key].substring(0, 50) + '...'
                                            : item[col.key]}
                                    </td>
                                ))}
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleOpenModal(item)} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
                                        {t('edit')}
                                    </button>
                                    <button onClick={() => { if (confirm(t('confirmDelete'))) onDelete(item.id) }} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
                                        {t('delete')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    zIndex: 2000, overflowY: 'auto', padding: '2rem 1rem'
                }}>
                    <div style={{
                        background: '#18181b', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius)',
                        width: '100%', maxWidth: '550px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                        margin: 'auto'
                    }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{editingItem ? t('edit') : t('add')}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {fields.map(field => (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <label style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{t(field.name)}</label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={formData[field.name] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                            required={field.required}
                                            rows={4}
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.5rem', borderRadius: '4px' }}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            value={formData[field.name] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                            required={field.required}
                                            style={{ background: '#18181b', border: '1px solid var(--glass-border)', color: 'white', padding: '0.5rem', borderRadius: '4px' }}
                                        >
                                            <option value="">Select...</option>
                                            {field.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'image' ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, [`${field.name}_mode`]: 'url' })}
                                                    style={{
                                                        flex: 1, padding: '0.4rem', fontSize: '0.75rem', borderRadius: '4px',
                                                        background: (formData[`${field.name}_mode`] || 'url') === 'url' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                        border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer'
                                                    }}
                                                >
                                                    Link
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, [`${field.name}_mode`]: 'upload' })}
                                                    style={{
                                                        flex: 1, padding: '0.4rem', fontSize: '0.75rem', borderRadius: '4px',
                                                        background: formData[`${field.name}_mode`] === 'upload' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                        border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer'
                                                    }}
                                                >
                                                    Upload
                                                </button>
                                            </div>

                                            {formData[`${field.name}_mode`] === 'upload' ? (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const uploadData = new FormData();
                                                            uploadData.append('file', file);
                                                            const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadData });
                                                            const result = await res.json();
                                                            if (result.url) {
                                                                setFormData({ ...formData, [field.name]: result.url });
                                                            }
                                                        }
                                                    }}
                                                    style={{ color: '#a1a1aa', fontSize: '0.8rem' }}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    placeholder="https://..."
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                                    required={field.required}
                                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.5rem', borderRadius: '4px' }}
                                                />
                                            )}

                                            {formData[field.name] && (
                                                <div style={{ marginTop: '0.5rem', position: 'relative', width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                    <img src={formData[field.name]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                            required={field.required}
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.5rem', borderRadius: '4px' }}
                                        />
                                    )}
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>{t('save')}</button>
                                <button type="button" onClick={handleCloseModal} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: 'var(--radius)', cursor: 'pointer' }}>{t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
