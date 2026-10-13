# Division A - SIP Placements Portal

This repository hosts the live placement celebration board and the coordinator administration console for **Division A**.

---

## 🌐 Pages & URLs

1. **Public Celebration Board**:
   - URL: `https://bimm968.github.io/Division---A-SIP/`
   - Shows placed students, percentage progress bar, latest placement highlight, and confetti animations.
   - Contains **no visible links or buttons** to the admin console.

2. **Hidden Admin Console**:
   - URL: `https://bimm968.github.io/Division---A-SIP/admin.html`
   - Hidden access portal for adding newly placed candidates.
   - Gated with individual authentication credentials.

---

## 🔐 Authorized Coordinators & Default Credentials

| Coordinator | Profile | Default PIN | Default Passcode |
| :--- | :--- | :--- | :--- |
| **Mitali Sachdev** | `MS` | `1234` | `mitali2026` |
| **Bimleshwar Prasad** | `BP` | `1234` | `bimlesh2026` |

> [!NOTE]
> All credentials are validated via browser SHA-256 cryptographic hashing.

---

## 📊 Connecting to Google Sheets (2-Minute Setup for Instant Live Updates)

To have newly submitted names appear on the public page without editing any code or making git commits:

1. **Create the Google Sheet**:
   - Go to [sheets.new](https://sheets.new).
   - Set Row 1 headers:
     - **Column A**: `Name`
     - **Column B**: `Company`
     - **Column C**: `Added By`
     - **Column D**: `Date & Time`

2. **Add the Web App Script**:
   - In Google Sheets, click **Extensions > Apps Script**.
   - Copy and paste the contents of [`google-apps-script.js`](./google-apps-script.js).
   - Click **Deploy > New deployment > Web app**.
   - Set **Execute as**: `Me` and **Who has access**: `Anyone`.
   - Copy the generated **Web app URL**.

3. **Publish CSV for Reading**:
   - In Google Sheets, click **File > Share > Publish to web**.
   - Select **Entire Document** and choose **Comma-separated values (.csv)**.
   - Click **Publish** and copy the CSV link.

4. **Connect the URLs**:
   - Open [`admin.html`](./admin.html) > Go to **Google Sheets Live Sync Configuration**.
   - Paste both URLs and click **Save Sync Settings** (or paste them in [`config.js`](./config.js)).
   - Done! Now, any submission immediately writes to Google Sheets, and the live public celebration board updates in real time!
