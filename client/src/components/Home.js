import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExamples();
  }, []);

  const fetchExamples = async () => {
    try {
      const response = await axios.get('/api/examples');
      setExamples(response.data);
      setLoading(false);
    } catch (err) {
      setError('获取数据失败');
      setLoading(false);
    }
  };

  if (loading) return <div className="container">加载中...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h1>示例列表</h1>
      <div className="examples-grid">
        {examples.map(example => (
          <div key={example.id} className="card">
            <h2>{example.title}</h2>
            <p>{example.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home; 