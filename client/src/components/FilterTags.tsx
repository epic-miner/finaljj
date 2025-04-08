import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Amenity } from "@shared/schema";

interface FilterTagsProps {
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
}

export default function FilterTags({ activeFilters, onFilterChange }: FilterTagsProps) {
  // Fetch available amenities
  const { data: amenities, isLoading } = useQuery<Amenity[]>({
    queryKey: ['/api/amenities'],
  });

  if (isLoading || !amenities) {
    return (
      <div className="flex flex-wrap gap-2 mb-8 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-24 bg-slate-200 rounded-full"></div>
        ))}
      </div>
    );
  }

  // Filter icons and text map
  const filterIcons: Record<string, string> = {
    "Wi-Fi": "wifi",
    "Power Outlets": "plug",
    "Café": "coffee",
    "Quiet Zone": "volume-mute",
    "Group-friendly": "users",
    "More Filters": "sliders-h"
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {amenities.map((amenity) => (
        <Button
          key={amenity.id}
          variant="outline"
          className={`inline-flex items-center px-3 py-1.5 border rounded-full text-sm font-medium ${
            activeFilters.includes(amenity.name)
              ? "bg-[#3949ab] text-white border-[#3949ab] hover:bg-[#2e399c]"
              : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
          }`}
          onClick={() => onFilterChange(amenity.name)}
        >
          <i className={`fas fa-${amenity.icon} ${activeFilters.includes(amenity.name) ? "text-white" : "text-[#3949ab]"} mr-2`}></i> {amenity.name}
        </Button>
      ))}
      
      <Button
        variant="outline"
        className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-full text-sm font-medium text-[#3949ab] hover:bg-[#3949ab] hover:text-white hover:border-[#3949ab]"
        onClick={() => {
          // This would open a more comprehensive filter modal in a full application
          alert("Additional filters would appear in a modal here!");
        }}
      >
        <i className="fas fa-sliders-h mr-2"></i> More Filters
      </Button>
    </div>
  );
}
