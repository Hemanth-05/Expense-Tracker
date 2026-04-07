import { useEffect, useState } from 'react';

const months = [
  { value: '', label: 'All' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

function PencilIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 16.75V20h3.25L17.1 10.15l-3.25-3.25L4 16.75z" />
      <path d="M18.35 8.9l1.2-1.2a1.4 1.4 0 0 0 0-1.98l-1.27-1.27a1.4 1.4 0 0 0-1.98 0l-1.2 1.2 3.25 3.25z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 21a2 2 0 0 1-2-2V8h14v11a2 2 0 0 1-2 2H7z" />
      <path d="M9 4h6l1 2h4v2H4V6h4l1-2z" />
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [form, setForm] = useState({
    name: '',
    amount: '',
    expenseDate: '',
    categoryId: '',
  });
  const [filters, setFilters] = useState({
    month: '',
    year: '',
    categoryId: '',
  });
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    amount: '',
    expenseDate: '',
    categoryId: '',
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [expenseError, setExpenseError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [editError, setEditError] = useState('');

  const totalAmount = expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditFormChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const loadExpenses = async (nextFilters = filters) => {
    setExpenseError('');
    setLoadingExpenses(true);

    try {
      const params = new URLSearchParams();

      if (nextFilters.month) {
        params.set('month', nextFilters.month);
      }
      if (nextFilters.year) {
        params.set('year', nextFilters.year);
      }
      if (nextFilters.categoryId) {
        params.set('categoryId', nextFilters.categoryId);
      }

      const queryString = params.toString();
      const response = await fetch(`/api/expenses${queryString ? `?${queryString}` : ''}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load expenses');
      }

      setExpenses(payload);
    } catch (error) {
      setExpenseError(error.message);
    } finally {
      setLoadingExpenses(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    const requestBody = {
      name: form.name,
      amount: Number(form.amount),
      categoryId: Number(form.categoryId),
    };

    if (form.expenseDate) {
      requestBody.expenseDate = form.expenseDate;
    }

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to add expense');
      }

      setSubmitMessage(`Expense "${payload.name}" added successfully`);
      setForm({
        name: '',
        amount: '',
        expenseDate: '',
        categoryId: '',
      });
      await loadExpenses();
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  const handleApplyFilters = async (event) => {
    event.preventDefault();
    await loadExpenses(filters);
  };

  const handleClearFilters = async () => {
    const emptyFilters = {
      month: '',
      year: '',
      categoryId: '',
    };

    setFilters(emptyFilters);
    await loadExpenses(emptyFilters);
  };

  const handleOpenEdit = (expense) => {
    setEditError('');
    setEditingExpense(expense);
    setEditForm({
      id: expense.id,
      name: expense.name,
      amount: String(expense.amount),
      expenseDate: formatDate(expense.expenseDate),
      categoryId: String(expense.category?.id || ''),
    });
  };

  const handleCloseEdit = () => {
    setEditingExpense(null);
    setEditError('');
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setEditError('');

    try {
      const response = await fetch(`/api/expenses/${editForm.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name,
          amount: Number(editForm.amount),
          categoryId: Number(editForm.categoryId),
          expenseDate: editForm.expenseDate,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to update expense');
      }

      setEditingExpense(null);
      await loadExpenses();
    } catch (error) {
      setEditError(error.message);
    }
  };

  const handleDeleteExpense = async (expense) => {
    const shouldDelete = window.confirm(`Delete "${expense.name}"?`);
    if (!shouldDelete) return;

    setExpenseError('');

    try {
      const response = await fetch(`/api/expenses/${expense.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error || 'Failed to delete expense');
      }

      await loadExpenses();
    } catch (error) {
      setExpenseError(error.message);
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
    loadExpenses();
  }, []);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal finance</p>
          <h1>Expense-Tracker</h1>
        </div>
        <nav className="tabs" aria-label="Expense Tracker sections">
          <button
            type="button"
            className={activeTab === 'home' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={activeTab === 'expenses' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
        </nav>
      </header>

      {activeTab === 'home' && (
        <section className="card form-card" aria-labelledby="add-expense-title">
          <div className="section-heading">
            <h2 id="add-expense-title">Add Expense</h2>
            <p>Track a new purchase with a category and optional date.</p>
          </div>

          {categoryError && <p className="error-text">{categoryError}</p>}
          {submitError && <p className="error-text">{submitError}</p>}
          {submitMessage && <p className="success-text">{submitMessage}</p>}

          <form className="expense-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleFormChange}
              disabled={loadingCategories}
              required
            >
              <option value="" disabled>
                {loadingCategories ? 'Loading categories...' : 'Select category'}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="input-row">
              <label className="sr-only" htmlFor="name">Expense name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Expense name"
                required
              />

              <label className="sr-only" htmlFor="amount">Amount</label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={handleFormChange}
                placeholder="Amount"
                required
              />
            </div>

            <label className="sr-only" htmlFor="expenseDate">Expense date</label>
            <input
              id="expenseDate"
              name="expenseDate"
              type="date"
              value={form.expenseDate}
              onChange={handleFormChange}
            />

            <button className="primary-button" type="submit">Add Expense</button>
          </form>
        </section>
      )}

      {activeTab === 'expenses' && (
        <section className="expenses-page" aria-labelledby="expenses-title">
          <form className="card filters-card" onSubmit={handleApplyFilters}>
            <h2>Filters</h2>
            <div className="filters-grid">
              <label>
                <span>Month</span>
                <select name="month" value={filters.month} onChange={handleFilterChange}>
                  {months.map((month) => (
                    <option key={month.label} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Year</span>
                <input
                  name="year"
                  type="number"
                  min="1900"
                  max="9999"
                  value={filters.year}
                  onChange={handleFilterChange}
                  placeholder="Enter year"
                />
              </label>

              <label>
                <span>Category</span>
                <select
                  name="categoryId"
                  value={filters.categoryId}
                  onChange={handleFilterChange}
                  disabled={loadingCategories}
                >
                  <option value="">All</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="filter-actions">
              <button className="secondary-button" type="button" onClick={handleClearFilters}>
                Clear
              </button>
              <button className="primary-button compact" type="submit">
                Apply Filters
              </button>
            </div>
          </form>

          <section className="card expenses-card">
            <div className="expenses-header">
              <h2 id="expenses-title">Expenses</h2>
              <strong>Total: {formatCurrency(totalAmount)}</strong>
            </div>

            {expenseError && <p className="error-text">{expenseError}</p>}
            {loadingExpenses && <p className="muted-text">Loading expenses...</p>}
            {!loadingExpenses && expenses.length === 0 && (
              <p className="muted-text">No expenses found.</p>
            )}

            <div className="expense-list">
              {expenses.map((expense) => (
                <article className="expense-item" key={expense.id}>
                  <div className="expense-details">
                    <h3>{expense.name}</h3>
                    <p>
                      {expense.category?.name || 'Uncategorized'} · {formatDate(expense.expenseDate)}
                    </p>
                  </div>
                  <div className="expense-row-actions">
                    <strong>{formatCurrency(expense.amount)}</strong>
                    <button
                      className="icon-button"
                      type="button"
                      aria-label={`Edit ${expense.name}`}
                      onClick={() => handleOpenEdit(expense)}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      className="icon-button danger"
                      type="button"
                      aria-label={`Delete ${expense.name}`}
                      onClick={() => handleDeleteExpense(expense)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      )}

      {editingExpense && (
        <div className="modal-backdrop" role="presentation">
          <section
            className="edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-expense-title"
          >
            <button
              className="close-button"
              type="button"
              aria-label="Close edit expense modal"
              onClick={handleCloseEdit}
            >
              X
            </button>
            <h2 id="edit-expense-title">Edit Expense</h2>

            {editError && <p className="error-text">{editError}</p>}

            <form className="edit-form" onSubmit={handleEditSubmit}>
              <label>
                <span>Category</span>
                <select
                  name="categoryId"
                  value={editForm.categoryId}
                  onChange={handleEditFormChange}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="input-row">
                <label>
                  <span>Expense Name</span>
                  <input
                    name="name"
                    type="text"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    required
                  />
                </label>

                <label>
                  <span>Amount</span>
                  <input
                    name="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={editForm.amount}
                    onChange={handleEditFormChange}
                    required
                  />
                </label>
              </div>

              <label>
                <span>Date</span>
                <input
                  name="expenseDate"
                  type="date"
                  value={editForm.expenseDate}
                  onChange={handleEditFormChange}
                  required
                />
              </label>

              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={handleCloseEdit}>
                  Cancel
                </button>
                <button className="primary-button compact" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
