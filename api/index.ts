// Shared in-memory storage for all API endpoints - Updated
let messages: any[] = [];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  try {
    // Handle /api/messages
    if (url?.includes('/messages')) {
      if (method === 'GET') {
        return res.status(200).json(messages);
      }
      
      if (method === 'DELETE') {
        messages = [];
        return res.status(200).json({ success: true });
      }
      
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Handle /api/chat
    if (url?.includes('/chat')) {
      if (method === 'POST') {
        // Safe body parsing
        const raw = req.body ?? {};
        const body = typeof raw === 'string' ? JSON.parse(raw || '{}') : raw;
        const { content } = body || {};
        
        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }
        
        // Add user message
        const userMessage = {
          id: generateId(),
          content,
          role: 'user',
          timestamp: new Date()
        };
        messages.push(userMessage);
        
// Call OpenAI API
let aiContent;
try {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content }
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  aiContent = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
} catch (error) {
  console.error('OpenAI API Error:', error);
  aiContent = 'Sorry, I encountered an error while processing your request.';
}
        const aiMessage = {
          id: generateId(),
          content: aiContent,
          role: 'assistant', 
          timestamp: new Date()
        };
        messages.push(aiMessage);
        
        return res.status(200).json({ userMessage, aiMessage });
      }
      
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
