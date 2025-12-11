function ReviewCard({ review }) {
  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <p className="text-gray-800">{review.text}</p>
      <div className="text-sm text-gray-500 mt-2">
        — {review.user}, {review.date}
      </div>
    </div>
  );
}

export default ReviewCard;
