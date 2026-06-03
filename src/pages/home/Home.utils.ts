export function formatEventTime(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const date = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const startTime = s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const endTime = e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return { date, time: `${startTime} – ${endTime}` };
}