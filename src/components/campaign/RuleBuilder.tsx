// src/components/campaign/RuleBuilder.tsx
import { useState } from 'react';
import ConditionRow from './ConditionRow';
import { Rule, RuleGroup } from '../../types';

interface RuleBuilderProps {
  rules: RuleGroup;
  onChange: (rules: RuleGroup) => void;
}

export default function RuleBuilder({ rules, onChange }: RuleBuilderProps) {
  const addRule = () => {
    onChange({
      ...rules,
      rules: [
        ...rules.rules,
        { field: 'totalSpend', operator: '>', value: 0 }
      ]
    });
  };

  const updateRule = (index: number, rule: Rule) => {
    const newRules = [...rules.rules];
    newRules[index] = rule;
    onChange({ ...rules, rules: newRules });
  };

  const removeRule = (index: number) => {
    const newRules = [...rules.rules];
    newRules.splice(index, 1);
    onChange({ ...rules, rules: newRules });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <select
          value={rules.condition}
          onChange={(e) => onChange({ ...rules, condition: e.target.value as 'AND' | 'OR' })}
          className="border p-2 rounded"
        >
          <option value="AND">ALL of the following</option>
          <option value="OR">ANY of the following</option>
        </select>
        <button 
          onClick={addRule}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Condition
        </button>
      </div>

      <div className="space-y-2 pl-6">
        {rules.rules.map((rule, index) => (
          <ConditionRow
            key={index}
            rule={rule as Rule}
            onChange={(updatedRule) => updateRule(index, updatedRule)}
            onRemove={() => removeRule(index)}
          />
        ))}
      </div>
    </div>
  );
}