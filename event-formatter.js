export function formatEvent(event) {
	const formatter = eventFormatters[event.type];
	return formatter ? formatter(event) : `- Unknown event type: ${event.type}`;
}

const eventFormatters = {
	CommitCommentEvent: formatCommitCommentEvent,
	CreateEvent: formatCreateEvent,
	DeleteEvent: formatDeleteEvent,
	ForkEvent: formatForkEvent,
	GollumEvent: formatGollumEvent,
	IssueCommentEvent: formatIssueCommentEvent,
	IssuesEvent: formatIssuesEvent,
	MemberEvent: formatMemberEvent,
	PublicEvent: formatPublicEvent,
	PullRequestEvent: formatPullRequestEvent,
	PullRequestReviewEvent: formatPullRequestReviewEvent,
	PullRequestReviewCommentEvent: formatPullRequestReviewCommentEvent,
	PullRequestReviewThreadEvent: formatPullRequestReviewThreadEvent,
	PushEvent: formatPushEvent,
	ReleaseEvent: formatReleaseEvent,
	SponsorshipEvent: formatSponsorshipEvent,
	WatchEvent: formatWatchEvent,
};

function formatCommitCommentEvent(event) {
	return `- ${capitalize(event.payload.action)} comment on commit ${
		event.payload.commit_id
	} in ${event.repo.name}`;
}

function formatCreateEvent(event) {
	return `- Created ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`;
}

function formatDeleteEvent(event) {
	return `- Deleted ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`;
}

function formatForkEvent(event) {
	return `- Forked ${event.repo.name} to ${event.payload.forkee.full_name}`;
}

function formatGollumEvent(event) {
	const pageActions = event.payload.pages
		.map((page) => `- ${page.action} page "${page.title}"`)
		.join("\n");

	return `- ${pageActions} in repository ${event.repo.name}`;
}

function formatIssueCommentEvent(event) {
	return `- ${capitalize(event.payload.action)} comment on issue #${
		event.payload.issue.number
	} in ${event.repo.name}`;
}

function formatIssuesEvent(event) {
	return `- ${capitalize(event.payload.action)} issue #${
		event.payload.issue.number
	} in ${event.repo.name}`;
}

function formatMemberEvent(event) {
	return `- ${capitalize(event.payload.action)} member ${
		event.payload.member.login
	} in ${event.repo.name}`;
}

function formatPublicEvent(event) {
	if (event.action === "publicized") {
		return `- Made the repository "${event.repo.name}" public.`;
	}
	return `- Made the repository "${event.repo.name}" private.`;
}

function formatPullRequestEvent(event) {
	return `- ${capitalize(event.payload.action)} pull request #${
		event.payload.pull_request.number
	} in ${event.repo.name}: "${event.payload.pull_request.title}"`;
}

function formatPullRequestReviewEvent(event) {
	return `- ${capitalize(event.payload.action)} review "${
		event.payload.review.body
	}" for pull request #${event.payload.pull_request.number} in ${
		event.repo.name
	}`;
}

function formatPullRequestReviewCommentEvent(event) {
	return `- ${capitalize(event.payload.action)} comment on pull request #${
		event.payload.pull_request.id
	} in ${event.repo.name}`;
}

function formatPullRequestReviewThreadEvent(event) {
	return `- ${capitalize(
		event.payload.action
	)} a review thread in pull request #${event.payload.pull_request.id} in ${
		event.repo.name
	}`;
}

function formatPushEvent(event) {
	return `- Pushed ${event.payload.size} commits to ${event.repo.name}`;
}

function formatReleaseEvent(event) {
	return `- ${capitalize(event.payload.action)} release "${
		event.payload.release.name
	}" (tag: ${event.payload.release.tag_name}) in ${event.repo.name}`;
}

function formatSponsorshipEvent(event) {
  return `- ${event.payload.action} sponsorship for tier "${event.payload.sponsorship.tier.description}" in ${event.repo.name}`;
}

function formatWatchEvent(event) {
	return `- Started watching ${event.repo.name}`;
}

function capitalize(str = "") {
	return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}
