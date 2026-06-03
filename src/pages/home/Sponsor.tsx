import {useState} from 'react'

type Company = {
    id: number
    name: string
    tier: 'Diamond' | 'Gold' | 'Silver' | 'Standard' 
    desc: string
    website: string
    logo?: string
}

const companies: Company[] = [
  { id: 0, name: 'Qualcomm', tier: 'Diamond', desc: 'Qualcomm is a global semiconductor and wireless technology company, pioneering 5G and mobile chip innovation.', website: 'https://qualcomm.com', logo: '/logos/qualcomm.png'},
  { id: 1, name: 'TYLin', tier: 'Gold', desc: 'TYLin is a globally recognized engineering firm providing innovative infrastructure solutions worldwide.', website: 'https://tylin.com', logo:'/logos/tylin.png'},
  { id: 2, name: 'Decoda Health', tier: 'Gold', desc: 'Decoda Health builds technology to improve patient outcomes and streamline healthcare delivery.', website: 'https://decodahealth.com'},
  { id: 3, name: 'Bluelime', tier: 'Gold', desc: 'Bluelime powers projects with sustainable and innovative engineering solutions.', website: 'https://bluelime.com'},
  { id: 4, name: 'Introba', tier: 'Gold', desc: 'Introba is a global engineering consultancy focused on building systems and sustainability.', website: 'https://introba.com'},
  { id: 5, name: 'Cerebras', tier: 'Silver', desc: 'Cerebras builds the world\'s largest AI chips, enabling fast and efficient deep learning at scale.', website: 'https://cerebras.net'},
  { id: 6, name: 'BBD', tier: 'Silver', desc: 'BBD is a software engineering company delivering innovative technology solutions across industries.', website: 'https://bbdsoftware.com'},
  { id: 7, name: 'Nanoleaf', tier: 'Silver', desc: 'Nanoleaf creates smart lighting and energy-saving products with a focus on design and sustainability.', website: 'https://nanoleaf.me'},
  { id: 8, name: 'Scotiabank', tier: 'Silver', desc: 'Scotiabank is one of Canada\'s leading financial institutions, serving millions of customers globally.', website: 'https://scotiabank.com'},
  { id: 9, name: 'Dayforce', tier: 'Silver', desc: 'Dayforce is an HCM platform helping organizations manage workforce, payroll, and HR in one place.', website: 'https://dayforce.com'},
  { id: 10, name: 'Huawei', tier: 'Silver', desc: 'Huawei is a leading global provider of ICT infrastructure and smart devices.', website: 'https://huawei.com'},
  { id: 11, name: 'Cascades', tier: 'Silver', desc: 'Cascades produces sustainable packaging and tissue products from recycled fibres.', website: 'https://cascades.com'},
  { id: 12, name: 'IKO', tier: 'Standard', desc: 'IKO is a leading manufacturer of residential and commercial roofing products.', website: 'https://iko.com'},
  { id: 13, name: 'Kepler', tier: 'Standard', desc: 'Kepler Communications is building a global satellite network for IoT and data connectivity.', website: 'https://kepler.space'},
  { id: 14, name: 'SEW Eurodrive', tier: 'Standard', desc: 'SEW Eurodrive specializes in drive technology and automation solutions for industry.', website: 'https://sew-eurodrive.com'},
]

