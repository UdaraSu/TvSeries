import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    type: 'Movie',
    watchedDate: '',
    genre: '',
    rating: '',
    review: '',
    downloadlink: '',
  });

  const [image, setImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    api.get(`/${id}`).then(res => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowConfirm(true); // show confirmation modal
  };

  const submitUpdate = async () => {
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (image) data.append('image', image);
    await api.put(`/${id}`, data);
    navigate('/');
  };

  const styles = {
    wrapper: {
      maxWidth: '880px',
      margin: '40px auto',
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      background: '#ffe0ec',
      padding: '24px',
      borderRadius: '20px 20px 0 0',
      textAlign: 'center',
      fontSize: '2rem',
      color: '#9a5c7a',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(255, 197, 217, 0.2)',
      border: '1px solid #ffe7f0',
      borderBottom: 'none',
      fontFamily: "'Pacifico', cursive",
    },
    container: {
      padding: '40px',
      background: '#fffaf6',
      borderRadius: '0 0 20px 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      boxShadow: '0 8px 24px rgba(255, 197, 217, 0.3)',
      border: '1px solid #ffe7f0',
      borderTop: 'none',
    },
    section: {
      background: '#fef3f7',
      padding: '16px',
      borderRadius: '16px',
      boxShadow: 'inset 0 0 4px #fcd6e3',
    },
    label: {
      fontWeight: '600',
      fontSize: '0.95rem',
      color: '#9a5c7a',
      marginBottom: '6px',
      display: 'block',
    },
    input: {
      width: '80%',
      padding: '10px 14px',
      borderRadius: '12px',
      border: '1px solid #e7c1cb',
      backgroundColor: '#fff',
      fontSize: '1rem',
      marginBottom: '12px',
    },
    textarea: {
      width: '82%',
      padding: '12px',
      borderRadius: '12px',
      border: '1px solid #e7c1cb',
      fontSize: '1rem',
      minHeight: '100px',
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#f9b4d0',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '16px',
      cursor: 'pointer',
      marginTop: '20px',
      width: '100%',
      gridColumn: 'span 3',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: '#fff0f5',
      padding: '32px',
      borderRadius: '20px',
      textAlign: 'center',
      maxWidth: '400px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      fontFamily: "'Segoe UI', sans-serif",
    },
    modalButton: {
      backgroundColor: '#f9a8d4',
      border: 'none',
      padding: '10px 16px',
      fontSize: '1rem',
      borderRadius: '12px',
      margin: '10px',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.heading}>🛠️ Edit Watch Entry</div>
      <form style={styles.container} onSubmit={handleSubmit}>
        <div style={styles.section}>
          <label style={styles.label}>Title</label>
          <input
            style={styles.input}
            name="title"
            value={form.title || ''}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Type</label>
          <select
            style={{
              width: '92%',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid #e7c1cb',
              backgroundColor: '#fff',
              fontSize: '1rem',
              marginBottom: '12px',
            }}
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option>Movie</option>
            <option>TV Show</option>
          </select>

          <label style={styles.label}>Watched Date</label>
          <input
            type="date"
            style={styles.input}
            name="watchedDate"
            value={form.watchedDate?.slice(0, 10) || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Genre</label>
          <input
            style={styles.input}
            name="genre"
            value={form.genre || ''}
            onChange={handleChange}
          />

          <label style={styles.label}>Rating (0–10)</label>
          <input
            type="number"
            min="0"
            max="10"
            style={styles.input}
            name="rating"
            value={form.rating || ''}
            onChange={handleChange}
          />

          <label style={styles.label}>Download Link</label>
          <input
            style={styles.input}
            name="downloadlink"
            value={form.downloadlink || ''}
            onChange={handleChange}
          />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            style={styles.input}
            onChange={e => setImage(e.target.files[0])}
          />

          <label style={styles.label}>Review</label>
          <textarea
            style={styles.textarea}
            name="review"
            value={form.review || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={styles.button}>💾 Save Changes</button>
      </form>

      {showConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ color: '#9a5c7a', marginBottom: '16px' }}>
              ✨ Are you sure you want to save these changes?
            </h3>
            <button
              style={styles.modalButton}
              onClick={() => {
                setShowConfirm(false);
                submitUpdate();
              }}
            >
              Yes, Save
            </button>
            <button
              style={{ ...styles.modalButton, backgroundColor: '#e2a4b3' }}
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditItem;
