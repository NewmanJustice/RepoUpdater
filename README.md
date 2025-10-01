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
2. Create one or more JSON config files with your repository details and place them in the `Repos` folder (see below for format).
3. Run the updater with:
   ```sh
   node update-repos.js
   ```
   The app will prompt you to select which config file to use from the `Repos` folder each time it runs.

## Global Installation
You can install this app globally to use the CLI command anywhere:

1. In your project directory, run:
   ```sh
   npm install -g .
   ```
2. Now you can run the updater from any directory with:
   ```sh
   repoupdater
   ```
   The app will prompt you to select a config file from the `Repos` folder in your current directory. Make sure to run the command from the directory containing your `Repos` folder and config files, or use absolute paths in your config files if running elsewhere.

## Usage
1. Create a JSON config file with your repositories and save it in the `Repos` folder, e.g.:
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
2. When you run the app, it will list all `.json` files in the `Repos` folder and prompt you to select one.
3. The app will prompt for authentication if needed and update each repository as configured.
4. At the end, a summary of errors (if any) and a completion message will be displayed.

## Example: Multiple Repositories for a Service
You can add multiple repositories to a single config file to build or update an overall service. Each object in the array represents a local repository to update from its remote. For example:

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

## Notes
- The app will overwrite local changes by hard resetting to the remote branch.
- Ensure you have the necessary permissions and credentials for private repositories.
- The branch to pull from can be configured per repository in the JSON file.
