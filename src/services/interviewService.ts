import { api } from '@/services/api';

export interface Room {
  name: string;
  empty_timeout: number;
  metadata: Record<string, any>;
}

export interface Participant {
  identity: string;
  name: string;
  metadata: Record<string, any>;
}

export interface Token {
  token: string;
}

export const interviewService = {
  async createRoom(interviewId: number): Promise<Room> {
    const { data } = await api.post(`/interviews/${interviewId}/room`);
    return data;
  },

  async getToken(interviewId: number): Promise<Token> {
    const { data } = await api.get(`/interviews/${interviewId}/token`);
    return data;
  },

  async getParticipants(interviewId: number): Promise<Participant[]> {
    const { data } = await api.get(`/interviews/${interviewId}/participants`);
    return data;
  }
}; 