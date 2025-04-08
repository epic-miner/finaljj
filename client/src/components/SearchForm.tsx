import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

interface SearchFormProps {
  onSearch?: (query: string) => void;
  initialQuery?: string;
}

export default function SearchForm({ onSearch, initialQuery = "" }: SearchFormProps) {
  const [location, setLocation] = useState(initialQuery);
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState("");
  const [_, navigate] = useLocation();

  function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(location);
    } else {
      // If no onSearch callback is provided, navigate to study spaces page with query params
      const queryParams = new URLSearchParams();
      if (location) queryParams.append('query', location);
      if (date) queryParams.append('date', date);
      if (time) queryParams.append('time', time);
      
      navigate(`/study-spaces?${queryParams.toString()}`);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-map-marker-alt text-slate-400"></i>
              </div>
              <Input
                type="text"
                name="location"
                id="location"
                className="pl-10 pr-12"
                placeholder="Enter a location or use current"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-calendar-alt text-slate-400"></i>
              </div>
              <Input
                type="date"
                name="date"
                id="date"
                className="pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getCurrentDate()}
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-sm font-medium text-slate-700">Time</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-clock text-slate-400"></i>
              </div>
              <select
                id="time"
                name="time"
                className="focus:ring-[#3949ab] focus:border-[#3949ab] block w-full pl-10 sm:text-sm border-slate-300 rounded-md"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Any time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 10PM)</option>
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <Button type="submit" className="bg-[#3949ab] hover:bg-[#2e399c] w-full md:w-auto flex items-center justify-center">
              <i className="fas fa-search mr-2"></i> Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
