import { ReactNode } from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';

interface WindowFrameProps {
  title: string;
  icon?: string;
  children: ReactNode;
}

export function WindowFrame({ title, icon, children }: WindowFrameProps) {
  return (
    <div className="window-border rounded-lg overflow-hidden shadow-2xl h-full flex flex-col">
      {/* Title Bar */}
      <div className="title-bar px-2 py-1.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 title-bar-text">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="truncate text-xs md:text-sm" style={{ fontWeight: 700 }}>{title}</span>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button className="button-win w-5 h-5 flex items-center justify-center text-black hover:bg-gray-200 active:bg-gray-300">
            <Minimize2 className="w-2.5 h-2.5" />
          </button>
          <button className="button-win w-5 h-5 flex items-center justify-center text-black hover:bg-gray-200 active:bg-gray-300">
            <Maximize2 className="w-2.5 h-2.5" />
          </button>
          <button className="button-win w-5 h-5 flex items-center justify-center text-black hover:bg-red-500 hover:text-white active:bg-red-600">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-3 md:p-4 flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
