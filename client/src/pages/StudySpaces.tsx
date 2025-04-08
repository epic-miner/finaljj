import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  ArrowDownUp, 
  BookOpenCheck, 
  AlertCircle,
  SearchIcon
} from 'lucide-react';
import PageTransition, { childVariants } from '@/components/PageTransition';
import SearchForm from '@/components/SearchForm';
import FilterTags from '@/components/FilterTags';
import StudySpaceCard from '@/components/StudySpaceCard';
import Pagination from '@/components/Pagination';
import { StudySpaceWithAmenities } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Animation variants for staggered cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animation variant for elements that slide in from the side
const slideInVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function StudySpaces() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('availability');
  const spacesPerPage = 9;

  // Query to fetch study spaces with search and filter
  const { data: studySpaces, isLoading, error } = useQuery<StudySpaceWithAmenities[]>({
    queryKey: ['/api/study-spaces', searchQuery, activeFilters],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('query', searchQuery);
      if (activeFilters.length > 0) queryParams.append('filters', activeFilters.join(','));
      
      const response = await fetch(`/api/study-spaces?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch study spaces');
      }
      return response.json();
    }
  });

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle search submission
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Sort the study spaces
  const sortedSpaces = studySpaces ? [...studySpaces].sort((a, b) => {
    if (sortBy === 'availability') {
      return b.availableSeats - a.availableSeats;
    } else if (sortBy === 'rating') {
      return (b.averageRating || 0) - (a.averageRating || 0);
    } else {
      // Default sorting (by name)
      return a.name.localeCompare(b.name);
    }
  }) : [];

  // Pagination logic
  const totalPages = Math.ceil((sortedSpaces?.length || 0) / spacesPerPage);
  const currentSpaces = sortedSpaces.slice(
    (currentPage - 1) * spacesPerPage,
    currentPage * spacesPerPage
  );

  return (
    <PageTransition>
      {/* Search Section */}
      <motion.section 
        className="py-16 bg-background/60 backdrop-blur-lg"
        variants={childVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find Your Perfect <span className="text-primary">Study Space</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchForm initialQuery={searchQuery} onSearch={handleSearch} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FilterTags activeFilters={activeFilters} onFilterChange={handleFilterChange} />
          </motion.div>
        </div>
      </motion.section>

      {/* Study Spaces List */}
      <motion.section 
        className="py-16 bg-background/40"
        variants={childVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            variants={slideInVariant}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                {isLoading ? (
                  <span className="flex items-center">
                    <SearchIcon className="animate-spin h-5 w-5 mr-2 text-primary" />
                    Loading study spaces...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <BookOpenCheck className="h-6 w-6 mr-2 text-primary" />
                    <span>{sortedSpaces.length} Study Spaces Found</span>
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <motion.span 
                className="text-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Sort by:
              </motion.span>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px] bg-background/60 border-primary/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="availability">
                      <span className="flex items-center">
                        <ArrowDownUp className="h-4 w-4 mr-2 text-primary" />
                        Availability
                      </span>
                    </SelectItem>
                    <SelectItem value="rating">
                      <span className="flex items-center">
                        <ArrowDownUp className="h-4 w-4 mr-2 text-primary" />
                        Rating
                      </span>
                    </SelectItem>
                    <SelectItem value="name">
                      <span className="flex items-center">
                        <ArrowDownUp className="h-4 w-4 mr-2 text-primary" />
                        Name
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </motion.div>

          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="bg-background/60 backdrop-blur-md rounded-xl p-4 h-80 animate-pulse"
                  variants={childVariants}
                >
                  <div className="h-48 w-full bg-primary/10 rounded-lg"></div>
                  <div className="h-4 bg-primary/20 rounded mt-4 w-3/4"></div>
                  <div className="h-4 bg-primary/10 rounded mt-2 w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 text-lg">Failed to load study spaces. Please try again later.</p>
            </motion.div>
          ) : sortedSpaces.length === 0 ? (
            <motion.div 
              className="text-center py-10 bg-background/60 backdrop-blur-md rounded-xl border border-primary/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SearchIcon className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <p className="text-lg text-white/80">No study spaces found matching your criteria.</p>
              <p className="mt-2 text-white/60">Try adjusting your search or filters.</p>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {currentSpaces.map((space) => (
                  <motion.div 
                    key={space.id} 
                    variants={childVariants}
                  >
                    <StudySpaceCard studySpace={space} />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <motion.div 
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>
    </PageTransition>
  );
}
