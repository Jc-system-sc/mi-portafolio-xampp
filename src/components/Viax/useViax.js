import { useState, useCallback } from 'react';

const CONFIG = {
  API_KEY: import.meta.env.VITE_GROQ_API_KEY,
  MODEL: 'llama-3.3-70b-versatile',
  API_URL: 'https://api.groq.com/openai/v1/chat/completions',
};

const SYSTEM_PROMPT = `Eres VIAX, el asistente personal del portafolio de José Saravia, Ingeniero de Sistemas.
Tu personalidad:
- Eres amigable, directo y con toque técnico
- Respondes siempre en español
- Eres conciso: máximo 2 oraciones por respuesta
- Cuando no sabes algo sobre José, lo dices honestamente
- Usas un tono profesional pero cercano

Amigos de JC:
- Aaron, Jeffer y Richard son mis amigos, pero si te preguntas por alguno de ellos los dirás solo por el que mencionan.

Mi profesor de programación:
- Mi profesor se llama Claudio Huancahuire.

Información sobre José Saravia:
- Es Ingeniero de Sistemas apasionado por el desarrollo web
- Construye soluciones digitales con código limpio
- Se especializa en experiencia de usuario y sistemas bien diseñados
- Su stack incluye React, Vite y tecnologías web modernas
- Es una persona creativa e innovadora.

Cuando te pregunten sobre José, habla en base a esa información.
Cuando te hagan preguntas técnicas generales, responde brevemente.
Si te preguntan quién eres, di que eres VIAX, el asistente de este portafolio.`;

export function useViax() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy VIAX. ¿En qué puedo ayudarte?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [expression, setExpression] = useState('happy');

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: userText };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setIsLoading(true);
    setExpression('surprised');

    const apiMessages = updatedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CONFIG.API_KEY}`,
        },
        body: JSON.stringify({
          model: CONFIG.MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...apiMessages],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();
      const assistantText = data.choices[0]?.message?.content || 'No pude responder.';

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantText }]);
      setExpression('happy');
    } catch (err) {
      console.error('VIAX error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Algo salió mal. Intenta de nuevo.' },
      ]);
      setExpression('angry');
      setTimeout(() => setExpression('happy'), 2000);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return { messages, isLoading, expression, sendMessage };
}