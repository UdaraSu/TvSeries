import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    const res = await api.get('/');
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const requestDelete = id => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await api.delete(`/${deleteId}`);
    setShowConfirm(false);
    setDeleteId(null);
    fetchData();
  };

  const styles = {
    container: {
      maxWidth: '880px',
      margin: '40px auto',
      padding: '40px',
      background: '#fffaf6',
      borderRadius: '20px',
      fontFamily: "'Segoe UI', sans-serif",
      boxShadow: '0 8px 24px rgba(255, 197, 217, 0.3)',
      border: '1px solid #ffe7f0',
    },
    heading: {
      textAlign: 'center',
      color: '#d66ba0',
      fontSize: '2.2rem',
      marginBottom: '24px',
      fontWeight: '700',
      fontFamily: "'Pacifico', cursive",
    },
    addButton: {
      backgroundColor: '#f9b4d0',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '16px',
      cursor: 'pointer',
      marginBottom: '24px',
      display: 'block',
    },
    card: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '20px',
      borderRadius: '20px',
      background: '#fef3f7',
      marginBottom: '20px',
      gap: '20px',
      boxShadow: 'inset 0 0 4px #fcd6e3',
      border: '1px solid #ffe7f0',
    },
    image: {
      width: '120px',
      height: 'auto',
      borderRadius: '16px',
      objectFit: 'cover',
    },
    title: {
      color: '#c75489',
      margin: '0 0 8px 0',
      fontSize: '1.25rem',
    },
    paragraph: {
      margin: '4px 0',
      fontSize: '0.95rem',
      color: '#5c3c4c',
    },
    downloadLink: {
      color: '#b94b85',
      textDecoration: 'underline',
      fontSize: '0.95rem',
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '12px',
    },
    smallButton: {
      backgroundColor: '#f9b4d0',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      fontSize: '0.9rem',
      borderRadius: '12px',
      cursor: 'pointer',
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
    <div style={styles.container}>
      <h2 style={styles.heading}>🌸 My Cute Watchlist</h2>
      <Link to="/add">
        <button style={styles.addButton}>+ Add New</button>
      </Link>

      {items.map(item => (
        <div key={item._id} style={styles.card}>
          {item.image && (
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt="thumbnail"
              style={styles.image}
            />
          )}
          <div>
            <h3 style={styles.title}>
              {item.title} ({item.type})
            </h3>
            <p style={styles.paragraph}>🎬 Genre: {item.genre} | ⭐ Rating: {item.rating}</p>
            <p style={styles.paragraph}>📝 {item.review}</p>
            {item.downloadlink && (
              <a
                href={item.downloadlink}
                target="_blank"
                rel="noreferrer"
                style={styles.downloadLink}
              >
                ⬇ Download Link
              </a>
            )}
            <div style={styles.actionButtons}>
              <Link to={`/edit/${item._id}`}>
                <button style={styles.smallButton}>✏️ Edit</button>
              </Link>
              <button onClick={() => requestDelete(item._id)} style={styles.smallButton}>
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {showConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ color: '#9a5c7a', marginBottom: '16px' }}>
              ❗ Are you sure you want to delete this entry?
            </h3>
            <button
              style={styles.modalButton}
              onClick={confirmDelete}
            >
              Yes, Delete
            </button>
            <button
              style={{ ...styles.modalButton, backgroundColor: '#e2a4b3' }}
              onClick={() => {
                setShowConfirm(false);
                setDeleteId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
