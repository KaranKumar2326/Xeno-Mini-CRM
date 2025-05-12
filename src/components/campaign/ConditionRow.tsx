// src/components/campaign/ConditionRow.tsx
import { FieldType, Operator, Rule } from '../../types';

interface ConditionRowProps {
  rule: Rule;
  onChange: (updatedRule: Rule) => void;
  onRemove?: () => void;
}

const FIELD_OPTIONS = [
  { value: 'totalSpend', label: 'Total Spend', type: 'number' },
  { value: 'visitCount', label: 'Visit Count', type: 'number' },
  { value: 'lastPurchase', label: 'Last Purchase', type: 'date' },
  { value: 'lastVisit', label: 'Last Visit', type: 'date' },
];

const OPERATOR_OPTIONS = [
  { value: '>', label: 'Greater Than' },
  { value: '<', label: 'Less Than' },
  { value: '==', label: 'Equals' },
  { value: '!=', label: 'Not Equals' },
  { value: '>=', label: 'Greater Than or Equal' },
  { value: '<=', label: 'Less Than or Equal' },
];

export default function ConditionRow({ rule, onChange, onRemove }: ConditionRowProps) {
  const selectedField = FIELD_OPTIONS.find(f => f.value === rule.field);
  
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, field: e.target.value });
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, operator: e.target.value as Operator });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...rule, value: selectedField?.type === 'number' ? Number(e.target.value) : e.target.value });
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <select
        value={rule.field}
        onChange={handleFieldChange}
        className="border p-2 rounded flex-1"
      >
        {FIELD_OPTIONS.map(field => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>

      <select
        value={rule.operator}
        onChange={handleOperatorChange}
        className="border p-2 rounded w-32"
      >
        {OPERATOR_OPTIONS.map(op => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <input
        type={selectedField?.type === 'date' ? 'date' : 'number'}
        value={rule.value}
        onChange={handleValueChange}
        className="border p-2 rounded flex-1"
      />

      {onRemove && (
        <button 
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      )}
    </div>
  );
}