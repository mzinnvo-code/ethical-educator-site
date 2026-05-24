# Newsletter Setup — The Sunday Dilemma

One-time configuration for the Buttondown-backed newsletter. ~10 minutes once you decide on a username.

## Why Buttondown

- Single-person friendly (no agency-tier minimums).
- Plain-text-friendly editor, no marketing tracking by default.
- Free for up to 100 subscribers — enough room to launch and prove the loop before any cost.
- HTML embed form works on static sites (we use the `embed-subscribe` URL pattern, not their JS widget, so there's no extra script load).
- Owned by their founder, not a private-equity rollup.

If you prefer Kit (ConvertKit), Beehiiv, or Substack, the swap is small — replace the URL in one constant and tweak the field name; the React components are platform-agnostic. Documented below.

## Setup

### 1. Create the Buttondown account

1. Go to https://buttondown.com and sign up.
2. Choose a username — this becomes part of your public URL (`buttondown.com/<username>`) and the subscribe endpoint.
3. Suggested: `examinedclassroom` (matches the brand and stays predictable). Confirm it's available.
4. Set your sender name to "Matthew A. Zinn" and reply-to to your real address.
5. Skip the paid plan; the free tier is fine until you cross 100 subscribers.

### 2. Wire the username into the site

Open `src/components/NewsletterSignup.jsx` at the repo root. Find:

```js
const BUTTONDOWN_USERNAME = "examinedclassroom";
const BUTTONDOWN_ENABLED = false;
```

The site is currently reserved for `examinedclassroom`, but submissions stay disabled while `BUTTONDOWN_ENABLED` is `false`. This prevents visitors from being sent to Buttondown before the publication exists. If you choose a different username, replace the string.

After the Buttondown publication is created and `https://buttondown.com/<username>` loads without a Not Found message, change:

```js
const BUTTONDOWN_ENABLED = true;
```

Save, commit, push.

Once the username is in place:
- The footer form, the `/newsletter` page, and the third-visit modal all start accepting submissions.
- Submissions POST to `https://buttondown.com/api/emails/embed-subscribe/<username>` in a popup window (so the user stays on our page).
- The user gets a confirmation email from Buttondown; once they click the confirm link, they're added to your list.

### 3. Verify it works

1. Visit the site in an incognito window.
2. Open footer → enter a test address → click Subscribe.
3. A popup opens to `buttondown.com/<username>`.
4. Check your test inbox for a Buttondown confirmation email.
5. Confirm; you should appear in your Buttondown subscriber list.

### 4. Set up the editorial cadence

The plan is one issue per week, Sunday 8am local time. Suggested structure (also documented on `/newsletter`):

1. **The Dilemma** — one thought experiment, link out to the site
2. **Try It Monday** — one printable teacher kit (PDF once Session 3 ships; for now, link the in-page teacher kit)
3. **Five-Minute Read** — one research finding, distilled
4. **From the Field** — one short reader quote (start curated, add reader submissions later)

Set up the schedule in Buttondown's compose UI; it has native scheduling.

## Tracking

Every newsletter submission fires:

```js
track("newsletter_signup_click", { placement })
```

Where `placement` is one of `footer`, `inline`, `modal`, or `landing`. Once the `examined-classroom-events` Worker is deployed (see `workers/events/README.md`), this lands in the `examined_classroom_events` dataset and you can query conversion rates by placement:

```sql
SELECT blob3 AS placement, SUM(_sample_interval) AS clicks
FROM examined_classroom_events
WHERE blob1 = 'newsletter_signup_click' AND timestamp > NOW() - INTERVAL '28' DAY
GROUP BY placement ORDER BY clicks DESC
```

That number tells you whether the modal is worth the friction (it usually is — modals convert 3–10x better than passive forms — but if it's annoying readers you'll see it in the bounce rate from Cloudflare Web Analytics).

## Tuning the modal

The third-visit trigger is hardcoded in `src/components/NewsletterModal.jsx`:

```js
const TRIGGER_AT_VISIT = 3;
```

Raise it (5, 7) if you think 3 is too eager; lower it (2) if you want to convert faster. Once a visitor dismisses the modal, it is suppressed permanently for that browser (via `localStorage`). A submitted form shows an in-page confirmation, but the modal is not permanently suppressed until dismissal because Buttondown confirmation happens outside the site.

To reset for testing: open DevTools → Application → Local Storage → clear the `examined-classroom:visits` and `examined-classroom:newsletterModalDismissed` keys, then `sessionStorage` `examined-classroom:newsletterModalShownSession`.

## Switching providers later

If you ever move off Buttondown, the only file to change is `src/components/NewsletterSignup.jsx`:

- `submitUrl()` returns the form action URL — adjust to your provider's embed endpoint.
- `profileUrl()` returns the URL the popup opens — adjust to your provider's confirmation page.
- The form's `<input name="email">` field stays; rename if your provider needs `EMAIL` (Mailchimp) or `email_address` (Kit).

That's it. The three variants, the modal trigger, the page, and the analytics all stay the same.
