import { TrendingUp, CheckCircle, Filter } from 'lucide-react'

interface BidMenuProps {
  onCategoryChange: (category: string) => void;
  activeCategory?: string;
}

export default function BidMenu({ onCategoryChange, activeCategory = 'ongoing' }: BidMenuProps) {
    const categories = [
      {
        id: 'ongoing',
        label: 'Active Auctions',
        icon: TrendingUp,
        description: 'Live bidding now',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'previous',
        label: 'Closed Auctions',
        icon: CheckCircle,
        description: 'Completed sales',
        color: 'from-gray-500 to-gray-600'
      }
    ]
  
    return (
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Filter Auctions</h2>
        </div>
        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'glass-hover bg-white/10 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                    : 'glass-hover border border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive 
                      ? `bg-gradient-to-br ${category.color}` 
                      : 'bg-white/5 group-hover:bg-white/10'
                  } transition-all duration-300`}>
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold mb-1 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {category.label}
                    </h3>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {category.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    )
  }
  