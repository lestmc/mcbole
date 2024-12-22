import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateResource() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'mod',
    version: '',
    mcVersion: '',
    downloadUrl: '',
    author: '',
    thumbnailUrl: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/resources', formData);
      navigate('/');
    } catch (err) {
      setError('发布失败，请重试');
    }
  };

  return (
    <div className="container">
      <h1>发布资源</h1>
      {error && <div className="error">{error}</div>}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">资源名称</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">资源类型</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="mod">模组</option>
              <option value="resourcepack">资源包</option>
              <option value="map">地图</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mcVersion">Minecraft版本</label>
            <input
              type="text"
              id="mcVersion"
              name="mcVersion"
              value={formData.mcVersion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="version">资源版本</label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="downloadUrl">下载链接</label>
            <input
              type="url"
              id="downloadUrl"
              name="downloadUrl"
              value={formData.downloadUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thumbnailUrl">预览图链接</label>
            <input
              type="url"
              id="thumbnailUrl"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            发布
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateResource; 