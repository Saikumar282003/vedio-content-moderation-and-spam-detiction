import { useState } from "react";
import { MessageSquare, AlertTriangle, CheckCircle, Trash2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: string;
  text: string;
  isSpam: boolean;
  confidence: number;
  reasons?: string[];
}

export default function CommentModeration() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const spamKeywords = ["click here", "free money", "earn fast", "limited time", "act now", "buy now", "guaranteed", "winner"];
  const suspiciousPatterns = [/\b[A-Z]{4,}\b/g, /(.)\1{3,}/g, /http[s]?:\/\//g];

  const analyzeComment = (text: string): Comment => {
    let spamScore = 0;
    const reasons: string[] = [];

    // Check for spam keywords
    const lowerText = text.toLowerCase();
    spamKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        spamScore += 30;
        reasons.push(`Contains spam keyword: "${keyword}"`);
      }
    });

    // Check for suspicious patterns
    if (suspiciousPatterns[0].test(text)) {
      spamScore += 20;
      reasons.push("Excessive capitalization");
    }
    if (suspiciousPatterns[1].test(text)) {
      spamScore += 15;
      reasons.push("Repeated characters");
    }
    if (suspiciousPatterns[2].test(text)) {
      spamScore += 25;
      reasons.push("Contains URLs");
    }

    // Check comment length
    if (text.length < 10) {
      spamScore += 10;
      reasons.push("Very short comment");
    }

    const confidence = Math.min(spamScore, 95);
    
    return {
      id: Date.now().toString(),
      text,
      isSpam: confidence > 60,
      confidence,
      reasons: reasons.length > 0 ? reasons : undefined
    };
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const analysis = analyzeComment(newComment.trim());
      setComments(prev => [analysis, ...prev]);
      setNewComment("");
    }
  };

  const handleRemoveComment = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
  };

  const loadSampleComments = () => {
    const samples = [
      "This is a great video, thanks for sharing!",
      "CLICK HERE FOR FREE MONEY!!! GUARANTEED WINNER!!!",
      "Nice content, looking forward to more",
      "Visit my website http://spam-site.com for amazing deals",
      "Wow!",
      "This video really helped me understand the topic better",
      "FREE IPHONE!!!! ACT NOW LIMITED TIME OFFER",
      "Great explanation, very clear and helpful"
    ];

    const analyzed = samples.map(text => analyzeComment(text));
    setComments(analyzed);
  };

  const spamCount = comments.filter(c => c.isSpam).length;
  const legitimateCount = comments.filter(c => !c.isSpam).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div className="ml-3">
                <p className="text-2xl font-semibold text-foreground">{comments.length}</p>
                <p className="text-sm text-muted-foreground">Total Comments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="ml-3">
                <p className="text-2xl font-semibold text-foreground">{spamCount}</p>
                <p className="text-sm text-muted-foreground">Spam Detected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-3">
                <p className="text-2xl font-semibold text-foreground">{legitimateCount}</p>
                <p className="text-sm text-muted-foreground">Legitimate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Comment Analysis
          </CardTitle>
          <CardDescription>
            Add comments to analyze for spam and inappropriate content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Textarea
              placeholder="Enter a comment to analyze..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Analyze Comment
              </Button>
              <Button variant="outline" onClick={loadSampleComments}>
                Load Sample Comments
              </Button>
            </div>
          </div>

          {comments.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Analysis Results</h3>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg border ${
                    comment.isSpam
                      ? "bg-destructive/10 border-destructive/20"
                      : "bg-success/10 border-success/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-foreground mb-2">{comment.text}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={comment.isSpam ? "destructive" : "default"}
                          className={comment.isSpam ? "" : "bg-success text-success-foreground"}
                        >
                          {comment.isSpam ? "SPAM" : "LEGITIMATE"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {comment.confidence}% confidence
                        </span>
                      </div>
                      {comment.reasons && (
                        <div className="space-y-1">
                          {comment.reasons.map((reason, index) => (
                            <p key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                              <Flag className="h-3 w-3" />
                              {reason}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveComment(comment.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}