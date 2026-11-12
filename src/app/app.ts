import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgTemplateOutlet } from '@angular/common';

type Tab = 'About' | 'Projects' | 'Resume' | 'Contact'|'Extras';
interface Project {
  title: string;
  summary: string;
  url?: string;         // optional: leave out if there's no link yet
  tags?: string[];
}
interface Post {
  title: string;
  date: string;
  body: string[];       // one string per paragraph
  videoId?: string;     // optional YouTube video ID
  instagramId?: string; // optional Instagram post/reel code, e.g. 'C1a2B3c4D5e' from instagram.com/reel/C1a2B3c4D5e/
}
interface PostView extends Post {
  videoUrl?: SafeResourceUrl;
  instagramUrl?: SafeResourceUrl;
}

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // Extras tab switches the whole page into dark "gig poster" mode
  host: { '[class.gig-mode]': "activeTab() === 'Extras'" },
})

export class App {
  private readonly sanitizer = inject(DomSanitizer);

private readonly rawPosts: Post[] = [
  {
    title: 'Blog posts coming soon...',
    date: '',
    body: [
      '',
      '',
    ],
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title: 'Band performances',
    date: '10/25/2026',
    body: ['Performed at a Halloween show with my band Riot Underground'],
    videoId:'',
    instagramId: 'De77q4aCeEC',      // paste the Instagram reel/post code here
  },
];

readonly posts: PostView[] = this.rawPosts.map((post) => ({
  ...post,
  videoUrl: post.videoId
    ? this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube-nocookie.com/embed/${post.videoId}`,
      )
    : undefined,
  instagramUrl: post.instagramId
    ? this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.instagram.com/p/${encodeURIComponent(post.instagramId)}/embed`,
      )
    : undefined,
}));
  // Professional photo: put the image in the `public/` folder and set the file name here.
  // Until the file exists, your initials are shown instead.
  readonly profilePhoto = 'profile.jpg';
  readonly photoFailed = signal(false);

  // About section: each string is its own paragraph. Add, remove, or reorder freely.
  readonly about: string[] = [
    'My name is Jairon Jarrett and I am a senior at Kennesaw State University pursuing a BS in Computer Science with a minor in Mathematics.',
    "I serve as the Academic Chair of ColorStack @ KSU and am a member of the Software Acceleration Team, currently working on the club's website using Astro.",
    "Outside of class, I love to code, play guitar, work out, and watch UFC (every Saturday)!", "In the future, I hope to work as a software engineer at a company that" 
    +" does good in the world while pursuing higher education. In the end, I want to work in industry for a number of years before coming back to teach Computer Science or Mathematics.",
  ];

  readonly tabs: Tab[] = ['About', 'Projects', 'Resume', 'Contact','Extras'];
  readonly activeTab = signal<Tab>('About');
  // Projects you're actively working on (shown at the top of the Projects tab)
  readonly currentProjects: Project[] = [
    {
      title: 'SwAt @ KSU Website',
      summary: "Building the club's website with the Software Acceleration Team.",
      tags: ['Astro'],
    },
  ];

  // Finished projects
  readonly projects: Project[] = [
  {
    title: 'SpendSense - AI-Powered Bank Statement Analyzer',
    summary: 'SpendSense is a full-stack web app that turns a PDF bank statement into an interactive picture of your spending. Upload a Regions Bank statement and it extracts every transaction, uses the Claude API to sort them into categories, and displays the results in a dashboard with charts and summary stats. Built with Spring Boot, PostgreSQL, Angular, and Tailwind CSS, it includes JWT authentication and lets you correct miscategorized transactions, with those corrections logged as a feedback loop for improving accuracy. Along the way I learned how to design secure stateless auth, parse messy real-world PDFs, get reliable structured output from an LLM using schema validation and retries, and build an extensible architecture that can support more banks later.',
    url: 'https://github.com/jjarre38/spendsense',
    tags: ['Java', 'Spring Boot','Angular','PostgreSQL','Claude API','TypeScript'],
  },
  {
    title: 'HomePath - Eviction Process Help Tool',
    summary: 'HomePath is a free, bilingual web app built for the Social Good pathway to help Metro Atlanta renters facing eviction, a problem affecting roughly 142,000 filings across about 590,000 renter households, nearly 1 in 4. In about three minutes, with no account, SSN, or bank details required, users get a personalized action plan for today, before court, and the week ahead. The app also includes a resource directory for rental assistance and legal aid, plain-language Know Your Rights guidance, a payment plan calculator, housing and employment support, and a one-tap 2-1-1 link for immediate help. Its goal is to take someone from “I don’t know what to do” to “I know my next step.”',
    url: 'https://homepath-app.vercel.app/',
    tags: ['TypeScript','Hackathon'],
  },  
  {
    title: 'Supply Chain Warehouse Management API',
    summary: 'A RESTful API for Supply Chain and Warehouse Management built with Spring Boot. I wanted to learn about APIs, MVC Architecure, and Spring Boot so I took the time' 
    +' build this APi from the ground up.',
    url: 'https://github.com/jjarre38/SupplyChainWarehouseManagementAPI',
    tags: ['Java','Spring Boot','MySQL'],
  },
];
  selectTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
  
}