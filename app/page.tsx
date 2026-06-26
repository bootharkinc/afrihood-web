'use client';

import { useEffect, useRef, useState } from 'react';
import s from './page.module.css';

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`${s.reveal} ${visible ? s.revealIn : ''} ${className ?? ''}`}>
      {children}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <div className={s.label}>{children}</div>;
}
function Headline({ children }: { children: React.ReactNode }) {
  return <h2 className={s.headline} dangerouslySetInnerHTML={{ __html: children as string }} />;
}
function Sub({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) {
  return <p className={`${s.sub} ${narrow ? s.subNarrow : ''}`}>{children}</p>;
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
      <div className={s.navInner}>
        <a href="/" className={s.logo}>AFRIHOOD</a>
        <nav className={`${s.navLinks} ${open ? s.navLinksOpen : ''}`}>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#invest" onClick={() => setOpen(false)}>Invest</a>
          <a href="#partners" onClick={() => setOpen(false)}>Partners</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <div className={s.navRight}>
          <a href="#contact" className={s.navCta}>Request Property</a>
          <button
            className={`${s.burger} ${open ? s.burgerOpen : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.heroOverlay} />
      <div className={s.heroContent}>
        <div className={s.heroChip}>Pan-African Real Estate &nbsp;·&nbsp; Infrastructure Development</div>
        <h1 className={s.heroHeadline}>
          Raising African Living Standards.<br />
          <span className={s.gold}>One Community at a Time.</span>
        </h1>
        <p className={s.heroSub}>
          Afrihood is a pan-African real estate and infrastructure development company committed
          to building pristine, secure, functional, and beautiful communities — delivering
          world-class living conditions for Africans, regardless of class or financial profile.
        </p>
        <div className={s.heroCtas}>
          <a href="#projects" className={s.btnFilled}>View Our Projects</a>
          <a href="#partners" className={s.btnOutline}>Our Partners</a>
        </div>
        <div className={s.heroStats}>
          {[
            ['3', 'Maiden Projects'],
            ['Lagos', 'First Community'],
            ['3', 'Institutional Partners'],
            ['ISO', '9001 · 45001 · 14001'],
          ].map(([num, lbl], i) => (
            <div key={i} className={s.heroStat}>
              <span className={s.heroStatNum}>{num}</span>
              <span className={s.heroStatLbl}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Partners Bar ──────────────────────────────────────────────────────────────
function PartnersBar() {
  return (
    <div className={s.trustBar}>
      <span className={s.trustLabel}>Development Partners &amp; Institutional Backers</span>
      <div className={s.trustLogos}>
        {['Shelter Afrique', 'Infracredit', 'HSF'].map((n) => (
          <span key={n} className={s.trustPartner}>{n}</span>
        ))}
        <span className={s.trustDivider} />
        {['ISO 9001', 'ISO 45001', 'ISO 14001'].map((n) => (
          <span key={n} className={s.trustBadge}>{n}</span>
        ))}
      </div>
    </div>
  );
}

// ── Investment Products ───────────────────────────────────────────────────────
function InvestSection() {
  const products = [
    {
      icon: '📈',
      tag: 'Fixed Income Bond',
      name: 'AfriBond',
      desc: 'A secured investment bond offering returns up to 40% ROI. Your capital finances formal residential development with a registered charge on completed Afrihood assets.',
      features: ['Up to 40% ROI', 'Secured on completed assets', 'Formal bond documentation', 'Flexible investment tenors', 'Minimum investment applies'],
      cta: 'Invest in AfriBond',
      featured: false,
    },
    {
      icon: '🏘️',
      tag: 'Fractional Ownership',
      name: 'AfriShare',
      desc: 'Own a fraction of a completed Afrihood court. Earn lifetime rental income proportional to your share — without managing the property yourself.',
      features: ['Lifetime rental income', 'Starting from ₦1,000,000', 'Digital ownership certificate', 'Full property management included', 'Capital appreciation benefits'],
      cta: 'Start with AfriShare',
      featured: true,
    },
    {
      icon: '🏗️',
      tag: 'Direct Purchase',
      name: 'Properties',
      desc: 'Purchase outright ownership of an Afrihood residential unit. Formally titled, insured, and government-approved — with flexible payment plans available.',
      features: ['Full freehold title deed', 'Government-approved C of O', 'Flexible payment plans', 'ISO-certified construction', 'Priority access to launches'],
      cta: 'Browse Properties',
      featured: false,
    },
  ];

  return (
    <section className={s.section} id="invest">
      <Reveal>
        <Label>Ways to Participate</Label>
        <Headline>Own a Piece of Africa&apos;s Housing Future</Headline>
        <Sub>
          Whether you&apos;re investing your savings or deploying institutional capital,
          we have a structured vehicle designed for your goals.
        </Sub>
        <div className={s.productsGrid}>
          {products.map((p) => (
            <div key={p.name} className={`${s.productCard} ${p.featured ? s.productCardFeatured : ''}`}>
              {p.featured && <div className={s.productBadge}>Most Popular</div>}
              <div className={s.productIcon}>{p.icon}</div>
              <div className={s.productTag}>{p.tag}</div>
              <h3 className={s.productName}>{p.name}</h3>
              <p className={s.productDesc}>{p.desc}</p>
              <ul className={s.productFeatures}>
                {p.features.map((f) => (
                  <li key={f}><span className={s.gold}>✓</span> {f}</li>
                ))}
              </ul>
              <a href="#contact" className={p.featured ? s.btnFilled : s.btnOutlineGold}>{p.cta}</a>
            </div>
          ))}
        </div>
        <p className={s.compareNote}>
          Not sure which is right for you?{' '}
          <a href="#contact" className={s.goldLink}>Speak to our team →</a>
        </p>
      </Reveal>
    </section>
  );
}

// ── Maiden Projects ───────────────────────────────────────────────────────────
function ProjectsSection() {
  const projects = [
    {
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      name: 'Aize Court',
      location: 'Palmgrove, Lagos',
      type: 'Residential Apartments',
      beds: '3',
      units: '12 Units',
      price: '₦5,529,412',
      status: 'Development Phase',
      statusColor: '#c9a84c',
      badge: 'Maiden Project',
    },
    {
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      name: 'Uresa Court',
      location: 'Ilupeju, Lagos',
      type: 'Maisonette with BQ',
      beds: '3',
      units: '8 Units',
      price: '₦11,818,182',
      status: 'Development Phase',
      statusColor: '#c9a84c',
      badge: 'Maiden Project',
    },
    {
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      name: 'Millennium Court',
      location: 'Surulere, Lagos',
      type: 'Terrace Duplex with BQ',
      beds: '3',
      units: '6 Units',
      price: '₦18,400,000',
      status: 'Development Phase',
      statusColor: '#c9a84c',
      badge: 'Flagship',
    },
  ];

  return (
    <section className={`${s.section} ${s.sectionAlt}`} id="projects">
      <Reveal>
        <Label>Development Portfolio</Label>
        <Headline>Our Maiden Projects — Lagos, Nigeria</Headline>
        <Sub>
          Three planned residential courts anchoring Afrihood&apos;s Lagos launch —
          each a demonstration of what formal, world-class African residential development looks like.
        </Sub>
        <div className={s.propsGrid}>
          {projects.map((p) => (
            <div key={p.name} className={s.propCard}>
              <div className={s.propImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} className={s.propImage} loading="lazy" />
                <span className={s.propBadge}>{p.badge}</span>
                <span className={s.propStatus} style={{ color: p.statusColor, borderColor: p.statusColor }}>
                  {p.status}
                </span>
              </div>
              <div className={s.propBody}>
                <div className={s.propType}>{p.type}</div>
                <h3 className={s.propName}>{p.name}</h3>
                <div className={s.propLocation}>📍 {p.location}</div>
                <div className={s.propMeta}>
                  <div><span>Beds</span><strong>{p.beds}</strong></div>
                  <div><span>Units</span><strong>{p.units}</strong></div>
                  <div><span>From</span><strong className={s.gold}>{p.price}</strong></div>
                </div>
                <div className={s.propFooter}>
                  <a href="#contact" className={s.btnOutlineGold}>Enquire Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Mission & Story ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className={s.aboutSection} id="about">
      <div className={s.aboutImage}>
        <div className={s.aboutYearBadge}>
          <span className={s.aboutYear}>2015</span>
          <span className={s.aboutYearSub}>Founded — building Africa&apos;s housing future</span>
        </div>
      </div>
      <div className={s.aboutContent}>
        <Reveal>
          <Label>Our Creed</Label>
          <h2 className={s.aboutTitle}>Building the Communities Africa Deserves</h2>
          <blockquote className={s.creed}>
            &ldquo;There is a creed that drives our existence as a company and why we rise to work every day;
            and that is to see our people live in pristine, secure, functional and beautiful communities
            befitting for humans as it exists in other parts of the world — regardless of class or
            financial profile.&rdquo;
          </blockquote>
          <p className={s.aboutBody}>
            Afrihood operates as a Pan-African Real Estate and Infrastructural Company dedicated to raising
            African living standards through community development. We rebuild urban areas by acquiring
            dilapidated properties, demolishing them strategically, and constructing planned residential
            courts appropriate to density levels.
          </p>
          <div className={s.pillarsGrid}>
            {[
              ['🌍', 'Afrocentrism', 'Indigenous materials, African expertise, and African-led design.'],
              ['🤝', 'Community', 'Fostering a deep sense of belonging among all stakeholders.'],
              ['🏅', 'World-Class', 'Superior designs, premium amenities, world-standard fixtures.'],
              ['♻️', 'Sustainability', 'Recycling, renewable energy, and eco-friendly construction.'],
            ].map(([ico, t, d]) => (
              <div key={t as string} className={s.pillar}>
                <div className={s.pillarIcon}>{ico}</div>
                <div className={s.pillarTitle}>{t}</div>
                <div className={s.pillarDesc}>{d}</div>
              </div>
            ))}
          </div>
          <a href="#contact" className={s.btnOutlineGold}>Connect With Us</a>
        </Reveal>
      </div>
    </section>
  );
}

// ── Key Numbers ───────────────────────────────────────────────────────────────
function NumbersSection() {
  const nums = [
    ['3', 'Active Development Projects', 'Aize Court · Uresa Court · Millennium Court — all in Lagos'],
    ['3', 'Institutional Partners', 'Shelter Afrique, Infracredit, and HSF backing our maiden launch'],
    ['ISO ×3', 'Quality Certifications', 'ISO 9001, ISO 45001, and ISO 14001 compliance across operations'],
    ['100%', 'Formally Titled', 'Every unit government-approved, insured, and title-documented'],
    ['Lagos', 'Maiden City', 'First community in a planned pan-African expansion across the continent'],
    ['₦5.5M+', 'Entry Price Point', 'Formal housing made accessible — starting well below market luxury'],
  ];
  return (
    <section className={s.numbersSection}>
      <Reveal>
        <Label>Track Record</Label>
        <Headline>Starting Right.<br/>Thinking Continental.</Headline>
        <div className={s.numbersGrid}>
          {nums.map(([num, lbl, sub]) => (
            <div key={lbl} className={s.numberCell}>
              <div className={s.numberVal}>{num}</div>
              <div className={s.numberLbl}>{lbl}</div>
              <div className={s.numberSub}>{sub}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Development Philosophy ────────────────────────────────────────────────────
function PhilosophySection() {
  const pillars = [
    ['🌿', 'Sustainability', 'Every Afrihood development is built with recycling infrastructure, renewable energy sources, and eco-friendly construction materials — minimising environmental impact while maximising resident wellbeing.'],
    ['🏙️', 'Afrocentrism', 'No imported blueprints. Every structure is conceptualised using indigenous materials, African expertise, and design sensibilities rooted in the African context, climate, and culture.'],
    ['🤝', 'Community', 'We foster a deep sense of belonging among all stakeholders — residents, investors, and the surrounding neighbourhood. Every court is a community, not just a building.'],
    ['🏅', 'World-Class', 'Superior designs, premium amenities, and world-standard fixtures — because Africans deserve the same quality of built environment that exists in other parts of the world.'],
    ['🏘️', 'Integrated Living', 'Live, work, and play environments within each development. Retail, green space, and community infrastructure are built in — not bolted on as afterthoughts.'],
    ['⚡', 'Industry 4.0', 'Automation, AI, IoT, and smart building systems integrated from the ground up — making every Afrihood community future-ready for the next generation of urban life.'],
  ];
  return (
    <section className={s.philosophySection} id="philosophy">
      <div className={s.philosophyOverlay} />
      <div className={s.philosophyContent}>
        <Reveal>
          <Label>Development Ideology</Label>
          <Headline>Six Principles That Drive<br/>Every Afrihood Community</Headline>
          <Sub>We don&apos;t build properties. We build places people want to live, work, and grow in — for generations.</Sub>
          <div className={s.philosophyGrid}>
            {pillars.map(([ico, t, d]) => (
              <div key={t as string} className={s.philosophyCard}>
                <div className={s.philosophyIcon}>{ico}</div>
                <h3 className={s.philosophyTitle}>{t}</h3>
                <p className={s.philosophyDesc}>{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Institutional Partners (detailed) ─────────────────────────────────────────
function PartnersSection() {
  const partners = [
    {
      name: 'Shelter Afrique',
      role: 'Pan-African Housing Finance Institution',
      desc: 'Shelter Afrique is a pan-African real estate finance institution established by African governments and the African Development Bank. It is the continent\'s premier multilateral financier of affordable housing, providing long-term finance and technical assistance to housing developers across Africa. Their partnership with Afrihood connects our maiden projects to decades of continental housing expertise and institutional-grade structuring.',
      tags: ['AfDB-Backed', 'Multilateral Finance', '44 Member States'],
      icon: '🌍',
    },
    {
      name: 'Infracredit',
      role: 'Infrastructure Credit Guarantee Company',
      desc: 'InfraCredit is a Nigeria-based, AAA-rated infrastructure credit guarantee company backed by the Nigeria Sovereign Investment Authority and GuarantCo. It provides long-term local-currency credit guarantees for infrastructure bond issuances, enabling Nigerian developers to access patient, affordable capital. Infracredit\'s involvement gives Afrihood\'s AfriBond the institutional-grade backing that institutional investors require.',
      tags: ['AAA-Rated', 'NSIA-Backed', 'Bond Guarantee'],
      icon: '🏦',
    },
    {
      name: 'HSF',
      role: 'Housing & Shelter Finance Partner',
      desc: 'HSF (Housing Shelter Fund) is dedicated to scaling formal housing delivery across African markets through capital mobilization, technical assistance, and strategic partnerships. Their focus on addressing Africa\'s 50-million-unit housing deficit aligns directly with Afrihood\'s mission, providing both financial instruments and policy-level engagement that strengthens the formal housing ecosystem Afrihood operates within.',
      tags: ['Housing Finance', 'Capital Mobilization', 'Technical Assistance'],
      icon: '🏗️',
    },
  ];
  return (
    <section className={`${s.section} ${s.sectionAlt}`} id="partners">
      <Reveal>
        <Label>Institutional Backing</Label>
        <Headline>Built on Partnerships<br/>That Open Doors</Headline>
        <Sub>
          Our maiden projects are developed in partnership with institutions that have financed
          housing across Africa for decades. This is not a brochure relationship — it is structural backing.
        </Sub>
        <div className={s.partnersGrid}>
          {partners.map((p) => (
            <div key={p.name} className={s.partnerCard}>
              <div className={s.partnerIconWrap}>{p.icon}</div>
              <div className={s.partnerRole}>{p.role}</div>
              <h3 className={s.partnerName}>{p.name}</h3>
              <p className={s.partnerDesc}>{p.desc}</p>
              <div className={s.partnerTags}>
                {p.tags.map((t) => <span key={t} className={s.partnerTag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Why Africa ────────────────────────────────────────────────────────────────
function WhySection() {
  const reasons = [
    ['📊', 'Capital Appreciation', "Africa's urban property values have consistently outpaced inflation in major cities — driven by acute undersupply against rapidly growing demand."],
    ['🏦', 'Rental Yields', "African urban rental yields average 6–14% — significantly higher than European and North American equivalents, driven by the formal housing shortage."],
    ['🌱', 'Structural Demand', "Africa will add 950 million urban residents by 2050. The cities don't fully exist yet. Formal housing is not a luxury asset class — it is critical infrastructure."],
    ['🔒', 'Regulated & Insured', 'Every Afrihood unit is government-approved, formally titled, and covered by comprehensive property insurance. No off-plan risk without documentation.'],
    ['🤲', 'Social Impact', 'Investing in Afrihood directly addresses Africa\'s 50-million-unit housing deficit — delivering measurable community uplift alongside financial return.'],
    ['🌍', 'Pan-African Vision', 'Lagos is the starting point. Afrihood\'s model is designed to replicate across West, East, and Southern Africa — giving early investors continental exposure.'],
  ];
  return (
    <section className={s.section}>
      <Reveal>
        <Label>The Investment Case</Label>
        <Headline>Why Smart Capital<br/>Is Moving to African Housing</Headline>
        <Sub>
          Africa&apos;s urban population will double to 1.5 billion by 2050. The formal housing stock doesn&apos;t exist yet.
          You can own a piece of building it.
        </Sub>
        <div className={s.reasonsGrid}>
          {reasons.map(([ico, t, d]) => (
            <div key={t as string} className={s.reasonCard}>
              <div className={s.reasonIcon}>{ico}</div>
              <div>
                <h3 className={s.reasonTitle}>{t}</h3>
                <p className={s.reasonDesc}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Leadership ────────────────────────────────────────────────────────────────
function TeamSection() {
  const team = [
    {
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80',
      name: 'Olufemi Shield',
      title: 'Managing Partner',
      note: 'Driving Afrihood\'s pan-African vision and institutional strategy',
    },
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
      name: 'Israel Adekoya',
      title: 'Client Account Manager',
      note: 'Investor relations, client acquisition, and account management',
    },
    {
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80',
      name: 'Engr. Olisa Kanebi',
      title: 'Engineering & Construction Manager',
      note: 'ISO-certified construction oversight and engineering delivery',
    },
    {
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80',
      name: 'Victoria Israel',
      title: 'Legal & Administrative Executive',
      note: 'Title documentation, regulatory compliance, and administration',
    },
  ];
  return (
    <section className={`${s.section} ${s.sectionAlt}`} id="team">
      <Reveal>
        <Label>Leadership</Label>
        <Headline>The Team Building<br/>Tomorrow&apos;s Africa Today</Headline>
        <div className={s.teamGrid}>
          {team.map((p) => (
            <div key={p.name} className={s.teamCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} className={s.teamPhoto} loading="lazy" />
              <div className={s.teamInfo}>
                <div className={s.teamName}>{p.name}</div>
                <div className={s.teamTitle}>{p.title}</div>
                <div className={s.teamNote}>{p.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className={s.ctaBanner}>
      <Reveal>
        <Label>Get Involved</Label>
        <h2 className={s.ctaTitle}>
          Ready to Invest in Africa&apos;s<br />
          <span className={s.gold}>Housing Future?</span>
        </h2>
        <p className={s.ctaSub}>
          Join the waitlist for our maiden projects or speak with our team about investment
          opportunities in AfriBond, AfriShare, or direct property acquisition.
        </p>
        <div className={s.ctaButtons}>
          <a href="#contact" className={s.btnFilled}>Request a Property</a>
          <a href="mailto:hello@afrihood.com" className={s.btnOutline}>Email Our Team</a>
        </div>
      </Reveal>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production this POSTs to a backend or form service (e.g. Formspree)
    setSent(true);
  };

  return (
    <section className={s.contactSection} id="contact">
      <div className={s.contactInfo}>
        <Reveal>
          <Label>Get in Touch</Label>
          <h2 className={s.contactTitle}>Ready to Start<br />Your Property Journey?</h2>
          <p className={s.contactBody}>
            Our team is available to answer your questions about investments, property acquisition,
            and partnership opportunities. Send us a message and we&apos;ll respond within 24 hours.
          </p>
          <div className={s.contactDetails}>
            {[
              ['📍', 'Head Office', '7th Floor, Mulliner Towers, 39 Alfred Rewane Road, Ikoyi — Lagos, Nigeria'],
              ['📞', 'Phone', '+234 805 560 0000'],
              ['✉️', 'Email', 'hello@afrihood.com'],
            ].map(([ico, lbl, val]) => (
              <div key={lbl as string} className={s.contactItem}>
                <span className={s.contactIcon}>{ico}</span>
                <div>
                  <div className={s.contactItemLabel}>{lbl}</div>
                  <div className={s.contactItemVal}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className={s.contactForm}>
        {sent ? (
          <div className={s.formSuccess}>
            <div className={s.formSuccessIcon}>✓</div>
            <h3>Message Received</h3>
            <p>Thank you — a member of our team will be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label>Full Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div className={s.formGroup}>
                <label>Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label>Phone Number</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+234 ..." />
              </div>
              <div className={s.formGroup}>
                <label>I&apos;m interested in</label>
                <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                  <option value="">Select an option</option>
                  <option>Aize Court — from ₦5.5M</option>
                  <option>Uresa Court — from ₦11.8M</option>
                  <option>Millennium Court — from ₦18.4M</option>
                  <option>AfriBond Investment</option>
                  <option>AfriShare (Fractional Ownership)</option>
                  <option>AfriBuild (Custom Construction)</option>
                  <option>General Enquiry</option>
                </select>
              </div>
            </div>
            <div className={s.formGroup}>
              <label>Message</label>
              <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your interest or ask us anything..." />
            </div>
            <button type="submit" className={s.btnFilled}>Send Enquiry</button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerMain}>
        <div className={s.footerBrand}>
          <div className={s.logo} style={{ fontSize: '22px', marginBottom: '12px' }}>AFRIHOOD</div>
          <p className={s.footerTagline}>
            Raising African living standards,<br />one community at a time.
          </p>
          <div className={s.footerSocials}>
            {['Twitter', 'LinkedIn', 'Instagram', 'YouTube', 'WhatsApp'].map((n) => (
              <a key={n} href={`https://${n.toLowerCase()}.com/afrihood`} className={s.footerSocial}>{n}</a>
            ))}
          </div>
        </div>
        <div className={s.footerCol}>
          <div className={s.footerColTitle}>Participate</div>
          {['AfriBond', 'AfriShare', 'AfriBuild', 'Browse Properties', 'Request a Property'].map((l) => (
            <a key={l} href="#contact" className={s.footerLink}>{l}</a>
          ))}
        </div>
        <div className={s.footerCol}>
          <div className={s.footerColTitle}>Company</div>
          {['About Afrihood', 'Our Creed', 'Leadership Team', 'Development Philosophy', 'Institutional Partners'].map((l) => (
            <a key={l} href="#about" className={s.footerLink}>{l}</a>
          ))}
        </div>
        <div className={s.footerCol}>
          <div className={s.footerColTitle}>Projects</div>
          {['Aize Court — Palmgrove', 'Uresa Court — Ilupeju', 'Millennium Court — Surulere'].map((l) => (
            <a key={l} href="#projects" className={s.footerLink}>{l}</a>
          ))}
        </div>
      </div>
      <div className={s.footerBottom}>
        <span>© {new Date().getFullYear()} Afrihood. All rights reserved.</span>
        <div className={s.footerCerts}>
          {['ISO 9001', 'ISO 45001', 'ISO 14001'].map((c) => (
            <span key={c} className={s.footerCert}>{c}</span>
          ))}
        </div>
        <div className={s.footerLegal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

// ── How to Acquire ────────────────────────────────────────────────────────────
function HowToAcquireSection() {
  const steps = [
    { num: '01', ico: '🪪', title: 'Register & Enquire', desc: "Complete our property enquiry form with your details and investment interest. Our team verifies your request and assigns a dedicated client account manager within 24 hours." },
    { num: '02', ico: '🔍', title: 'Select Your Property', desc: "Browse our available courts and units. Each listing includes full specifications, pricing, location details, and projected rental yields. Schedule an in-person or virtual site visit." },
    { num: '03', ico: '💳', title: 'Secure Your Unit', desc: "Pay a commitment deposit to reserve your chosen unit. Funds are held in a secure escrow account pending full documentation. Flexible payment plans available over 12–48 months." },
    { num: '04', ico: '📜', title: 'Own & Earn', desc: "Receive your Certificate of Occupancy (C of O) and title deed. Move in, lease it out, or enrol in the AfriShare programme to earn ongoing rental income while we manage the property." },
  ];
  return (
    <section className={`${s.section} ${s.sectionAlt}`} id="how">
      <Reveal>
        <Label>Getting Started</Label>
        <Headline>From First Enquiry<br/>to Full Ownership</Headline>
        <Sub narrow>
          Your entire acquisition journey is supported by our team — from browsing to documentation,
          payment, and handover.
        </Sub>
        <div className={s.stepsGrid}>
          {steps.map((step, i) => (
            <div key={step.num} className={s.stepCard}>
              <div className={s.stepIcon}>{step.ico}</div>
              <div className={s.stepNum}>{step.num}</div>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepDesc}>{step.desc}</p>
              {i < steps.length - 1 && <div className={s.stepConnector} />}
            </div>
          ))}
        </div>
        <a href="#contact" className={s.btnFilled} style={{ marginTop: '56px' }}>Start Your Enquiry</a>
      </Reveal>
    </section>
  );
}

