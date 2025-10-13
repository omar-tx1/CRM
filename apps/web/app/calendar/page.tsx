import { PageContainer } from "@tjb/ui";

const upcoming = [
  { id: "1", title: "Demo Job", date: "2024-05-01", crew: "Crew A" }
];

export default function CalendarPage() {
  return (
    <PageContainer title="Calendar">
      <p className="text-sm text-slate-600">Full calendar views and Google Calendar sync will arrive in Iteration 3.</p>
      <div className="mt-4 space-y-3">
        {upcoming.map((event) => (
          <div key={event.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-base font-semibold text-slate-900">{event.title}</p>
            <p className="text-sm text-slate-600">{event.date}</p>
            <p className="text-sm text-slate-600">Assigned Crew: {event.crew}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
