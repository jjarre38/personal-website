import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type Tab = 'About' | 'Projects' | 'Resume' | 'Contact'|'Extras';
interface Project {
  title: string;
  summary: string;
  url: string;
  tags?: string[];
}
interface Post {
  title: string;
  date: string;
  body: string[];       // one string per paragraph
  videoId?: string;     // optional YouTube video ID
}
interface PostView extends Post {
  videoUrl?: SafeResourceUrl;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
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
    title: '',
    date: '',
    body: [''],
  },
];

readonly posts: PostView[] = this.rawPosts.map((post) => ({
  ...post,
  videoUrl: post.videoId
    ? this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube-nocookie.com/embed/${post.videoId}`,
      )
    : undefined,
}));
  readonly tabs: Tab[] = ['About', 'Projects', 'Resume', 'Contact','Extras'];
  readonly activeTab = signal<Tab>('About');
  readonly projects: Project[] = [
  {
    title: 'Project One',
    summary: 'A short description of what it does and what you built it with.',
    url: 'https://github.com/your-username/project-one',
    tags: ['Angular', 'TypeScript'],
  },
  {
    title: 'Project Two',
    summary: 'Another short summary. Two or three sentences works well.',
    url: 'https://github.com/your-username/project-two',
    tags: ['Java', 'SQL'],
  },
  {
    title: 'Project Three',
    summary: 'Another short summary. Two or three sentences works well.',
    url: 'https://github.com/your-username/project-three',
    tags: ['Python'],
  },
];
  selectTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
  
}