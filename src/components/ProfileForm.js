'use client';

import { useState } from 'react';

export default function ProfileForm({ initialData }) {
    const [weight, setWeight] = useState(initialData.weight || '');
    const [height, setHeight] = useState(initialData.height || '');
    const [age, setAge] = useState(initialData.age || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const calculateBMI = (w, h) => {
        if (!w || !h) return null;
        const hInMeters = h / 100;
        return (w / (hInMeters * hInMeters)).toFixed(1);
    };

    const currentBMI = calculateBMI(weight, height);

    const getBMIClass = (bmi) => {
        if (!bmi) return '';
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    const bmiClass = getBMIClass(currentBMI);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight: parseFloat(weight), height: parseFloat(height), age: parseInt(age), bmi: parseFloat(currentBMI), bmiClass }),
            });

            if (res.ok) {
                setMessage('Health data updated successfully!');
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            setMessage('Error updating data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input
                        className="form-input"
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g. 75"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Height (cm)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 180"
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="form-label">Age</label>
                <input
                    className="form-input"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 25"
                />
            </div>

            {currentBMI && (
                <div className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid var(--primary)' }}>
                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Your Current BMI</p>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{currentBMI}</h2>
                    <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: bmiClass === 'Normal weight' ? 'var(--primary)' : bmiClass === 'Overweight' ? 'var(--accent)' : '#ef4444'
                    }}>
                        {bmiClass}
                    </span>
                </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Saving...' : 'Save Health Data'}
            </button>

            {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: message.includes('successfully') ? 'var(--primary)' : '#ef4444' }}>{message}</p>}
        </form>
    );
}
