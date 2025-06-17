import { Type } from '@angular/core';

export interface Widgets {
  id: number;
  label?: string;
  content: Type<unknown>;
  rows?: number;
  columns?: number;
  backgroundColor?: string;
  color?: string;
}

// unkown: Türü bilinmeyen değerler için kullanılır, ancak kullanmadan önce tür kontrolü yapmayı zorunlu kılar.
