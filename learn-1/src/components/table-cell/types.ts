
export interface Props {
  component?: 'th' | 'td';
  children?: any;

  align?: 'center' | 'left' | 'right';
  padding?: 'none' | 'default' | 'dense';

  width?: number | string;

  colSpan?: number;
  rowspan?: number;
}