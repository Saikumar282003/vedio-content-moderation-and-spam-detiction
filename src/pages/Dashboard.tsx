import { Shield, Video, MessageSquare, TrendingUp, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-security.jpg";

export default function Dashboard() {
  const stats = [
    { name: "Videos Analyzed", value: "247", change: "+12%", icon: Video },
    { name: "Flagged Content", value: "23", change: "-8%", icon: Shield },
    { name: "Spam Comments", value: "156", change: "+23%", icon: MessageSquare },
    { name: "Safety Score", value: "94%", change: "+2%", icon: TrendingUp },
  ];

  const recentActivity = [
    { type: "video", title: "Marketing_Campaign_Final.mp4", status: "flagged", time: "2 hours ago" },
    { type: "comment", title: "Spam comment detected in product review", status: "removed", time: "3 hours ago" },
    { type: "video", title: "Tutorial_Introduction.mp4", status: "approved", time: "5 hours ago" },
    { type: "comment", title: "Inappropriate language in community post", status: "flagged", time: "8 hours ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-hero border border-border/50">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Video Security"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        </div>
        <div className="relative px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Welcome to VideoGuard
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your comprehensive video content moderation and spam detection platform. 
              Keep your platform safe with AI-powered content analysis.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/video-moderation">Upload Video</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/reports">View Reports</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="bg-gradient-card border-border/50 hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest moderation actions and detected threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/30">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'approved' ? 'bg-success' :
                    activity.status === 'flagged' ? 'bg-warning' : 'bg-destructive'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type === 'video' ? 'Video' : 'Comment'} • {activity.time}
                    </p>
                  </div>
                  <span className={`text-xs font-medium capitalize px-2 py-1 rounded ${
                    activity.status === 'approved' ? 'bg-success/20 text-success' :
                    activity.status === 'flagged' ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common moderation tasks and tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/video-moderation">
                <Video className="mr-2 h-4 w-4" />
                Analyze New Video
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/comment-moderation">
                <MessageSquare className="mr-2 h-4 w-4" />
                Check Comments for Spam
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/reports">
                <FileText className="mr-2 h-4 w-4" />
                Download Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Safety Tips */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Platform Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h3 className="font-medium text-foreground mb-2">Regular Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Set up automated scans for new content uploads to maintain platform safety standards.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <h3 className="font-medium text-foreground mb-2">Review Flagged Content</h3>
              <p className="text-sm text-muted-foreground">
                Manually review AI-flagged content to ensure accuracy and minimize false positives.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <h3 className="font-medium text-foreground mb-2">Update Guidelines</h3>
              <p className="text-sm text-muted-foreground">
                Regularly update your content policies and train the system with new examples.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}