import { motion } from 'motion/react';

interface TimeRangeFilterProps {
  selected: string;
  onSelect: (range: string) => void;
}

const timeRanges = ['1W', '4W', '1M', '3M', '6M', '1Y'];

export function TimeRangeFilter({ selected, onSelect }: TimeRangeFilterProps) {
  return (
    <div className="flex gap-1 p-1 bg-gray-200 rounded border-2 border-gray-300 mb-3">
      {timeRanges.map((range) => (
        <motion.button
          key={range}
          onClick={() => onSelect(range)}
          whileTap={{ scale: 0.96 }}
          className={`flex-1 px-2 py-1.5 rounded text-xs transition-all ${
            selected === range
              ? 'button-win shadow-inner bg-gray-300 border-2 border-gray-400'
              : 'button-win hover:bg-gray-100'
          }`}
          style={{ fontWeight: selected === range ? 900 : 700 }}
        >
          {range}
        </motion.button>
      ))}
    </div>
  );
}
