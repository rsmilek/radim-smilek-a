import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SOCIAL_ICONS } from '../../shared/icons/icons';

interface SocialLink {
  key: string;
  icon: SafeHtml;
  href: string;
  label: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <section class="resume-section" id="contact" @contactAnim>
      <div class="section-inner">
        <div class="article-title">Contact Me</div>
        <div class="contact-cols">
          <div class="contact-left">
            <p class="article-paragraph">
              I am interested in freelance opportunities — especially ambitious or large projects.
              However, if you have other requests or questions, do not hesitate to contact me
              using the form either.
            </p>
            <div class="social-row">
              @for (link of socialLinks; track link.key) {
                <a
                  class="social-icon"
                  [href]="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="link.label"
                  [innerHTML]="link.icon"
                ></a>
              }
            </div>
          </div>

          <form
            class="contact-form"
            action="https://sendmail.w3layouts.com/SubmitContactForm"
            method="post"
          >
            <input class="form-input" type="text" name="w3lName" placeholder="Name" />
            <input class="form-input" type="email" name="w3lSender" placeholder="Email" />
            <input class="form-input" type="text" name="w3lSubject" placeholder="Subject" />
            <textarea class="form-input" name="w3lMessage" placeholder="Message" rows="4"></textarea>
            <div class="form-actions">
              <button type="submit" class="submit-btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }

      .contact-cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }

      @media (max-width: 700px) {
        .contact-cols { grid-template-columns: 1fr; }
      }

      .social-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .social-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--mat-sys-surface-variant);
        color: var(--mat-sys-on-surface);
        transition: background 0.2s;

        &:hover { background: var(--mat-sys-primary-container); }

        ::ng-deep svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .form-input {
        padding: 0.6rem 0.75rem;
        border: 1px solid var(--mat-sys-outline);
        border-radius: 4px;
        background: var(--mat-sys-surface);
        color: var(--mat-sys-on-surface);
        font-size: 0.95rem;
        font-family: inherit;
        resize: vertical;

        &:focus {
          outline: 2px solid var(--mat-sys-primary);
          outline-offset: 1px;
        }
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
      }

      .submit-btn {
        padding: 0.65rem 2rem;
        background: var(--mat-sys-primary);
        color: var(--mat-sys-on-primary);
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover { opacity: 0.9; }
      }
    `,
  ],
})
export class ContactComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly socialLinks: SocialLink[] = [
    {
      key: 'email',
      icon: this.sanitizer.bypassSecurityTrustHtml(SOCIAL_ICONS['email']),
      href: 'mailto:smilek.radim@gmail.com',
      label: 'Email',
    },
    {
      key: 'linkedin',
      icon: this.sanitizer.bypassSecurityTrustHtml(SOCIAL_ICONS['linkedin']),
      href: 'https://www.linkedin.com/in/smilekradim/',
      label: 'LinkedIn',
    },
    {
      key: 'github',
      icon: this.sanitizer.bypassSecurityTrustHtml(SOCIAL_ICONS['github']),
      href: 'https://github.com/rsmilek',
      label: 'GitHub',
    },
    {
      key: 'facebook',
      icon: this.sanitizer.bypassSecurityTrustHtml(SOCIAL_ICONS['facebook']),
      href: 'https://www.facebook.com/radim.smilek',
      label: 'Facebook',
    },
    {
      key: 'instagram',
      icon: this.sanitizer.bypassSecurityTrustHtml(SOCIAL_ICONS['instagram']),
      href: 'https://www.instagram.com/smilek.radim/',
      label: 'Instagram',
    },
  ];
}
