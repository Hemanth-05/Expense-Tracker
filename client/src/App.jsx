import { useEffect, useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          amount: Number(form.amount),
          categoryId: Number(form.categoryId),
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to add expense');
      }

      setSubmitMessage(`Expense "${payload.name}" added successfully`);
      setForm({
        name: '',
        amount: '',
        categoryId: '',
      });
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.error || 'Failed to load categories');
        }
        setCategories(payload);
      } catch (error) {
        setCategoryError(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <main className="app-shell">
      <h1>Expense-Tracker</h1>
      {categoryError && <p className="error-text">{categoryError}</p>}
      {submitError && <p className="error-text">{submitError}</p>}
      {submitMessage && <p className="success-text">{submitMessage}</p>}
      <form className="expense-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="name"
        />

        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="text"
          value={form.amount}
          onChange={handleChange}
          placeholder="amount"
        />

        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          disabled={loadingCategories}
        >
          <option value="" disabled>
            {loadingCategories ? 'Loading categories...' : 'Select a category'}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Expense</button>
      </form>
    </main>
  );
}
