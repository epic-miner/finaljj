import { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ReviewCard from '@/components/ReviewCard';
import BookingModal from '@/components/BookingModal';
import { StudySpaceWithAmenities, Review } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { getStudySpaceImage } from '@/lib/studySpaceImages';
import { Star, StarHalf, MapPin, Clock, Users, Wifi, Coffee, PanelTopClose, VolumeX, UserPlus, TreePine, Laptop, Landmark } from 'lucide-react';

export default function StudySpaceDetails() {
  const [match, params] = useRoute('/study-spaces/:id');
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!match) {
    navigate('/study-spaces');
    return null;
  }

  const id = parseInt(params.id);

  // Fetch study space details
  const { data: studySpace, isLoading: isLoadingStudySpace, error: studySpaceError } = useQuery<StudySpaceWithAmenities>({
    queryKey: [`/api/study-spaces/${id}`],
  });

  // Fetch reviews for this study space
  const { data: reviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: [`/api/reviews?studySpaceId=${id}`],
  });

  // Review submission mutation
  const reviewMutation = useMutation({
    mutationFn: async (reviewData: { rating: number; comment: string }) => {
      return apiRequest('POST', '/api/reviews', {
        studySpaceId: id,
        userId: null, // We're not implementing auth in this MVP
        ...reviewData
      });
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      // Invalidate the reviews query to fetch updated data
      queryClient.invalidateQueries({ queryKey: [`/api/reviews?studySpaceId=${id}`] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to submit review",
        description: "Please try again later.",
      });
    }
  });

  const getAvailabilityStatus = (availableSeats: number, totalSeats: number) => {
    if (availableSeats === 0) return { text: "Full", color: "bg-red-100 text-red-800", icon: "circle text-red-500" };
    if (availableSeats < totalSeats * 0.2) return { text: "Limited", color: "bg-amber-100 text-amber-800", icon: "circle text-amber-500" };
    return { text: "Available", color: "bg-green-100 text-green-800", icon: "circle text-green-500" };
  };

  const handleBookButtonClick = () => {
    if (studySpace?.availableSeats === 0) {
      toast({
        variant: "destructive",
        title: "Fully Booked",
        description: "Sorry, this space is currently fully booked.",
      });
      return;
    }
    setIsBookingModalOpen(true);
  };

  // Loading state
  if (isLoadingStudySpace) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="h-80 bg-slate-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-10 bg-slate-200 rounded mb-4"></div>
              <div className="h-40 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (studySpaceError || !studySpace) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Study Space</h1>
        <p className="mb-6">We couldn't load the details for this study space. Please try again later.</p>
        <Button onClick={() => navigate('/study-spaces')}>
          Back to Study Spaces
        </Button>
      </div>
    );
  }

  const availability = getAvailabilityStatus(studySpace.availableSeats, studySpace.totalSeats);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero section with image */}
      <div className="w-full bg-gradient-to-b from-blue-50 to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="rounded-full overflow-hidden h-48 w-48 md:h-64 md:w-64 border-4 border-white shadow-xl mb-6">
            <img
              src={getStudySpaceImage(studySpace.imageUrl || '')}
              alt={studySpace.name}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-2">{studySpace.name}</h1>
          <div className="flex items-center text-slate-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{studySpace.address}</span>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${availability.color}`}>
            <span className={`h-2 w-2 rounded-full ${
              studySpace.availableSeats === 0 ? 'bg-red-500' : 
              studySpace.availableSeats < studySpace.totalSeats * 0.2 ? 'bg-amber-500' : 
              'bg-green-500'
            } mr-1.5 animate-pulse`}></span>
            {availability.text}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left content - details */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        star <= Math.round(studySpace.averageRating || 0) 
                          ? <Star key={star} className="h-5 w-5 fill-current" /> 
                          : star - 0.5 <= (studySpace.averageRating || 0) 
                            ? <StarHalf key={star} className="h-5 w-5 fill-current" /> 
                            : <Star key={star} className="h-5 w-5 text-slate-200" />
                      ))}
                    </div>
                    <span className="ml-2 text-slate-600">
                      {studySpace.averageRating?.toFixed(1)} ({studySpace.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">About this space</h2>
                  <p className="text-slate-600">{studySpace.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800 mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {studySpace.amenities.map((amenity) => {
                      // Get appropriate icon for each amenity
                      const getAmenityIcon = (iconName: string) => {
                        switch(iconName) {
                          case 'wifi': return <Wifi className="h-4 w-4 mr-2 text-blue-500" />;
                          case 'plug': return <PanelTopClose className="h-4 w-4 mr-2 text-slate-600" />;
                          case 'coffee': return <Coffee className="h-4 w-4 mr-2 text-amber-600" />;
                          case 'volume-mute': return <VolumeX className="h-4 w-4 mr-2 text-purple-500" />;
                          case 'users': return <UserPlus className="h-4 w-4 mr-2 text-green-500" />;
                          case 'tree': return <TreePine className="h-4 w-4 mr-2 text-green-600" />;
                          case 'laptop': return <Laptop className="h-4 w-4 mr-2 text-slate-800" />;
                          case 'history': return <Landmark className="h-4 w-4 mr-2 text-amber-800" />;
                          default: return null;
                        }
                      };
                      
                      return (
                        <span key={amenity.id} className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                          {getAmenityIcon(amenity.icon)} {amenity.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Reviews</h2>
                  {isLoadingReviews ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-white p-4 rounded-lg">
                          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-slate-200 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  ) : reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-lg text-center border">
                      <p className="text-slate-600">No reviews yet. Be the first to leave a review!</p>
                    </div>
                  )}

                  {/* Add review form */}
                  <div className="mt-6 bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Leave a Review</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const rating = parseInt(form.rating.value);
                        const comment = form.comment.value;
                        
                        reviewMutation.mutate({
                          rating,
                          comment
                        });
                        
                        form.reset();
                      }}
                    >
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                        <select
                          name="rating"
                          className="block w-full border-slate-300 rounded-md shadow-sm focus:ring-[#3949ab] focus:border-[#3949ab]"
                          required
                        >
                          <option value="">Select a rating</option>
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Your Review</label>
                        <textarea
                          name="comment"
                          rows={3}
                          className="block w-full border-slate-300 rounded-md shadow-sm focus:ring-[#3949ab] focus:border-[#3949ab]"
                          placeholder="Share your experience..."
                          required
                        ></textarea>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-[#3949ab] hover:bg-[#2e399c]"
                        disabled={reviewMutation.isPending}
                      >
                        {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right sidebar - booking and info */}
              <div className="lg:col-span-1">
                <Card className="shadow-sm mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Availability</h3>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">Available seats:</span>
                        <span className="font-medium text-lg">
                          {studySpace.availableSeats} / {studySpace.totalSeats}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            studySpace.availableSeats === 0
                              ? 'bg-red-500'
                              : studySpace.availableSeats < studySpace.totalSeats * 0.2
                              ? 'bg-amber-500'
                              : 'bg-green-500'
                          }`}
                          style={{
                            width: `${Math.max(
                              5,
                              (studySpace.availableSeats / studySpace.totalSeats) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button
                      className={`w-full ${
                        studySpace.availableSeats === 0
                          ? 'bg-slate-300 cursor-not-allowed'
                          : 'bg-[#3949ab] hover:bg-[#2e399c]'
                      }`}
                      onClick={handleBookButtonClick}
                      disabled={studySpace.availableSeats === 0}
                    >
                      {studySpace.availableSeats === 0 ? 'Fully Booked' : 'Book Now'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Opening Hours</h3>
                    <div className="space-y-2 text-slate-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>8:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        studySpace={studySpace}
      />
    </div>
  );
}
