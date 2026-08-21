import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PulseDot } from "@/components/ui/PulseDot";
import { profile, socials, stats } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="top" className="border-b border-border-soft" style={{ scrollMarginTop: "80px" }}>
      <Container>
        <div className="grid min-h-[calc(100svh-68px)] grid-cols-1 items-center gap-10 py-[clamp(44px,7vw,86px)] min-[881px]:grid-cols-[1.24fr_0.76fr]">
          <div className="relative z-10">
            <Reveal eager className="mb-7 flex flex-col items-start gap-3 min-[520px]:flex-row min-[520px]:flex-wrap min-[520px]:items-center min-[520px]:gap-x-4 min-[520px]:gap-y-2">
              <span className="section-index">01 / INTRODUCTION</span>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border-soft bg-bg/70 px-3 py-2">
                <PulseDot />
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-2">
                  {profile.availability}
                </span>
              </span>
            </Reveal>

            <Reveal eager delay={70}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                {profile.fullName} / Full-stack &amp; AI engineer
              </p>
              <h1 className="m-0 max-w-[13ch] font-editorial text-[clamp(3.35rem,7.5vw,7.25rem)] font-normal leading-[0.88] tracking-[-0.05em] text-ink">
                {profile.headline.map((part, index) => (
                  <span key={index} className={part.accent ? "italic text-accent-ink" : undefined}>
                    {part.text}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal eager delay={140}>
              <p className="mt-7 max-w-[58ch] text-[clamp(1rem,1.45vw,1.15rem)] leading-[1.7] text-ink-2">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal eager delay={210} className="mt-8 flex flex-wrap gap-3">
              <Button href="/#projects" variant="accent">Explore selected projects →</Button>
              <Button href={profile.resumeHref} variant="outline">View résumé ↗</Button>
              <Button href="/#contact" variant="outline">Start a conversation</Button>
            </Reveal>

            <Reveal eager delay={260} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 transition-colors hover:text-accent-ink"
                >
                  {social.label} ↗
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal eager delay={120}>
            <figure className="relative mx-auto w-full max-w-[430px] min-[881px]:ml-auto">
              <div className="absolute -inset-4 border border-border-soft" aria-hidden />
              <div className="relative aspect-[3/4] overflow-hidden bg-surface shadow-card">
                <Image
                  src="/portrait-hero.jpg"
                  alt={`Portrait of ${profile.fullName}`}
                  fill
                  sizes="(max-width: 880px) 88vw, 430px"
                  className="object-cover object-[center_34%] saturate-[0.82]"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0d12]/85 to-transparent px-5 pb-5 pt-24 text-[#f4f1e9]">
                  <p className="m-0 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">Currently</p>
                  <p className="mt-2 text-[13px] leading-[1.5]">AI Engineer at Apnea Dynamics<br />Full-Stack Lead at MedSync</p>
                </div>
              </div>
              <figcaption className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.09em] text-ink-3">
                <span>{profile.location}</span>
                <span>UTC +08:00</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal eager delay={280} className="col-span-full mt-2 border-y border-border-soft">
            <div className="grid grid-cols-2 min-[721px]:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-4 py-5 min-[721px]:px-6 ${index % 2 ? "border-l border-border-soft" : ""} ${index > 1 ? "border-t border-border-soft min-[721px]:border-t-0" : ""} ${index === 2 ? "min-[721px]:border-l" : ""}`}
                >
                  <div className="font-editorial text-[clamp(1.8rem,3vw,2.7rem)] leading-none text-ink">{stat.value}</div>
                  <div className="mt-2 max-w-[18ch] font-mono text-[10px] uppercase leading-[1.5] tracking-[0.07em] text-ink-3">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
