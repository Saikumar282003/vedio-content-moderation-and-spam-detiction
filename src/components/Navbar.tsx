import { Shield, Video, MessageSquare, BarChart3, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Video Moderation", href: "/video-moderation", icon: Video },
  { name: "Comment Moderation", href: "/comment-moderation", icon: MessageSquare },
  { name: "Reports", href: "/reports", icon: FileText },
];

export default function Navbar() {
  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">VideoGuard</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-primary/50"
                      )
                    }
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}