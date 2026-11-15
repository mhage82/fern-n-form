# Fern And Form

A lightweight landing page for Fern And Form, built with plain HTML and CSS. There is no build step or dependency installation.

## Local preview

Open `index.html` in a browser, or serve this directory with any static HTTP server.

## Publish with Vercel

1. Push this repository to GitHub.
2. In Vercel, add a new project and import `mhage82/fern-n-form`. Use the default settings for a static site; no build command or output directory is required.
3. In the project's **Settings → Domains**, add both `fernnform.com` and `www.fernnform.com`. Choose the preferred primary domain and redirect the other to it.
4. In GoDaddy DNS, add the exact A, CNAME, or verification records shown by Vercel for each domain. Existing records with the same host may need to be changed; preserve unrelated records, especially email records. Allow time for DNS and the certificate to be provisioned.

Vercel's record values can differ by project; use the values shown in the dashboard. See [Vercel's custom domain guide](https://vercel.com/docs/domains/set-up-custom-domain).

## Contact details

The contact section links to the business email and Instagram profile. The Instagram QR image is stored at `assets/instagram-qr.jpg`.

The contact form submits to FormSubmit, which forwards inquiries to `ranamehdi@fernnform.com`. After deploying, submit a test through the live site, then open the FormSubmit activation email in that inbox and confirm it. Check the spam folder if it does not arrive. Submit a second test and verify it reaches the inbox, including a usable reply-to address. Until activation and delivery are confirmed, the form should not be relied on for inquiries. FormSubmit provides the confirmation page and spam protection.
