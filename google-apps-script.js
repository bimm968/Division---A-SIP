/**
 * ====================================================================
 * Division A - SIP Placements Google Apps Script Web App
 * ====================================================================
 * 
 * SETUP INSTRUCTIONS (Takes ~2 minutes):
 * 1. Open Google Sheets (https://sheets.new) and create a new sheet.
 * 2. Name Row 1 headers:
 *    - Column A: Student Name
 *    - Column B: Company
 *    - Column C: Added By
 *    - Column D: Date & Time
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Delete any sample code in the editor, paste this entire file, and click Save (Ctrl+S).
 * 5. Click the blue "Deploy" button (top right) > "New deployment".
 * 6. Click the gear icon next to "Select type" > select "Web app".
 * 7. Configure:
 *    - Description: "SIP Placements Web App"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial so the web app can submit data)
 * 8. Click "Deploy", authorize access with your Google account.
 * 9. Copy the "Web app URL" (ends in /exec) and paste it into the admin.html setup or config.js!
 * 10. To publish the sheet for live reading on index.html:
 *     In your Google Sheet, click File > Share > Publish to web.
 *     Under "Link", select "Entire Document" (or Sheet1), and choose "Comma-separated values (.csv)".
 *     Click "Publish" and copy that CSV link into config.js / admin.html!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var name = (data.name || "").trim();
    var company = (data.company || "").trim();
    var addedBy = (data.addedBy || "").trim();
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    if (!name || !company) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "Candidate name and company are required." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append to Google Sheet: [Name, Company, Added By, Timestamp]
    sheet.appendRow([name, company, addedBy, timestamp]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Placement recorded successfully!",
        data: { name: name, company: company, addedBy: addedBy, timestamp: timestamp }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", data: values }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
