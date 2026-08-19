import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
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
          My hobbies are triathlon, long distance trail running, and walking with my dog.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }

      .profile-img {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        object-fit: cover;
        align-self: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class AboutMeComponent {}
