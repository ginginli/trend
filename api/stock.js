// api/stock.js
export default async function handler(request, response) {
  // 1. 从 URL 参数获取股票代码
  const { symbol } = request.query;

  if (!symbol) {
    return response.status(400).json({ error: '缺少股票代码' });
  }

  // 2. 从 Vercel 环境变量中读取 Key (最关键的一步！)
  const apiKey = process.env.ALPHA_VANTAGE_KEY; 

  if (!apiKey) {
    return response.status(500).json({ error: '服务器未配置 API Key' });
  }

  try {
    // 3. 后端代替前端去请求 Alpha Vantage
    const targetUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    
    const res = await fetch(targetUrl);
    const data = await res.json();

    // 4. 把数据原封不动还给前端
    return response.status(200).json(data);
    
  } catch (error) {
    return response.status(500).json({ error: '请求外部接口失败' });
  }
}
