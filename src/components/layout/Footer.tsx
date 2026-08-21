import { profile, socials } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Brand } from "./Brand";
import { BackToTop } from "@/components/ui/BackToTop";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-soft bg-surface/60">
      <Container>
        <div className="grid gap-10 py-10 min-[721px]:grid-cols-[1fr_auto] min-[721px]:items-end">
          <div>
            <Brand size="md" />
            <p className="mt-5 max-w-[44ch] text-[13px] leading-[1.65] text-ink-3">{profile.footerBlurb}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 min-[721px]:justify-end">
            {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.09em] text-ink-3 transition-colors hover:text-accent-ink">{social.label} ↗</a>)}
            <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.09em] text-ink-3 transition-colors hover:text-accent-ink">Résumé ↗</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-soft py-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-3">© {year} {profile.fullName} · {profile.location}</span>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
