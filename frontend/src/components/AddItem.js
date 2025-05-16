import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
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
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (image) data.append('image', image);
    await api.post('/', data);
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
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.heading}>🎀 Add New Watch Entry</div>
      <form style={styles.container} onSubmit={handleSubmit}>
        <div style={styles.section}>
          <label style={styles.label}>Title</label>
          <input style={styles.input} name="title" onChange={handleChange} required />

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
            onChange={handleChange}
          >
            <option>Movie</option>
            <option>TV Show</option>
          </select>

          <label style={styles.label}>Watched Date</label>
          <input type="date" style={styles.input} name="watchedDate" onChange={handleChange} required />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Genre</label>
          <input style={styles.input} name="genre" onChange={handleChange} />

          <label style={styles.label}>Rating (0–10)</label>
          <input type="number" min="0" max="10" style={styles.input} name="rating" onChange={handleChange} />

          <label style={styles.label}>Download Link</label>
          <input style={styles.input} name="downloadlink" onChange={handleChange} />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Upload Image</label>
          <input type="file" accept="image/*" style={styles.input} onChange={e => setImage(e.target.files[0])} />

          <label style={styles.label}>Review</label>
          <textarea style={styles.textarea} name="review" onChange={handleChange} />
        </div>

        <button type="submit" style={styles.button}>🌸 Add Entry</button>
      </form>
    </div>
  );
};

export default AddItem;
