import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Factory, LayoutDashboard, FolderKanban, Package, Activity,
  ShieldCheck, Wrench, BarChart3, Settings, LogOut, Boxes,
  FileText, Users
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FolderKanban, label: "Programs & NPI", path: "/programs" },
  { icon: Package, label: "Supply Chain", path: "/supply-chain" },
  { icon: Activity, label: "Production", path: "/production" },
  { icon: ShieldCheck, label: "Quality", path: "/quality" },
  { icon: Wrench, label: "After-Sales", path: "/after-sales" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Users, label: "Collaboration", path: "/collaboration" },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 h-screen bg-sidebar flex flex-col border-r border-sidebar-border shrink-0">
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Factory className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <span className="font-heading text-sm font-bold text-sidebar-accent-foreground tracking-tight block">
            FactoryIQ
          </span>
          <span className="text-xs text-sidebar-foreground">Manufacturing Portal</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
        <div className="px-3 py-2 mt-1">
          <p className="text-xs text-sidebar-foreground truncate">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
