import React from 'react';

export enum NavigationItem {
  HOME = 'HOME',
  WALLET = 'WALLET',
  DASHBOARD = 'DASHBOARD',
  ART_GALLERY = 'ART_GALLERY',
  MUSIC_LABEL = 'MUSIC_LABEL',
  TRADE_DEX = 'TRADE_DEX',
  AMM_LP_POOL = 'AMM_LP_POOL',
  REWARDS = 'REWARDS',
  ALPHA_AI = 'ALPHA_AI',
  ABOUT = 'ABOUT',
  SOCIALS = 'SOCIALS'
}

export interface MetricCardProps {
  label: string;
  value: string;
  subValue: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  chartData?: number[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface NFTCollection {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  plays: string;
  price: string;
  coverUrl?: string;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackIds: string[];
  coverGradient: string;
}