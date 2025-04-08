import { Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Format the date string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <div className="flex items-center text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <i 
                key={star} 
                className={star <= review.rating ? "fas fa-star" : "far fa-star"}
              ></i>
            ))}
          </div>
          <span className="ml-2 text-sm text-slate-600">
            {review.rating}/5
          </span>
        </div>
        <span className="text-xs text-slate-500">
          {review.createdAt ? formatDate(review.createdAt) : "Recent"}
        </span>
      </div>
      
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-200 text-slate-700">
          <i className="fas fa-user text-sm"></i>
        </div>
        <span className="ml-2 font-medium">
          {review.userId ? `User #${review.userId}` : "Anonymous User"}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm">
        {review.comment || "Great study space!"}
      </p>
    </div>
  );
}