// ── Infrastructure Portfolio ───────────────────────────────────────────────────
function InfrastructureSection() {
  const projects = [
    {
      img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
      cat: 'Community Infrastructure',
      loc: 'Palmgrove & Ilupeju, Lagos',
      title: 'Integrated Court Infrastructure — Phase 1',
      desc: 'Each Afrihood court is developed with full integrated infrastructure: private roads, perimeter fencing, CCTV security, solar-powered common lighting, waste management systems, and community green spaces. No unit is sold without its infrastructure complete.',
      tags: ['Solar Lighting', 'Waste Systems', 'Security'],
      val: '3 Courts',
      status: 'Active',
    },
    {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      cat: 'Urban Regeneration',
      loc: 'Lagos Metropolitan Area',
      title: 'Dilapidated Property Acquisition & Reconstruction',
      desc: 'Afrihood\'s model targets structurally compromised or underutilised urban properties. We acquire, strategically demolish, and rebuild to planned residential density — transforming blighted urban blocks into organised, high-standard communities that lift surrounding property values.',
      tags: ['Urban Renewal', 'Density Planning', 'Community Lift'],
      val: 'Pan-Lagos',
      status: 'Expanding',
    },
    {
      img: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&w=800&q=80',
      cat: 'Smart & Sustainable',
      loc: 'All Afrihood Developments',
      title: 'Waste-to-Energy & Green Systems',
      desc: 'Drawing on our Industry 4.0 development ideology, Afrihood embeds smart infrastructure from foundation up — waste-to-energy conversion, IoT-enabled utility metering, passive cooling design, and renewable energy integration in every planned development.',
      tags: ['IoT Metering', 'Passive Cooling', 'Waste-to-Energy'],
      val: 'Ongoing',
      status: 'Design Phase',
    },
  ];

  return (
    <section className={s.section} id="infrastructure">
      <Reveal>
        <Label>Infrastructure Division</Label>
        <Headline>Where Community Development<br/>Meets Critical Infrastructure</Headline>
        <Sub>
          Beyond the residential unit — Afrihood builds the complete community ecosystem:
          roads, utilities, security, green space, and smart systems.
        </Sub>
        <div className={s.infraGrid}>
          {projects.map((p) => (
            <div key={p.title} className={s.infraCard}>
              <div className={s.infraImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} className={s.infraImage} loading="lazy" />
                <span className={s.infraCat}>{p.cat}</span>
                <span className={s.infraStatus}>{p.status}</span>
              </div>
              <div className={s.infraBody}>
                <div className={s.infraLoc}>📍 {p.loc}</div>
                <h3 className={s.infraTitle}>{p.title}</h3>
                <p className={s.infraDesc}>{p.desc}</p>
                <div className={s.infraFooter}>
                  <div className={s.infraVal}>{p.val}</div>
                  <div className={s.infraTags}>
                    {p.tags.map((t) => <span key={t} className={s.infraTag}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Returns Showcase ──────────────────────────────────────────────────────────
function ReturnsSection() {
  return (
    <section className={s.returnsSection} id="returns">
      <div className={s.returnsQuoteSide}>
        <blockquote className={s.returnsQuote}>
          &ldquo;There is a creed that drives our existence as a company and why we rise to work every day;
          and that is to see our people live in pristine, secure, functional and beautiful communities
          befitting for humans as it exists in other parts of the world — regardless of class or financial profile.&rdquo;
        </blockquote>
        <div className={s.returnsAttrib}>— Olufemi Shield, Managing Partner, Afrihood</div>
      </div>
      <div className={s.returnsDataSide}>
        <Reveal>
          <Label>Return Scenarios</Label>
          <h2 className={s.returnsTitle}>What ₦5,000,000 Looks Like<br/>After 5 Years with Afrihood</h2>
          <div className={s.scenariosWrap}>
            {[
              { plan: 'AfriBond (fixed-income bond)', final: '₦7,000,000+', gain: 'Up to 40% total return', color: '#6ee7b7' },
              { plan: 'AfriShare (fractional ownership)', final: '₦8,500,000+', gain: 'Rental income + appreciation', color: 'var(--gld)' },
              { plan: 'Direct Property (hold + self-let)', final: '₦11,000,000+', gain: 'Full capital growth + rents', color: '#fbbf24' },
            ].map((sc) => (
              <div key={sc.plan} className={s.scenarioRow}>
                <div>
                  <div className={s.scenarioPlan}>{sc.plan}</div>
                  <div className={s.scenarioBase}>On ₦5,000,000 principal · indicative projection</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={s.scenarioFinal} style={{ color: sc.color }}>{sc.final}</div>
                  <div className={s.scenarioGain} style={{ color: sc.color }}>{sc.gain}</div>
                </div>
              </div>
            ))}
            <p className={s.scenarioDisclaimer}>
              Projections based on product terms and Lagos property market trends. Past and projected
              performance do not guarantee future returns. Full terms provided on application.
            </p>
          </div>
          <a href="#contact" className={s.btnFilled}>Speak to an Investment Advisor</a>
        </Reveal>
      </div>
    </section>
  );
}

// ── Community Impact / Testimonials ───────────────────────────────────────────
function ImpactSection() {
  return (
    <section className={`${s.section}`} id="impact">
      <Reveal>
        <Label>The Vision in Action</Label>
        <Headline>What Formal Housing<br/>Does to a Community</Headline>
        <Sub>
          Afrihood&apos;s model is not just about individual units — it is about transforming entire
          urban blocks and raising the living standard of a neighbourhood, one court at a time.
        </Sub>
        <div className={s.impactGrid}>
          {[
            {
              icon: '🏘️',
              title: 'Neighbourhood Value Lift',
              quote: "When a planned, security-fenced court with 24/7 power and clean drainage replaces a derelict compound, the surrounding streets feel it within 12 months — in safety, in aesthetics, and in property values.",
              attr: 'Community development principle — Afrihood',
            },
            {
              icon: '💼',
              title: 'Local Employment Creation',
              quote: 'Every Afrihood development creates direct construction jobs, and sustained employment through in-community security, maintenance, and management — with a preference for hiring from the host community first.',
              attr: 'Workforce commitment — Afrihood',
            },
            {
              icon: '🌿',
              title: 'Environmental Baseline',
              quote: "We don't build and leave. Every court includes functional green spaces, waste sorting infrastructure, and solar-supplemented power. Living standards must include the environment — not trade off against it.",
              attr: 'Sustainability pillar — Afrihood',
            },
          ].map((item) => (
            <div key={item.title} className={s.impactCard}>
              <div className={s.impactIcon}>{item.icon}</div>
              <div className={s.impactQuoteMark}>&ldquo;</div>
              <p className={s.impactQuote}>{item.quote}</p>
              <div className={s.impactAttr}>{item.attr}</div>
              <h3 className={s.impactTitle}>{item.title}</h3>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── News & Insights ───────────────────────────────────────────────────────────
function NewsSection() {
  const articles = [
    {
      img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80',
      cat: 'Market Analysis',
      date: 'June 2025',
      title: 'Why Lagos Real Estate Is Commanding a Price Premium in 2025',
      desc: 'Diaspora demand, infrastructure investment, and a persistent formal housing deficit have driven Lagos residential prices to multi-year highs. We examine what this means for investors entering now.',
      mins: '6 min read',
    },
    {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      cat: 'Infrastructure & Development',
      date: 'May 2025',
      title: 'Waste-to-Energy Systems: The Infrastructure Advantage for Modern African Estates',
      desc: 'Modern African residential communities that integrate waste-to-energy systems don\'t just solve a utility problem — they create a measurable quality-of-life advantage that sustains long-term property values.',
      mins: '5 min read',
    },
    {
      img: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&w=600&q=80',
      cat: 'Investment Insight',
      date: 'April 2025',
      title: 'Foreign Capital and African Real Estate: What 2025 Deal Flow Tells Us',
      desc: 'International institutional capital is finding its way into African real estate at an accelerating pace. We break down where it is going, what structures it prefers, and what local developers need to offer.',
      mins: '7 min read',
    },
  ];
  return (
    <section className={`${s.section} ${s.sectionAlt}`} id="insights">
      <Reveal>
        <Label>Market Intelligence</Label>
        <Headline>News, Analysis &amp;<br/>Market Insights</Headline>
        <div className={s.newsGrid}>
          {articles.map((a) => (
            <div key={a.title} className={s.newsCard}>
              <div className={s.newsImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt={a.title} className={s.newsImage} loading="lazy" />
                <span className={s.newsCat}>{a.cat}</span>
              </div>
              <div className={s.newsBody}>
                <div className={s.newsMeta}>{a.date} · {a.mins}</div>
                <h3 className={s.newsTitle}>{a.title}</h3>
                <p className={s.newsDesc}>{a.desc}</p>
                <a href="https://afrihood.com/insight" className={s.goldLink}>Read article →</a>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AfriPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PartnersBar />
        <InvestSection />
        <HowToAcquireSection />
        <ProjectsSection />
        <InfrastructureSection />
        <AboutSection />
        <NumbersSection />
        <PhilosophySection />
        <ReturnsSection />
        <ImpactSection />
        <PartnersSection />
        <WhySection />
        <TeamSection />
        <NewsSection />
        <CtaBanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
