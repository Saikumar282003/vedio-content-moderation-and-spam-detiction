import CommentModeration from "@/components/CommentModeration";

export default function CommentModerationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Comment Moderation</h1>
          <p className="text-lg text-muted-foreground">
            Analyze comments and user-generated content for spam, inappropriate language, and harmful content.
          </p>
        </div>
        <CommentModeration />
      </div>
    </div>
  );
}