const tierConfig = {
  Diamond: { bg: 'bg-blue-100', divider: 'bg-blue-400', label: 'text-blue-700', border: 'border-blue-200', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
  Gold:    { bg: 'bg-amber-100', divider: 'bg-amber-400', label: 'text-amber-800', border: 'border-amber-300', badgeBg: 'bg-amber-50', badgeText: 'text-amber-800' },
  Silver:  { bg: 'bg-stone-100', divider: 'bg-stone-400', label: 'text-stone-500', border: 'border-stone-300', badgeBg: 'bg-stone-100', badgeText: 'text-stone-500' },
  Standard:{ bg: 'bg-orange-100', divider: 'bg-orange-400', label: 'text-orange-800', border: 'border-orange-200', badgeBg: 'bg-orange-50', badgeText: 'text-orange-800' },
}

const tiers = ['Diamond', 'Gold', 'Silver', 'Standard'] as const

function LogoBox ({company, selected, onClick}: {company: Company; selected: boolean, onClick: ()=> void}) {
    const cfg = tierConfig[company.tier]
    return (
        <button
            onClick = {onClick}
            className = {`flex flex-col items-center justify-center w-32 aspect-video rounded-lg border gap-1 cursor-pointer transition-opacity hover:opacity-70 flex-shrink-0 bg-white ${cfg.border} ${selected ? 'ring-2 ring-offset-1 ring-current':''}`}
        >
            {company.logo
            ? <img src={company.logo} alt={company.name} className='w-full h-full object-contain p-2'/>
            : <>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${cfg.label}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15l.75 18H3.75L4.5 3zM9 21V9m6 12V9M9 9h6" />
                </svg>
                <span className={`text-[15px] leading-tight text-center ${cfg.label}`}>{company.name}</span>
                </>
            }
        </button>
    )
}

function Dashboard ({company}: {company: Company}) {
    const cfg = tierConfig[company.tier]
    return (
        <div className = 'flex flex-col h-full'>
            <span className={`text-[sm] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start ${cfg.badgeText}`}>
                {company.tier}
            </span>
            <div className='flex items-center gap-4 mb-5'>
                <div className = 'w-16 h-16 rounded-xl border border-gray-200 bg-gray-200 flex items-center justify-center flex-shrink-0'>
                    {company.logo
                        ? <img src={company.logo} alt={company.name} className="w-10 h-10 object-contain" />
                        : <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 h-7 ${cfg.label}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15l.75 18H3.75L4.5 3zM9 21V9m6 12V9M9 9h6" />
                        </svg>
                    }
                </div>
                <div>
                    <h3 className = 'text-xl font-semibold text-gray-900'>{company.name}</h3>
                </div>
            </div>
            <p className = 'text-sm text-gray-500 leading-relaxed mb-6'>{company.desc}</p>
            <div className = 'border-t border-gray-100'>
                <a href={company.website} target="_blank" rel="noreferrer" className = "flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors py-1 border-b border-gray-100">
                    🌐 Website
                </a>
            </div>
        </div>
    )
}



export default function sponsorSection () {
    const[selected, setSelected] = useState<Company>(companies[0])
    const[carouselIdx, setCarouselIdx] = useState(0)
    const standardCompanies = companies.filter(c => c.tier === 'Standard')
    const carouselVisble = 4
    const carouselMax = Math.max(0, standardCompanies.length - carouselVisble)
    return(
        <section className='py-20 px-16'>
            <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold mb-2'>Our Partners</h2>
                <p className='text-grey-500 text-sm'>Parterning with the big 10 this year</p>
            </div>

            <div className = 'flex gap-4 p-4 border border-gray-100 rounded-2xl overflow-hidden min-h-[480px]'>
                 <div className='w-[50%] flex flex-col border-r border-gray-100 overflow-y-auto'>
                {tiers.map(tier => {
                    const cfg=tierConfig[tier]
                    const tierCompanies = companies.filter(c =>c.tier ===tier)

                    if (tier === 'Standard') {
              return (
                <div key={tier} className={`flex items-center gap-3 px-6 py-7 ${cfg.bg}`}>
                  <p className={`text-sm font-semibold uppercase tracking-widest w-23 flex-shrink-0 ${cfg.label}`}>{tier}</p>
                  <div className={`w-px self-stretch flex-shrink-0 ${cfg.divider}`} />
                  <button
                    onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
                    className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0"
                  >‹</button>
                  <div className="overflow-hidden flex-1">
                    <div
                      className="flex gap-2 transition-transform duration-300"
                      style={{ transform: `translateX(-${carouselIdx * 136}px)` }}
                    >
                      {standardCompanies.map(c => (
                        <LogoBox key={c.id} company={c} selected={selected.id === c.id} onClick={() => setSelected(c)} />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setCarouselIdx(i => Math.min(carouselMax, i + 1))}
                    className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0"
                  >›</button>
                </div>
              )
            }

            return(
                <div key={tier} className = {`flex items-center  px-4 py-5 ${cfg.bg}`}>
                    <p className={`text-sm font-semibold uppercase tracking-widest w-28 flex-shrink-0 ${cfg.label}`}>{tier}</p>
                    <div className={`w-px self-stretch flex-shrink-0 ${cfg.divider}`}/>
                    <div className = 'flex gap-2 flex-wrap ml-4'>
                        {tierCompanies.map(c => (
                            <LogoBox key = {c.id} company={c} selected={selected.id ===c.id} onClick={() => setSelected(c)} />
                        ))}
                    </div>
                </div>
            )
                })}
                </div>
                <div className={`w-[50%] p-6 border-2 border-black rounded-2xl ${tierConfig[selected.tier].bg}`}>
                    <Dashboard company={selected}/>
                </div>
            </div>
        </section>
    )
}