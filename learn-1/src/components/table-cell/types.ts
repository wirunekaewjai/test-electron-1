
export interface Props {
  component?: 'th' | 'td';
  children?: any;

  align?: 'left' | 'right';
  padding?: 'none' | 'default' | 'dense';

  width?: number | string;
}