export interface SiteUpdate {
  date: string; // YYYY-MM-DD
  text: string;
}

export const siteUpdates: SiteUpdate[] = [
  { date: '2026-11-26', text: 'Site updates have their own rss link, website got a slightly revamp on the windows to represent more the Windows XP theme.' },
  { date: '2026-11-25', text: 'New blog article! Also I added my Letterboxd in the socials mini window ;P' },
  { date: '2026-11-19', text: 'Shop just got its own update, two new canvases have been added.' },
  { date: '2026-11-18', text: 'Art page got a revamp :P' },
  { date: '2026-11-17', text: 'Christmas theme is here! 🎄' },
  { date: '2026-11-04', text: 'New Clipboard page added ദ്ദി˙∇˙)ว' },
  { date: '2026-11-04', text: 'Added two new webrings! DS webring and the Smallweb Subway!' },
  { date: '2026-10-27', text: 'Yo! I got a Newgrounds account!' },
  { date: '2026-10-23', text: 'Added theme song in the main page, THANK YOU GREM FOR MAKING IT!' },
  { date: '2026-10-17', text: 'New game: Super Crazy Guitar Maniac Deluxe 4' },
  { date: '2026-10-16', text: '‼🧃🍎 A Latest Drawing section has been added in our index page.' },
  { date: '2026-10-15', text: '💿 Two new albums in the music page were added 💿 Plus, I decided to bring the guestbook to the front page too.' },
  { date: '2026-10-12', text: 'Separated the mp3 player into its own little window outside of the navigation column, due to a bug I faced with the bandcamp embed.' },
  { date: '2026-10-08', text: 'Small revamp on dark mode, Im pairing yellow to fit with the lamp in the background.' },
  { date: '2026-10-06', text: 'New article posted: "Why I switched to Linux"' },
  { date: '2026-10-04', text: 'Ive noticed all this time, we didnt have an about-me page. Now we do lolol' },
  { date: '2026-10-03', text: 'Posted some code snippets used on this site :>' },
  { date: '2026-09-29', text: 'Music got a new look 🌀 you can now select your music from the new music page! Did I mention that music keeps playing even when you switch pages? (°□°) ა🥬' },
  { date: '2026-09-23', text: 'Blog is here! YAAAAAAYYYY! More spending your time! Plus newsletter!' },
  { date: '2026-09-18', text: 'Commissions page is done and open woohoo :o' },
  { date: '2026-09-17', text: 'New game added: Metal Slug X!' },
  { date: '2026-09-05', text: 'Art gallery is finally open! Go Go Go!!' },
  { date: '2026-08-29', text: 'Guestbook is now availablee wheeeee' },
  { date: '2026-08-27', text: 'Added Paint!' },
  { date: '2026-08-26', text: 'We got games! Space Cadet Pinball and Spider Solitaire!!' },
  { date: '2026-08-25', text: 'Chat is now open! Leave your messages theeree' },
  { date: '2026-08-24', text: 'Yooo we got a status noowww' },
  { date: '2026-08-23', text: 'Added music, social media and friends!' },
  { date: '2026-08-22', text: 'Dark mode + layered day/night wallpaper added' },
  { date: '2026-08-21', text: 'Added art banners and maaany art components, will add more overtime teehee' },
  { date: '2026-08-18', text: 'Redesigned into a 3-column desktop layout' },
  { date: '2026-08-17', text: 'Deployed the website!' },
];

// Each update's anchor id on the home page (and its link in the feed)
export function withIds(updates: SiteUpdate[] = siteUpdates) {
  const seen: Record<string, number> = {};
  return updates.map((u) => {
    seen[u.date] = (seen[u.date] ?? 0) + 1;
    const id = `update-${u.date}${seen[u.date] > 1 ? `-${seen[u.date]}` : ''}`;
    return { ...u, id };
  });
}
