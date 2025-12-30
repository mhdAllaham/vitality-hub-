'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function BMICalculator() {
    const { language, t } = useLanguage();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiClass, setBmiClass] = useState('');

    const calculateBMI = () => {
        if (!weight || !height) return;
        const heightInMeters = height / 100;
        const val = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmi(val);

        let classification = '';
        if (val < 18.5) classification = language === 'ar' ? 'نقص وزن' : 'Underweight';
        else if (val < 25) classification = language === 'ar' ? 'وزن طبيعي' : 'Normal weight';
        else if (val < 30) classification = language === 'ar' ? 'وزن زائد' : 'Overweight';
        else classification = language === 'ar' ? 'سمنة' : 'Obese';
        setBmiClass(classification);
    };

    return (
        <div className="card glass" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{language === 'ar' ? 'حاسبة مؤشر كتلة الجسم' : 'BMI Calculator'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="number"
                    placeholder={language === 'ar' ? 'الوزن (كجم)' : 'Weight (kg)'}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="glass"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.8rem', borderRadius: 'var(--radius)' }}
                />
                <input
                    type="number"
                    placeholder={language === 'ar' ? 'الطول (سم)' : 'Height (cm)'}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="glass"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.8rem', borderRadius: 'var(--radius)' }}
                />
                <button onClick={calculateBMI} className="btn-primary" style={{ width: '100%' }}>
                    {language === 'ar' ? 'احسب' : 'Calculate'}
                </button>
            </div>

            {bmi && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: 'var(--radius)' }}>
                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>{language === 'ar' ? 'مؤشر كتلة جسمك:' : 'Your BMI:'}</p>
                    <h2 style={{ color: 'var(--primary)', margin: '0.3rem 0' }}>{bmi}</h2>
                    <p style={{ fontWeight: '600' }}>{bmiClass}</p>
                </div>
            )}
        </div>
    );
}
