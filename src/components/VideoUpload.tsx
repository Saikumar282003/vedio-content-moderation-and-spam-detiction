import { useState, useRef } from "react";
import { Upload, Video, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VideoAnalysis {
  filename: string;
  duration: number;
  flaggedSegments: Array<{
    timestamp: string;
    issue: string;
    severity: "low" | "medium" | "high";
    confidence: number;
  }>;
  overallRisk: "safe" | "warning" | "danger";
}

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockAnalyze = (filename: string): VideoAnalysis => {
    const scenarios = [
      {
        filename,
        duration: 120,
        flaggedSegments: [
          { timestamp: "00:45", issue: "Potential inappropriate language", severity: "low" as const, confidence: 72 },
          { timestamp: "01:23", issue: "Unclear visual content", severity: "medium" as const, confidence: 84 }
        ],
        overallRisk: "warning" as const
      },
      {
        filename,
        duration: 95,
        flaggedSegments: [],
        overallRisk: "safe" as const
      },
      {
        filename,
        duration: 180,
        flaggedSegments: [
          { timestamp: "02:15", issue: "Violent content detected", severity: "high" as const, confidence: 91 },
          { timestamp: "02:45", issue: "Hate speech indicators", severity: "high" as const, confidence: 88 }
        ],
        overallRisk: "danger" as const
      }
    ];
    
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate analysis
          setTimeout(() => {
            const result = mockAnalyze(file.name);
            setAnalysis(result);
            setUploading(false);
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files[0] && files[0].type.startsWith('video/')) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "safe": return "text-success";
      case "warning": return "text-warning";
      case "danger": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-warning";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Video Upload & Analysis
          </CardTitle>
          <CardDescription>
            Upload videos to analyze for inappropriate content, violence, and other policy violations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploading && !analysis && (
            <div
              className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your video file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports MP4, AVI, MOV, and other common video formats
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {uploading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm font-medium">
                  {progress < 100 ? "Uploading video..." : "Analyzing content..."}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground">
                This may take a few minutes depending on video length
              </p>
            </div>
          )}

          {analysis && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Analysis Complete</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAnalysis(null);
                    setProgress(0);
                  }}
                >
                  Upload Another
                </Button>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">File:</span>
                  <span className="font-medium">{analysis.filename}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="font-medium">{Math.floor(analysis.duration / 60)}:{(analysis.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Overall Risk:</span>
                  <div className="flex items-center gap-2">
                    {analysis.overallRisk === "safe" && <CheckCircle className="h-4 w-4 text-success" />}
                    {analysis.overallRisk !== "safe" && <AlertTriangle className="h-4 w-4 text-warning" />}
                    <span className={`font-medium capitalize ${getRiskColor(analysis.overallRisk)}`}>
                      {analysis.overallRisk}
                    </span>
                  </div>
                </div>
              </div>

              {analysis.flaggedSegments.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Flagged Segments</h4>
                  {analysis.flaggedSegments.map((segment, index) => (
                    <div key={index} className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{segment.timestamp}</p>
                          <p className="text-sm text-muted-foreground">{segment.issue}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-medium ${getSeverityColor(segment.severity)}`}>
                            {segment.severity.toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">{segment.confidence}% confidence</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button variant="default" className="w-full">
                Download Full Report (CSV)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}