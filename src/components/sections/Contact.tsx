import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PulseDot } from "@/components/ui/PulseDot";
import { LiveClock } from "@/components/ui/LiveClock";
import { buildMailto, profile, socials } from "@/data/portfolio";

export function Contact() {
  const linkedIn = socials.find((social) => social.label === "LinkedIn");
  return (
    <section id="contact" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div className="py-[clamp(64px,9vw,128px)]">
          <Reveal>
            <div className="relative overflow-hidden border border-border bg-surface px-[clamp(24px,6vw,76px)] py-[clamp(38px,7vw,82px)]">
              <span aria-hidden className="absolute -right-10 -top-16 font-editorial text-[clamp(10rem,24vw,23rem)] italic leading-none text-accent opacity-[0.07]">ZL</span>
              <div className="relative z-10 grid gap-12 min-[881px]:grid-cols-[1.35fr_0.65fr] min-[881px]:items-end">
                <div>
                  <Kicker index="05">Contact</Kicker>
                  <h2 className="m-0 max-w-[12ch] font-editorial text-[clamp(3rem,7vw,6.8rem)] font-normal leading-[0.9] tracking-[-0.045em] text-ink">Let&apos;s build something <em className="text-accent-ink">worth shipping.</em></h2>
                  <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.75] text-ink-2">Open to remote engineering roles and thoughtful collaborations. Share the problem you are solving and I usually reply within one working day.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={buildMailto()} variant="accent">Email me →</Button>
                    {linkedIn ? <Button href={linkedIn.href} variant="outline">LinkedIn ↗</Button> : null}
                    <Button href={profile.resumeHref} variant="outline">Résumé ↗</Button>
                  </div>
                </div>
                <div className="border-t border-border-soft pt-6 min-[881px]:border-l min-[881px]:border-t-0 min-[881px]:pl-8 min-[881px]:pt-0">
                  <div className="inline-flex items-center gap-2.5">
                    <PulseDot />
                    <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-ink-2">{profile.availability}</span>
                  </div>
                  <dl className="mt-7 grid gap-5">
                    <div><dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">Local time</dt><dd className="m-0 mt-1.5 font-editorial text-[1.35rem] text-ink"><LiveClock /></dd></div>
                    <div><dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">Location</dt><dd className="m-0 mt-1.5 font-editorial text-[1.35rem] text-ink">{profile.location}</dd></div>
                    <div><dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">Email</dt><dd className="m-0 mt-1.5 break-all text-[12px] text-ink-2">{profile.email}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
