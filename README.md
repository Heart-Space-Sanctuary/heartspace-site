# Heart Space Sanctuary website

The heartspacesanctuary.love site, rebuilt from the Wix version as plain HTML and CSS.
No build step, no database, nothing to pause. Hosted free on Cloudflare Pages.

## What's here

| File | What it is |
|---|---|
| `index.html` | Home |
| `guides.html` | Meet Our Founders (old Wix address `/team-4` redirects here) |
| `missions.html` | Village Haven mission and the first sanctuary (old `/single-project` redirects here) |
| `contact.html` | Contact form, address, email |
| `donate.html` | Donation page (shows the Zeffy form once it's linked) |
| `404.html` | Page-not-found |
| `assets/styles.css` | All colors, fonts, and layout. Colors are the variables at the top. |
| `assets/site.js` | **Settings** (Zeffy link, form key) plus the mobile menu and forms |
| `_redirects` | Keeps old Wix links and search results working |
| `scripts/localize-images.sh` | Copies images off Wix (run once before cancelling Wix) |

To change words, open the page's `.html` file and edit the text between the tags.
The header and footer are repeated in each page, so a menu change goes in all five files.

## Launch checklist

### 1. Put the code on GitHub
1. On github.com, create a free organization (e.g. `heartspacesanctuary`) under your account.
2. Create a repository in it named `heartspace-site`. Public is fine; nothing here is secret.
3. In a terminal in this folder:
   ```bash
   git remote add origin https://github.com/heartspacesanctuary/heartspace-site.git
   git push -u origin main
   ```

### 2. Deploy on Cloudflare Pages (free)
1. Sign up at dash.cloudflare.com with info@heartspacesanctuary.love.
2. Workers & Pages → Create → Pages → Connect to Git → pick `heartspace-site`.
3. Build settings: Framework preset **None**, build command **blank**, output directory **/**.
4. Deploy. You get a preview address like `heartspace-site.pages.dev`. Check every page there.

### 3. Hook up donations and forms
- **Donations:** in Zeffy, create (or open) the Heart Space Sanctuary general donation form.
  Paste its link into `donateUrl` in `assets/site.js`. For the form to appear on the
  Donate page itself, also paste the embed address into `donateEmbedUrl`.
- **Contact and email signup:** go to web3forms.com, enter info@heartspacesanctuary.love,
  and paste the access key they email you into `web3formsKey`. Until then, the forms open
  the visitor's own email app instead. (Free plan, no monthly cost.)
- Commit and push. Cloudflare redeploys in about a minute.

### 4. Move the domain (do this carefully: email depends on it)
1. **Before changing anything, write down every DNS record for heartspacesanctuary.love in Wix**,
   especially the **MX** and **TXT** records. Those carry the info@ email.
2. In Cloudflare: Add a site → `heartspacesanctuary.love` → Free plan. Cloudflare scans and
   imports existing records. Compare them against your list and add anything missing, MX and TXT
   above all.
3. In the Pages project: Custom domains → add `heartspacesanctuary.love` and `www.heartspacesanctuary.love`.
   Cloudflare replaces the old website records automatically; leave the email records alone.
4. In Wix's domain settings, change the nameservers to the two Cloudflare gives you.
   (If Wix won't allow that, transfer the domain out to Cloudflare Registrar instead.)
5. Wait for Cloudflare to show the domain as **Active** (minutes to a few hours), then send a test
   email to info@ and load the site on your phone.

### 5. Before cancelling Wix
1. Export the email subscriber list and contacts from Wix (Contacts → Export) and import them
   into Zeffy's contact list so no one is lost.
2. Run `bash scripts/localize-images.sh`, then commit and push, so the images live on your own host.
   (Right now the pages still load images from Wix's image server.)
3. If the info@ mailbox is billed through Wix, move that billing first, or email stops with the plan.

## What changed from the Wix site
- The Wix donation form is now a link to Zeffy (no fees, automatic receipts).
- The Wix forms send to info@ through Web3Forms.
- The Store page (empty on Wix) and member Log In were removed. Add a Printful Quick Store link to
  the menu when merch is ready.
- The custom Wix heading font is replaced by Cormorant Garamond (closest free match); body text keeps Alegreya Sans.
