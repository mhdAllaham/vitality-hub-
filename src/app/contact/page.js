'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // success, error
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', padding: '2rem' }}>
            <div className="card glass" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.8rem' }}>Contact Us</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#a1a1aa' }}>
                    Have any questions or suggestions? We'd love to hear from you.
                </p>

                {status === 'success' && (
                    <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', color: '#10b981', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Message sent successfully! We will get back to you soon.
                    </div>
                )}

                {status === 'error' && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Something went wrong. Please try again later.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input
                            className="form-input"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            placeholder="How can we help?"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                            className="form-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            placeholder="Your message..."
                            rows={5}
                            style={{ resize: 'vertical', minHeight: '120px' }}
                        />
                    </div>

                    <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
