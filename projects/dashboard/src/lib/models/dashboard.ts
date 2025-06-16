import { Type } from '@angular/core';

export interface Widgets {
  id: number;
  label?: string;
  // Türü bilinmeyen değerler için kullanılır, ancak kullanmadan önce tür kontrolü yapmayı zorunlu kılar.
  content: Type<unknown>;
  rows?: number;
  columns?: number;
  backgroundColor?: string;
  color?: string;
}
