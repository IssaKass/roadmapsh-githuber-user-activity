# roadmapsh-githuber-user-activity

A simple command-line application to fetch and display recent GitHub activity for any public user using the GitHub REST API — without any external libraries or frameworks.

## Features

- Accepts a GitHub username as a CLI argument.
- Fetches recent public activity using the GitHub API.
- Displays formatted output of activity:
  - Pushed commits
  - Opened issues or pull requests
  - Starred repositories
  - And more...
- Handles invalid usernames and API errors gracefully.

## Usage

1. Clone the repository

```bash
git clone https://github.com/IssaKass/roadmapsh-githuber-user-activity
cd roadmap-github-user-activity
```

2. Run the application

```bash
node index.js <github-username>
```

Sample Output

```bash
Fetching from github \

====================================
Github Activity for: kamranahmedse
====================================
- Created comment on issue #8803 in kamranahmedse/developer-roadmap, on 6/20/2025, 8:31:24 PM
- Closed issue #8803 in kamranahmedse/developer-roadmap, on 6/20/2025, 8:31:23 PM
- Created comment on issue #8812 in kamranahmedse/developer-roadmap, on 6/20/2025, 8:29:11 PM
```

## API Reference

The tool fetches data from:

```
https://api.github.com/users/<username>/events
```

GitHub API Docs: [GitHub Events API](https://docs.github.com/en/rest/activity/events)

## Requirements

- Node.js v18+ (for native fetch() support)
- Internet connection

---

Sample solution for the [Github User Activity](https://roadmap.sh/projects/github-user-activity) challenge from [roadmap.sh](https://roadmap.sh).
