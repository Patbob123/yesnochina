import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import FeaturedResources from './FeaturedResources';
import UpcomingEvents from './UpcomingEvents';

const TABS = [
    { id: 'resources', label: 'Featured Resources', viewAll: '/resources' },
    { id: 'events', label: 'Upcoming Events', viewAll: '/events' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function News() {
    const [active, setActive] = useState<TabId>('resources');
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.news-inner', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
        });
    }, { scope: sectionRef });

    function handleTabChange(id: TabId) {
        if (id === active) return;
        gsap.to('#tab-content', {
            opacity: 0,
            x: id === 'events' ? -20 : 20,
            duration: 0.18,
            ease: 'power2.in',
            onComplete: () => {
                setActive(id);
                gsap.fromTo('#tab-content',
                    { opacity: 0, x: id === 'events' ? 20 : -20 },
                    { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }
                );
            },
        });
    }

    const activeTab = TABS.find(t => t.id === active)!;

    return (
        <section ref={sectionRef} className="bg-[#E1F5EE] px-6 py-20">
            <div className="news-inner mx-auto max-w-6xl">
                <div className="mx-auto max-w-6xl">

                    {/* Header row */}
                    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


                        <div className="relative flex w-fit rounded-full border border-brand-teal p-1 bg-brand-teal">
                            <div
                                ref={sliderRef}
                                className={cn(
                                    'absolute top-1 bottom-1 rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                                    active === 'resources'
                                        ? 'left-1 right-[50%]'
                                        : 'left-[50%] right-1'
                                )}
                            />

                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={cn(
                                        'relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 w-36 whitespace-nowrap',
                                        active === tab.id ? 'text-brand-teal' : 'text-white'
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* View all link */}
                        <a
                            href={activeTab.viewAll}
                            className="group flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:underline underline-offset-4 transition-all shrink-0"
                        >
                            {`View all ${activeTab.label.toLowerCase()}`}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* Content */}
                    <div id="tab-content">
                        {active === 'resources' ? <FeaturedResources /> : <UpcomingEvents />}
                    </div>
                </div>
            </div>
        </section>
    );
}