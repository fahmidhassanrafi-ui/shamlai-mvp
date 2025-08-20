"use client";
export function MiniCalendar({ year, month }: { year: number; month: number }) {
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const days = Array.from({ length: startDay }).map(()=> null).concat(Array.from({ length: daysInMonth }).map((_,i)=> i+1));
  return (
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {["S","M","T","W","T","F","S"].map(d => <div key={d} className="font-medium">{d}</div>)}
      {days.map((d, idx) => (
        <div key={idx} className={"rounded-lg border py-2 " + (d ? "bg-white" : "bg-transparent border-none")}>
          {d || ""}
        </div>
      ))}
    </div>
  );
}
