# n8n Nodes - Arca Integration

This repository contains an n8n community node for the Arca API, enabling management of users, workspaces, folders, lists, tasks, statuses, labels, and comments directly from n8n workflows.

[Arca](https://getarca.app/) is a task and workspace management platform built for teams that need structured workspaces and collaboration tools.

## Installation (self-hosted)

To install the Arca community node directly from the n8n Editor UI:

1. Open your n8n instance.
2. Go to Settings > Community Nodes.
3. Select Install.
4. Enter the npm package name: `n8n-nodes-arca`.
5. Agree to the risks of using community nodes and select Install.
6. The Arca node will appear in the workflow editor.

## Installation (n8n Cloud)

If you're using n8n Cloud:

1. Open the Canvas and nodes panel.
2. Search for `Arca` in the community node registry.
3. Click Install node to add the Arca integration.

## Resources and operations

This node supports the following Arca resources:

- User
- Workspaces
- Folders
- Lists
- Tasks
- Statuses
- Labels
- Comments

Available operations include listing, creating, updating, deleting, and fetching details for each supported resource.

## Credentials

To use the Arca node, configure your Arca API credentials in n8n:

1. Go to Settings > Credentials in n8n.
2. Click New Credential and select Arca API.
3. Enter your Arca API Key.
4. Save the credential.

## Documentation

- [Arca API Documentation](https://docs.getarca.app/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## Compatibility

This node targets n8n Community Node integration and is expected to work with n8n versions compatible with `n8n-workflow` 1.x.

## Troubleshooting

### Common issues

- Authentication errors
  - Verify your Arca API Key and ensure it has the required scopes.
- Missing resources
  - Confirm the workspace, list, folder, or task exists and the API user has access.
- Operation failures
  - Double-check the parameters and IDs passed to each operation.

### Getting help

If you need help, consult the Arca documentation or the n8n community node docs.
