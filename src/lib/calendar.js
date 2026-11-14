const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=6.48898%2C3.37827";

function icsDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function downloadCalendar() {
  const stamp = icsDate(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ijeoma Birthday Picnic//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:ijeoma-birthday-picnic-20261205@ijeoma.local",
    `DTSTAMP:${stamp}`,
    "DTSTART:20261205T123000Z",
    "DTEND:20261205T163000Z",
    "SUMMARY:Ijeoma's Birthday Picnic",
    "LOCATION:Jaekel House\\, Nigerian Railway Corporation Compound\\, Ebute Metta\\, Lagos\\, Nigeria",
    "DESCRIPTION:Join us for Ijeoma's birthday picnic. Arrive by 1:30 PM. Dress cutesy and comfortably, and bring something edible to share. Jaekel House\\, Nigerian Railway Corporation Compound\\, Ebute Metta\\, Lagos.",
    `URL:${MAP_URL}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ijeoma-birthday-picnic-05-12-2026.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}
