// components/FeaturedResources.tsx
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, ExternalLink,  BookMarked  } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Resource, useQueryFeaturedResources } from './Home.api';
import { SkeletonCard } from '@/components/SkeletonCard';

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'resource-card group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6',
        'hover:border-brand-teal hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-neutral-800 text-base leading-snug group-hover:text-brand-teal transition-colors">
          {resource.title}
        </h3>
        <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-brand-teal shrink-0 mt-0.5 transition-colors" />
      </div>

      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-brand-yellow/40 px-2.5 py-0.5 text-xs font-medium text-brand-teal"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
        {resource.description}
      </p>
    </a>
  );
}


export default function FeaturedResources() {
  const { data: resources, isLoading, isError } = useQueryFeaturedResources();

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          
          <p className="flex mb-1 text-xs font-semibold uppercase tracking-widest text-brand-teal">
            <BookMarked className="h-3.5 w-3.5 text-brand-teal mr-1" /> Student-Curated 
          </p>
          <h2 className="text-3xl font-extrabold text-neutral-800">
            Featured Resources
          </h2>
        </div>
      </div>

      {/* Grid */}
      {isError ? (
        <p className="text-sm text-neutral-500">Couldn't load resources right now.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : resources?.map((r, i) => (
              <ResourceCard key={r.link} resource={r} index={i} />
            ))
          }
        </div>
      )}
    </div>
  );
}