
export type AnimationType = 'corner-tl' | 'corner-br' | 'side-l' | 'side-r' | 'fade-up' | 'zoom-in';
export type LayoutType = 'split' | 'focus' | 'modern';

export interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  animationType: AnimationType;
  layoutType: LayoutType;
  image: string;
  stats?: Array<{ label: string; value: string }>;
  features?: string[];
}
