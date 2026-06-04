import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Building2, CircleCheck, Briefcase, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
function MissionSection () {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 100%",
                    toggleActions: "restart none none pause",
                }
            }
        );

        cardRefs.current.forEach((card, i)=>{
            gsap.to(card, {
                rotateX: 360,
                duration: 0.6,
                ease: "power2.out",
                delay: i*0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    toggleActions: "restart none reset none",
                },
                onComplete: () => {
                    gsap.to(card, {
                        scale: 1.08,
                        duration: 0.2,
                        ease: "power2.out",
                        yoyo: true,
                        repeat: 1,
                    });
                }
            });
        });
    }, []);
    
    const aboutText = "You’re Next Career Network is a multi-disciplinary team of over 50 student volunteers. Our goal is to provide opportunities to students through career development programs, as well as corporate and startup career opportunities. Working with over 6000 students and 100+ companies a year, in addition to supporting other U of T engineering clubs by providing $15K a year, we aim to continue bringing exciting opportunities to the students of U of T."
    const stats = [
        {number: "9999+", label: "Companies Partnered", bg: "bg-blue-200", icon: <Building2 size={20} /> },
        { number: "67", label: "CEO's Made", bg: "bg-red-200", icon: <CircleCheck size={20} />},
        { number: "1028", label: "PEYs Opportunities Landed", bg: "bg-orange-200", icon: <Briefcase size={20} /> },
        {number: "2+", label: "Annual Career Fairs", bg: "bg-green-200", icon: <Users size={20} /> }
    ]
    
    return  (
        <section style={{ background: "#E1F5EE" }} className="flex flex-row items-center gap-16 py-20 px-16">
            <div ref={textRef} className='flex-1'>
                <h2 className="text-4xl font-bold mb-4">About YNCN</h2>
                <p className="text-lg text-gray-600">{aboutText}</p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                    <div 
                    key = {stat.label} 
                    ref={(el) => {cardRefs.current[i]=el;}}
                    className = {`${stat.bg} rounded-2xl p-6`}
                    >
                        {stat.icon}
                        <p className="text-4xl font-bold mb-1"> {stat.number}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default MissionSection