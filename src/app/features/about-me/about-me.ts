import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, group } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  animations: [
    trigger('sectionAnim', [
      transition(':enter', [
        group([
          query('.article-title', [
            style({ opacity: 0, transform: 'translateX(-40px)' }),
            animate('0.6s 0.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
          query('.article-paragraph', [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(120, [
              animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ]),
          query('.profile-img', [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            animate('0.7s 0.2s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
          ], { optional: true }),
        ]),
      ]),
    ]),
  ],
  template: `
    <section class="resume-section" id="about-me" @sectionAnim>
      <div class="section-inner">
        <div class="article-title">About Me</div>
        <img
          class="profile-img"
          src="/assets/images/profile.jpg"
          alt="Radim Smílek profile photo"
        />
        <p class="article-paragraph">
          I am a SW developer and architect with several years of experience in the field management
          of technological processes and processing of data obtained from them. I have worked mainly
          on desktop applications, but nowadays primarily on web and mobile applications.
        </p>
        <p class="article-paragraph mt-1">
          I am an independent, creative, purposeful person with a high workload deployment.
          I have always tried to be a useful member of the team working on the project,
          but with knowledge of the issue also manage it.
        </p>
        <p class="article-paragraph mt-1">
          For programming, I enjoy solving problems that occur in the real world in such a way that
          they are elegant, meaningful and logical on the inside and user-friendly and intuitive on
          the outside, but above all useful and effective for the given purpose.
        </p>
        <p class="article-paragraph mt-1">
          My hobbies are walking with dog and long distance trail running.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }

      .resume-section {
        min-height: 100dvh;
        display: flex;
        align-items: center;
        padding: 5rem 2rem 3rem;
      }

      .section-inner {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .article-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--mat-sys-primary);
        border-left: 4px solid var(--mat-sys-primary);
        padding-left: 0.75rem;
      }

      .profile-img {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        object-fit: cover;
        align-self: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      .article-paragraph {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--mat-sys-on-surface);
      }

      .mt-1 { margin-top: 0.5rem; }
    `,
  ],
})
export class AboutMeComponent {}
