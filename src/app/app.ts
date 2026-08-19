import { Component } from '@angular/core';
import { NavigationComponent } from './layout/navigation/navigation';
//import { HomeAngularComponent } from './features/home/home-angular';
import { HomeGsapComponent } from './features/home/home-gsap';
import { AboutMeComponent } from './features/about-me/about-me';
import { EducationComponent } from './features/education/education';
import { SkillsAngularComponent } from './features/skills/skills-angular';
import { PortfolioComponent } from './features/portfolio/portfolio';
import { ContactComponent } from './features/contact/contact';
import { SkillsGsapComponent } from "./features/skills/skills-gsap";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    //HomeAngularComponent,
    HomeGsapComponent,
    AboutMeComponent,
    EducationComponent,
    SkillsAngularComponent,
    SkillsGsapComponent,
    PortfolioComponent,
    ContactComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
