import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateExample() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/examples', { title, description });
      navigate('/');
    } catch (err) {
      setError('创建失败，请重试');
    }
  };

  return (
    <div className="container">
      <h1>创建新示例</h1>
      {error && <div className="error">{error}</div>}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">标题</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            创建
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateExample; 