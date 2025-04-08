import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudySpaceWithAmenities } from "@shared/schema";
import BookingModal from "./BookingModal";
import { motion } from "framer-motion";
import { Star, StarHalf, MapPin, Users, Clock, BookOpen, Calendar } from "lucide-react";
import { getStudySpaceImage } from "@/lib/studySpaceImages";

interface StudySpaceCardProps {
  studySpace: StudySpaceWithAmenities;
}

export default function StudySpaceCard({ studySpace }: StudySpaceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getAvailabilityStatus = (availableSeats: number, totalSeats: number) => {
    if (availableSeats === 0) return { 
      text: "Fully Booked", 
      color: "bg-red-100 text-red-800 border-red-200", 
      dot: "bg-red-500" 
    };
    if (availableSeats < totalSeats * 0.2) return { 
      text: "Almost Full", 
      color: "bg-amber-100 text-amber-800 border-amber-200", 
      dot: "bg-amber-500" 
    };
    return { 
      text: "Available", 
      color: "bg-green-100 text-green-800 border-green-200", 
      dot: "bg-green-500" 
    };
  };
  
  const availability = getAvailabilityStatus(studySpace.availableSeats, studySpace.totalSeats);
  
  // Limit amenities to display to 3
  const displayedAmenities = studySpace.amenities.slice(0, 3);
  
  // Map icon names to Lucide icons
  const getAmenityIcon = (iconName: string) => {
    switch(iconName) {
      case 'wifi': return '📶';
      case 'plug': return '🔌';
      case 'coffee': return '☕';
      case 'volume-mute': return '🔇';
      case 'users': return '👥';
      case 'tree': return '🌳';
      case 'laptop': return '💻';
      case 'history': return '🏛️';
      default: return '✓';
    }
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
        className="h-full"
      >
        <Card className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <Link href={`/study-spaces/${studySpace.id}`}>
            <div className="h-40 sm:h-48 md:h-52 w-full overflow-hidden relative group flex items-center justify-center">
              <div className="rounded-full overflow-hidden h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img 
                  className="h-full w-full object-cover"
                  src={getStudySpaceImage(studySpace.imageUrl || '')} 
                  alt={studySpace.name}
                />
              </div>
              <div className="absolute top-3 right-3">
                <Badge className={`${availability.color} shadow-sm`}>
                  <span className={`h-2 w-2 rounded-full ${availability.dot} mr-1.5 animate-pulse`}></span>
                  {availability.text}
                </Badge>
              </div>
            </div>
          </Link>
          
          <CardContent className="p-4 sm:p-5 flex-grow flex flex-col">
            <div className="flex justify-between items-start">
              <Link href={`/study-spaces/${studySpace.id}`}>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 hover:text-primary cursor-pointer transition-colors line-clamp-1">
                  {studySpace.name}
                </h3>
              </Link>
              <div className="bg-[#e6d3a3] p-1 rounded-full shadow-sm">
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-800" />
              </div>
            </div>
            
            <p className="mt-1 text-xs sm:text-sm text-slate-600 flex items-start line-clamp-1">
              <MapPin className="h-3 w-3 mr-1 text-slate-400 mt-0.5 flex-shrink-0" /> 
              <span>{studySpace.address}</span>
            </p>
            
            <div className="mt-2 flex items-center">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  star <= Math.round(studySpace.averageRating || 0) 
                    ? <Star key={star} className="h-3 w-3 fill-current" /> 
                    : star - 0.5 <= (studySpace.averageRating || 0) 
                      ? <StarHalf key={star} className="h-3 w-3 fill-current" /> 
                      : <Star key={star} className="h-3 w-3 text-slate-200" />
                ))}
              </div>
              <span className="ml-1 text-xs text-slate-500">({studySpace.totalReviews || 0} reviews)</span>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center text-slate-700">
                <Clock className="w-3 h-3 mr-1 text-slate-400 flex-shrink-0" />
                <span className="truncate">{studySpace.openingHours}</span>
              </div>
              <div className="flex items-center text-slate-700 justify-end">
                <Users className="w-3 h-3 mr-1 text-slate-400 flex-shrink-0" />
                <span className={`font-medium ${
                  studySpace.availableSeats === 0 
                    ? 'text-red-600' 
                    : studySpace.availableSeats < studySpace.totalSeats * 0.2 
                      ? 'text-amber-600' 
                      : 'text-green-600'
                }`}>{studySpace.availableSeats}</span>
                <span className="text-slate-600">/{studySpace.totalSeats} seats</span>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1.5">
              {displayedAmenities.map((amenity) => (
                <Badge 
                  key={amenity.id} 
                  variant="outline" 
                  className="bg-white text-slate-700 hover:bg-slate-50 border-slate-200 text-xs py-0.5"
                >
                  <span className="mr-1">{getAmenityIcon(amenity.icon)}</span> {amenity.name}
                </Badge>
              ))}
            </div>
            
            <div className="mt-auto pt-4">
              {studySpace.availableSeats === 0 ? (
                <Button disabled variant="outline" className="w-full border-red-200 text-red-600 cursor-not-allowed">
                  Fully Booked
                </Button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full bg-[#e6d3a3] hover:bg-[#d6c393] text-slate-800 shadow-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2" /> Book Now
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studySpace={studySpace}
      />
    </>
  );
}
