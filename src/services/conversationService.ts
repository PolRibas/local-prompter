// services/conversationService.ts
// import axios from 'axios';

interface Conversation {
  id: number;
  prompt: string;
  response: string;
  timestamp: string;
}

export const fetchConversations = async (): Promise<Conversation[]> => {
  try {
    // Mock de obtención de conversaciones
    // En producción, reemplaza esto con una solicitud real a tu servidor Django
    const mockConversations: Conversation[] = [
      {
        id: 1,
        prompt: '¿Qué es Next.js?',
        response: 'Next.js es un framework de React para aplicaciones web.',
        timestamp: new Date().toISOString(),
      },
      // Añade más conversaciones mock si lo deseas
    ];
    return mockConversations;
  } catch (error) {
    console.error('Error al obtener conversaciones:', error);
    throw error;
  }
};

export const createConversation = async (prompt: string): Promise<Conversation> => {
  try {
    // Mock de creación de conversación
    // En producción, reemplaza esto con una solicitud real a tu servidor Django
    const mockResponse = `Respuesta a: ${prompt}`;

    const newConversation: Conversation = {
      id: Math.floor(Math.random() * 1000),
      prompt,
      response: mockResponse,
      timestamp: new Date().toISOString(),
    };

    return newConversation;
  } catch (error) {
    console.error('Error al crear conversación:', error);
    throw error;
  }
};
