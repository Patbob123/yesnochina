import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ExternalLink, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQueryUpcomingEvents } from './Home.api';
import { formatEventTime } from './Home.utils';

const AUTO_INTERVAL = 4000;

export default function UpcomingEvents() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const { data: events, isLoading, isError } = useQueryUpcomingEvents();
    const total = events?.length ?? 0;

    function animateTo(nextIndex: number, direction: 1 | -1 = 1) {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            opacity: 0,
            x: -40 * direction,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                setCurrent(nextIndex);
                gsap.fromTo(cardRef.current,
                    { opacity: 0, x: 40 * direction },
                    { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
                );
            },
        });
    }

    function prev() {
        resetInterval();
        animateTo(current === 0 ? total - 1 : current - 1, -1);
    }

    function next() {
        resetInterval();
        animateTo(current === total - 1 ? 0 : current + 1, 1);
    }

    function resetInterval() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrent(c => {
                const next = c === total - 1 ? 0 : c + 1;
                if (cardRef.current) {
                    gsap.to(cardRef.current, {
                        opacity: 0, x: -40, duration: 0.25, ease: 'power2.in',
                        onComplete: () => {
                            setCurrent(next);
                            gsap.fromTo(cardRef.current,
                                { opacity: 0, x: 40 },
                                { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
                            );
                        },
                    });
                }
                return c; // actual state update happens inside onComplete
            });
        }, AUTO_INTERVAL);
    }

    useEffect(() => {
        if (!total) return;
        resetInterval();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [total]);

    if (isError) return <p className="text-sm text-neutral-500 px-3">Couldn't load events right now.</p>;

    const event = events?.[current];

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white min-h-[340px]">
                {isLoading || !event ? (
                    <div className="animate-pulse p-10 flex flex-col gap-4 h-full">
                        <div className="h-6 w-1/2 rounded-full bg-neutral-200" />
                        <div className="h-4 w-1/3 rounded-full bg-neutral-200" />
                        <div className="space-y-2 mt-2">
                            <div className="h-3 w-full rounded-full bg-neutral-200" />
                            <div className="h-3 w-5/6 rounded-full bg-neutral-200" />
                            <div className="h-3 w-4/6 rounded-full bg-neutral-200" />
                        </div>
                    </div>
                ) : (
                    <div ref={cardRef}>
                        <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-4 p-10 h-full"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-bold text-neutral-800 text-2xl leading-snug group-hover:text-brand-teal transition-colors">
                                    {event.title}
                                </h3>
                                <ExternalLink className="h-5 w-5 text-neutral-400 group-hover:text-brand-teal shrink-0 mt-1 transition-colors" />
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-brand-teal">
                                <CalendarDays className="h-4 w-4 shrink-0" />
                                {(() => { const { date, time } = formatEventTime(event.startDate, event.endDate); return <><span>{date}</span><span className="text-neutral-300">·</span><span className="text-neutral-500">{time}</span></>; })()}
                            </div>

                            <p className="text-neutral-500 leading-relaxed line-clamp-4">
                                {event.description}
                            </p>
                        </a>
                    </div>
                )}
            </div>

            {/* Controls */}
            {!isLoading && total > 1 && (
                <div className="flex items-center gap-3">
                    <button onClick={prev} className="rounded-full border border-neutral-200 p-2 text-neutral-600 hover:border-brand-teal hover:text-brand-teal transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex gap-1.5">
                        {events?.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { resetInterval(); animateTo(i, i > current ? 1 : -1); }}
                                className={cn(
                                    'rounded-full transition-all duration-300',
                                    i === current ? 'w-5 h-2 bg-brand-teal' : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                                )}
                            />
                        ))}
                    </div>

                    <button onClick={next} className="rounded-full border border-neutral-200 p-2 text-neutral-600 hover:border-brand-teal hover:text-brand-teal transition-colors">
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
}