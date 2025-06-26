const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    // 📥 Extract query parameters
    const {
      country = 'us',
      category = 'general',
      page = 1,
      pageSize = 8,
    } = req.query;

    // 📡 Request to NewsAPI
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country,
        category,
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    // ✅ Send back the articles
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// 🌍 Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
