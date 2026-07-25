import { useState } from 'react';
import api from '../services/api';

const LandingPage = () => {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.budget || !form.message) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/leads', form);
      setSuccess('Lead submitted successfully.');
      setForm({ name: '', email: '', budget: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">LeadDesk</h1>
          <a href="/login" className="rounded bg-white px-4 py-2 text-sm font-medium text-slate-900">Admin Login</a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2">
        <section>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Digital Heroes Training Task</p>
          <h2 className="mb-5 text-4xl font-bold leading-tight">Capture new leads faster with a simple, modern intake form.</h2>
          <p className="mb-8 text-lg text-slate-600">Submit your project details and manage every lead from a secure admin dashboard.</p>
          <div className="flex gap-4">
            <a href="#lead-form" className="rounded bg-blue-600 px-5 py-3 font-medium text-white">Fill the form</a>
            <a href="/admin" className="rounded border border-slate-300 px-5 py-3 font-medium text-slate-700">Go to admin</a>
          </div>
        </section>

        <section id="lead-form" className="rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="mb-6 text-2xl font-semibold">Submit a lead</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full rounded border border-slate-300 px-3 py-2" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input className="w-full rounded border border-slate-300 px-3 py-2" name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" />
            <input className="w-full rounded border border-slate-300 px-3 py-2" name="budget" value={form.budget} onChange={handleChange} placeholder="Budget Range" />
            <textarea className="w-full rounded border border-slate-300 px-3 py-2" name="message" value={form.message} onChange={handleChange} placeholder="Message" rows="4" />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {success ? <p className="text-sm text-green-600">{success}</p> : null}
            <button disabled={loading} className="w-full rounded bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Lead'}
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-600">
          Built for <a href="https://digitalheroesco.com" target="_blank" rel="noreferrer" className="font-semibold text-blue-600">Digital Heroes Training Task</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
