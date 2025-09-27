import VideoUpload from "@/components/VideoUpload";

export default function VideoModerationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Video Moderation</h1>
          <p className="text-lg text-muted-foreground">
            Upload and analyze videos for inappropriate content, policy violations, and safety concerns.
          </p>
        </div>
        <VideoUpload />
      </div>
    </div>
  );
}