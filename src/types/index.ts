export type FieldType = 'number' | 'date';
export type Operator = '>' | '<' | '==' | '!=' | '>=' | '<=';

export interface Rule {
  field: string;
  operator: Operator;
  value: number | string;
}

export interface RuleGroup {
  condition: 'AND' | 'OR';
  rules: (Rule | RuleGroup)[];
}

// src/types/index.ts
export interface Campaign {
  id: string;
  name: string;
  rules: RuleGroup;
  messageTemplate: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  audienceSize: number;
  sentCount?: number;
  failedCount?: number;
  createdAt: string;
  updatedAt: string;
}
export interface Segment {
  id: string;
  name: string;
  rules: RuleGroup;
  customerCount: number;
}