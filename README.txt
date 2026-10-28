ANDREW & YOUSTINA — WEDDING INVITATION
======================================

This is a custom static wedding invitation website. It is designed to be hosted free on GitHub Pages.

FILES
- index.html      Main invitation page
- style.css       Design and animations (burgundy + beige)
- script.js       Envelope opening, countdown, music control and map links
- images/couple.jpg   Replace this with a photo of the couple
- audio/music.mp3     Add the music file you choose here

HOW TO ADD PHOTOS
1. Put your favorite photo in the images folder.
2. Name it exactly: couple.jpg
3. To use a different filename, edit the image src in index.html.
You can also add separate photos for Andrew and Youstina later if desired.

HOW TO ADD MUSIC
1. Put a music file you are allowed to use in the audio folder.
2. Name it exactly: music.mp3
3. Music starts only after the visitor presses PLAY MUSIC (browsers generally block autoplay).

HOW TO ADD GOOGLE MAPS LINKS
1. Open script.js in a text editor.
2. Near the top, find:
   const CHURCH_MAP_URL = "";
   const HALL_MAP_URL = "";
3. Paste the church Google Maps link between the quotes on the first line.
4. Paste the Almasa Hall Google Maps link between the quotes on the second line.
Example:
const CHURCH_MAP_URL = "https://maps.app.goo.gl/your-church-link";
const HALL_MAP_URL = "https://maps.app.goo.gl/your-hall-link";

DATE AND TIME
The invitation is set for Saturday, 7 November 2026 at 3:00 PM Cairo time.
The countdown is based on this date.

PUBLISH FOR FREE WITH GITHUB PAGES
1. Sign in or create an account at https://github.com/
2. Create a new public repository, e.g. andrew-youstina-wedding
3. Upload all files and folders from this ZIP (keep the same folder structure).
4. In the repository, open Settings > Pages.
5. Under Build and deployment, choose "Deploy from a branch".
6. Select branch "main" and folder "/ (root)", then Save.
7. Wait for GitHub Pages to publish and use the generated site URL.
Official instructions: https://docs.github.com/en/pages/quickstart

NOTES
- Hosting can be free on GitHub Pages for eligible public repositories.
- A custom domain is optional and usually costs money; do not buy one if you want to keep this free.
- The Google Fonts used in the design require an internet connection. If fonts do not load, the page uses local fallback fonts.
- No RSVP form is included.
