import { Injectable, signal, OnDestroy } from '@angular/core';

export type SectionId = 'home' | 'about-me' | 'skills' | 'portfolio' | 'contact';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService implements OnDestroy {
  readonly activeSection = signal<SectionId>('home');

  #observer: IntersectionObserver | null = null;
  #observed = new Set<Element>();

  observe(el: Element): void {
    if (!this.#observer) {
      this.#observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible.length > 0) {
            this.activeSection.set(visible[0].target.id as SectionId);
          }
        },
        { threshold: 0.3 },
      );
    }
    this.#observer.observe(el);
    this.#observed.add(el);
  }

  unobserve(el: Element): void {
    this.#observer?.unobserve(el);
    this.#observed.delete(el);
  }

  ngOnDestroy(): void {
    this.#observer?.disconnect();
  }
}
