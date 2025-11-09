interface BidMenuProps {
  onCategoryChange: (category: string) => void;
}

export default function BidMenu({ onCategoryChange }: BidMenuProps) {
    const categories = ['ongoing', 'previous']
  
    return (
      <div className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">Filter by Category</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className="w-full text-left text-gray-700 hover:text-blue-500 hover:underline"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Bids 
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  