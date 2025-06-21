import { formatEvent } from "./event-formatter.js";

async function getUserEvents(username) {
	try {
		const response = await fetch(
			`https://api.github.com/users/${username}/events`
		);

		if (!response.ok) {
			return console.log("Failed to fetch user events.");
		}

		return await response.json();
	} catch (error) {
		console.log("An error occurred while fetching user events: " + error);
	}
}

async function displayGithubUserActivity(username) {
	const frames = ["-", "\\", "|", "/"];

	let i = 0;
	const loader = setInterval(() => {
		process.stdout.write(`\rFetching from github ${frames[i++]}`);
		i %= frames.length;
	}, 250);

	const data = await getUserEvents(username);

	if (data) {
		clearInterval(loader);
	}

	console.log();

	if (!data || data.length === 0) {
		console.log("====================================");
		console.log(`Github Activity for: ${username}`);
		console.log("====================================");
		console.log("No recent public activity found.");
		return;
	}

	console.log();
	console.log("====================================");
	console.log(`Github Activity for: ${username}`);
	console.log("====================================");

	if (data) {
		data.forEach((event) => {
			const message = formatEvent(event);
			const displayingMessage = `${message}, on \x1b[32m${new Date(
				event.created_at
			).toLocaleString()}\x1b[37m`;
			console.log(displayingMessage);
		});
	}
}

const params = process.argv.slice(2);
displayGithubUserActivity(params[0]);
