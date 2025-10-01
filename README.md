# Repo Updater Terminal App

This Node.js terminal application updates multiple local git repositories by pulling from their remote branches, as specified in a JSON configuration file.

## Features
- Reads a JSON config file listing repositories, their local folder paths, remote URLs, and branches.
- Loops through each repository entry and updates the local repo.
- Supports authentication (SSH, HTTPS, or public). Prompts the user if authentication is needed.
- Sets the remote URL and branch as specified in the config.
- Fetches and hard resets the local branch to match the remote (overwriting local changes).
- Logs any errors per repository and displays a summary at the end.
- Shows a simple “completed” message when done.

## Installation
1. Ensure you have [Node.js](https://nodejs.org/) and [git](https://git-scm.com/) installed.
2. In your project directory, install dependencies:
   ```sh
   npm install
   ```

## Getting Started
1. Clone or download this repository to your local machine.
2. Create or edit the `repos.json` file with your repository details (see below).
3. Run the updater with:
   ```sh
   node update-repos.js
   ```

## Usage
1. Create a JSON config file with your repositories, e.g.:
   ```json
   [
     {
       "folder": "/path/to/local/repo1",
       "remoteUrl": "git@github.com:user/repo1.git",
       "branch": "main"
     },
     {
       "folder": "/path/to/local/repo2",
       "remoteUrl": "https://github.com/user/repo2.git",
       "branch": "master"
     }
   ]
   ```
2. Run the app in your terminal. It will prompt for authentication if needed and update each repository as configured.
3. At the end, a summary of errors (if any) and a completion message will be displayed.

## Notes
- The app will overwrite local changes by hard resetting to the remote branch.
- Ensure you have the necessary permissions and credentials for private repositories.
- The branch to pull from can be configured per repository in the JSON file.
