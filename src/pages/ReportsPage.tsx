import { Download, Calendar, Filter, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const reports = [
    {
      id: "RPT-001",
      title: "Weekly Video Moderation Summary",
      type: "Video Analysis",
      date: "2024-01-15",
      status: "ready",
      findings: 23,
      format: "CSV"
    },
    {
      id: "RPT-002", 
      title: "Spam Comments Detection Report",
      type: "Comment Analysis",
      date: "2024-01-14",
      status: "ready",
      findings: 156,
      format: "CSV"
    },
    {
      id: "RPT-003",
      title: "Platform Safety Overview",
      type: "Comprehensive",
      date: "2024-01-13",
      status: "processing",
      findings: 0,
      format: "PDF"
    },
    {
      id: "RPT-004",
      title: "Monthly Trend Analysis",
      type: "Analytics",
      date: "2024-01-12",
      status: "ready",
      findings: 8,
      format: "CSV"
    }
  ];

  const downloadReport = (reportId: string) => {
    // Mock CSV generation
    const csvContent = `Report ID,Title,Type,Date,Status,Findings
${reports.find(r => r.id === reportId)?.id},${reports.find(r => r.id === reportId)?.title},${reports.find(r => r.id === reportId)?.type},${reports.find(r => r.id === reportId)?.date},${reports.find(r => r.id === reportId)?.status},${reports.find(r => r.id === reportId)?.findings}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `videoguard_report_${reportId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Download detailed reports and analyze platform safety trends over time.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div className="ml-3">
                  <p className="text-2xl font-semibold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-success" />
                <div className="ml-3">
                  <p className="text-2xl font-semibold text-foreground">9</p>
                  <p className="text-sm text-muted-foreground">Ready to Download</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-warning" />
                <div className="ml-3">
                  <p className="text-2xl font-semibold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Filter className="h-8 w-8 text-muted-foreground" />
                <div className="ml-3">
                  <p className="text-2xl font-semibold text-foreground">187</p>
                  <p className="text-sm text-muted-foreground">Total Findings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Available Reports
              </span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardTitle>
            <CardDescription>
              Generate and download comprehensive moderation reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{report.title}</h3>
                      <Badge
                        variant={report.status === "ready" ? "default" : "secondary"}
                        className={report.status === "ready" ? "bg-success text-success-foreground" : ""}
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {report.id}</span>
                      <span>Type: {report.type}</span>
                      <span>Date: {report.date}</span>
                      <span>Format: {report.format}</span>
                      {report.findings > 0 && (
                        <span className="text-warning font-medium">
                          {report.findings} findings
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "ready" ? (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => downloadReport(report.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <Button variant="secondary" size="sm" disabled>
                        <Calendar className="h-4 w-4 mr-2" />
                        Processing...
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate New Report */}
        <Card className="bg-gradient-card border-border/50 mt-6">
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>
              Create custom reports based on your specific requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Download className="h-6 w-6 mb-2" />
                <span>Video Analysis Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Download className="h-6 w-6 mb-2" />
                <span>Comment Moderation Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Download className="h-6 w-6 mb-2" />
                <span>Comprehensive Safety Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}