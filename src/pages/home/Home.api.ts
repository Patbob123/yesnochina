import { useQuery } from "@tanstack/react-query";

export interface Resource {
  title: string;
  tags: string[];
  description: string;
  link: string;
}

export interface Event {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  link: string;
}

export function useQueryFeaturedResources() {
  return useQuery({
    queryKey: ['featured-resources'],
    queryFn: async (): Promise<Resource[]> => {
      const res = await fetch('/api/featured_resources');
      if (!res.ok) throw new Error('Failed to fetch resources');
      const data = await res.json();
      return data.featured_resources.map((r: any) => ({
        title: r.name,
        tags: r.tags,
        description: r.description,
        link: r.link,
      }));
    },
  });
}

export function useQueryUpcomingEvents() {
  return useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async (): Promise<Event[]> => {
      const res = await fetch('/api/upcoming_events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      return data.upcoming_events.map((e: any) => ({
        title: e.name,
        startDate: e.date,
        endDate: e.end_date,
        description: e.description,
        link: e.link,
      }));
    },
  });
}