# Visit Tracking Data

This directory contains visit tracking data for the personal website.

## Files

- `visits.json` - Contains visit logs with IP addresses, timestamps, and location data
- `.gitkeep` - Ensures this directory is created when cloning the repository

## Privacy Notice

**⚠️ IMPORTANT: This directory is ignored by git to protect visitor privacy.**

The `visits.json` file contains:
- IP addresses of visitors
- Timestamps of visits
- User agent strings
- Location data (country, region, city)
- Referer information

This data is stored locally and is not shared in the repository to protect visitor privacy.

## Data Structure

```json
{
  "visits": [
    {
      "ip": "192.168.1.1",
      "timestamp": "2025-01-01T12:00:00.000Z",
      "userAgent": "Mozilla/5.0...",
      "location": {
        "country": "United States",
        "region": "California",
        "city": "San Francisco"
      },
      "referer": "https://google.com"
    }
  ],
  "uniqueIPs": ["192.168.1.1", "10.0.0.1"],
  "totalVisits": 10,
  "uniqueVisits": 2
}
```

## Security

- Data is stored locally only
- No data is transmitted to external services
- IP addresses are used only for unique visitor counting
- No personal information beyond IP and basic location is collected
