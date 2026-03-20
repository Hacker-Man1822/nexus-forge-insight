import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  color?: "primary" | "accent" | "warning" | "destructive";
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, trend, icon: Icon, color = "primary" }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-5 animate-count-up" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground font-body mb-1">{title}</p>
      <p className="text-2xl font-heading font-bold">{value}</p>
    </div>
  );
};

export default KpiCard;
