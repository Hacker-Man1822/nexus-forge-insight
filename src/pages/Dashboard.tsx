import React from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import KpiCard from "@/components/KpiCard";
import {
  Activity, Package, ShieldCheck, Wrench, TrendingUp,
  AlertTriangle, CheckCircle2, Clock, Boxes, BarChart3
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const productionData = [
  { day: "Mon", output: 420, target: 450 },
  { day: "Tue", output: 480, target: 450 },
  { day: "Wed", output: 460, target: 450 },
  { day: "Thu", output: 510, target: 450 },
  { day: "Fri", output: 490, target: 450 },
  { day: "Sat", output: 380, target: 400 },
  { day: "Sun", output: 320, target: 350 },
];

const qualityData = [
  { name: "Pass", value: 94 },
  { name: "Rework", value: 4 },
  { name: "Reject", value: 2 },
];

const qualityColors = ["hsl(152, 69%, 40%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)"];

const recentAlerts = [
  { id: 1, type: "warning", message: "Low inventory: Component PCB-2204", time: "12 min ago" },
  { id: 2, type: "error", message: "NCR raised: Line 3 - Solder defect", time: "28 min ago" },
  { id: 3, type: "success", message: "Audit completed: ISO 9001 - Passed", time: "1 hr ago" },
  { id: 4, type: "info", message: "New PO received: PO-2024-0891", time: "2 hrs ago" },
];

const alertIcons: Record<string, React.ReactNode> = {
  warning: <AlertTriangle className="w-4 h-4 text-warning" />,
  error: <AlertTriangle className="w-4 h-4 text-destructive" />,
  success: <CheckCircle2 className="w-4 h-4 text-success" />,
  info: <Clock className="w-4 h-4 text-primary" />,
};

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Operator";

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="px-8 py-6 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold font-heading">Welcome back, {firstName}</h1>
              <p className="text-sm text-muted-foreground">Here's your manufacturing overview for today</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-xs text-muted-foreground font-body">All systems operational</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon={Activity} title="Daily Output" value="1,847" change="+8.2%" trend="up" color="primary" />
            <KpiCard icon={ShieldCheck} title="First Pass Yield" value="94.2%" change="+1.4%" trend="up" color="accent" />
            <KpiCard icon={Package} title="Open POs" value="127" change="-3.1%" trend="down" color="warning" />
            <KpiCard icon={Wrench} title="Open RMAs" value="23" change="-12%" trend="up" color="destructive" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Production chart */}
            <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-sm font-semibold">Production Output</h3>
                  <p className="text-xs text-muted-foreground">Units produced vs target this week</p>
                </div>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={productionData}>
                  <defs>
                    <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(220, 13%, 87%)' }} />
                  <Area type="monotone" dataKey="target" stroke="hsl(220, 10%, 46%)" strokeDasharray="4 4" fill="none" />
                  <Area type="monotone" dataKey="output" stroke="hsl(199, 89%, 48%)" fill="url(#outputGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quality donut */}
            <div className="bg-card rounded-lg border border-border p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h3 className="font-heading text-sm font-semibold mb-1">Quality Distribution</h3>
              <p className="text-xs text-muted-foreground mb-4">First pass inspection results</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={qualityData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {qualityData.map((_, idx) => (
                      <Cell key={idx} fill={qualityColors[idx]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {qualityData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: qualityColors[idx] }} />
                    <span className="text-xs text-muted-foreground">{item.name} {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-card rounded-lg border border-border p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h3 className="font-heading text-sm font-semibold mb-4">Recent Alerts & Activity</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/50 animate-slide-in">
                  {alertIcons[alert.type]}
                  <span className="text-sm flex-1">{alert.message}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
