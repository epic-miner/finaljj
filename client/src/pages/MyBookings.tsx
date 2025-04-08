import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Booking, StudySpaceWithAmenities } from '@shared/schema';
import PageTransition, { childVariants } from '@/components/PageTransition';
import { BookOpenCheck, MapPin, Calendar, Clock, Users, Hash, Loader2, X, ExternalLink } from 'lucide-react';

// Animation variants for container elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animation variants for booking cards with staggered reveal
const bookingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
};

export default function MyBookings() {
  const { toast } = useToast();
  const [userId] = useState<number | null>(null); // In a real app, this would come from auth
  
  // Fetch all bookings - for demo purposes without auth
  const { data: allBookings, isLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });
  
  // For a real app with auth, we would use:
  // const { data: userBookings, isLoading } = useQuery<Booking[]>({
  //   queryKey: [`/api/bookings?userId=${userId}`],
  //   enabled: !!userId,
  // });
  
  // Fetch all study spaces to get details for bookings
  const { data: studySpaces } = useQuery<StudySpaceWithAmenities[]>({
    queryKey: ['/api/study-spaces'],
  });
  
  // Function to get study space details for a booking
  const getStudySpaceForBooking = (studySpaceId: number) => {
    return studySpaces?.find(space => space.id === studySpaceId);
  };
  
  // For this demo, we'll pretend we have bookings from the user
  // In a real app with auth, we would use userBookings from the API
  const bookings = allBookings || [];
  
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-white/70 mb-8">Manage your study space reservations</p>
        </motion.div>
        
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="ml-3 text-white/80">Loading your bookings...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="bg-background/60 backdrop-blur-md rounded-xl h-40 animate-pulse border border-primary/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <div className="h-full w-full flex">
                    <div className="w-1/4 bg-primary/10"></div>
                    <div className="w-3/4 p-4">
                      <div className="h-4 bg-primary/20 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-primary/10 rounded w-1/2 mb-6"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-3 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-background/40 backdrop-blur-lg border border-primary/10 shadow-lg">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <BookOpenCheck className="h-16 w-16 text-primary/60 mx-auto mb-6" />
                  <h2 className="text-2xl font-semibold text-white mb-3">No Bookings Found</h2>
                  <p className="text-white/70 mb-8 max-w-md mx-auto">
                    You haven't made any study space bookings yet. Explore our available spaces and find your perfect study environment.
                  </p>
                  <Link href="/study-spaces">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg"
                      >
                        Browse Study Spaces
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={childVariants}>
                <motion.h2 
                  className="text-xl font-semibold text-white mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Upcoming Bookings
                </motion.h2>
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                >
                  {bookings.map((booking, index) => {
                    const studySpace = getStudySpaceForBooking(booking.studySpaceId);
                    if (!studySpace) return null;
                    
                    // In a real app, we would filter by date to show only upcoming bookings
                    return (
                      <motion.div
                        key={booking.id}
                        variants={bookingVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="overflow-hidden"
                      >
                        <Card className="bg-background/40 backdrop-blur-lg border border-primary/10 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                          <div className="rounded-lg p-0 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 relative overflow-hidden">
                                <motion.img
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.4 }}
                                  src={studySpace.imageUrl}
                                  alt={studySpace.name}
                                  className="w-full h-full object-cover"
                                  style={{ height: '150px' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                              </div>
                              <div className="p-5 md:p-6 md:w-3/4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-semibold text-white">{studySpace.name}</h3>
                                    <p className="text-white/60 text-sm flex items-center">
                                      <MapPin className="h-3 w-3 mr-1 text-primary/70" /> {studySpace.address}
                                    </p>
                                  </div>
                                  <div className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                    Confirmed
                                  </div>
                                </div>
                                
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                  <div className="space-y-1">
                                    <p className="text-white/60 flex items-center">
                                      <Calendar className="h-3 w-3 mr-1 text-primary/70" /> Date
                                    </p>
                                    <p className="font-medium text-white">{booking.date}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-white/60 flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-primary/70" /> Time
                                    </p>
                                    <p className="font-medium text-white">{booking.timeSlot}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-white/60 flex items-center">
                                      <Users className="h-3 w-3 mr-1 text-primary/70" /> Seats
                                    </p>
                                    <p className="font-medium text-white">{booking.numberOfSeats}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-white/60 flex items-center">
                                      <Hash className="h-3 w-3 mr-1 text-primary/70" /> Booking ID
                                    </p>
                                    <p className="font-medium text-white">#{booking.id}</p>
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex justify-end space-x-2">
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button 
                                      variant="outline"
                                      className="border-primary/20 text-white hover:bg-primary/10"
                                      onClick={() => {
                                        toast({
                                          title: "Booking Canceled",
                                          description: "Your booking has been canceled.",
                                          variant: "destructive"
                                        });
                                      }}
                                    >
                                      <X className="h-4 w-4 mr-1" /> Cancel
                                    </Button>
                                  </motion.div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href={`/study-spaces/${studySpace.id}`}>
                                      <Button className="bg-primary hover:bg-primary/90 text-white">
                                        <ExternalLink className="h-4 w-4 mr-1" /> View Space
                                      </Button>
                                    </Link>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
              
              <motion.div variants={childVariants}>
                <motion.h2 
                  className="text-xl font-semibold text-white mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Past Bookings
                </motion.h2>
                <motion.div
                  variants={bookingVariants}
                >
                  <Card className="bg-background/40 backdrop-blur-lg border border-primary/10">
                    <CardContent className="p-8 text-center">
                      <Clock className="h-10 w-10 text-white/30 mx-auto mb-4" />
                      <p className="text-white/70">No past bookings found.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
