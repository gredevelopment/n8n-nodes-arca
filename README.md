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

## Using as an AI Agent Tool

The Arca node is fully compatible with n8n AI agents and can be used as a tool in AI workflows. When connected to an AI agent, the node enables:

- **Task Management**: Create, update, and organize tasks through natural language
- **Label Management**: Update label names and colors dynamically
- **Workspace Organization**: Manage folders, lists, and statuses
- **Productivity Automation**: Let AI agents handle routine workspace operations

### Example: Update Label Tool

When used as an AI agent tool, you can ask the agent to:

- "Update the label 'Bug' to 'Critical Bug' with red color"
- "Change the color of label ID 5 to orange"
- "Rename the 'Tech Debt' label to 'Technical Improvements'"

The agent will automatically:

1. Select the correct resource (label)
2. Choose the update operation
3. Fill in the required parameters (label ID)
4. Apply optional fields (name, color) as needed

All operations support this natural language interface when the node is connected to an AI agent in your workflow.

## Usage Examples

### Example 1: List All Workspaces

This example shows how to retrieve all workspaces accessible with your Arca API credentials.

**Steps:**

1. Add the **Arca** node to your workflow
2. Configure your **Arca API** credentials (see Credentials section)
3. Select the following parameters:
   - **Resource**: Workspaces
   - **Operation**: List Workspaces
4. Execute the node

**Result:** The node returns a JSON array of all workspaces with their details (id, name, slug, description, created date, etc.).

### Example 2: Create a New Task

This example demonstrates creating a task in a specific workspace and list.

**Steps:**

1. Add the **Arca** node to your workflow
2. Configure your **Arca API** credentials
3. Select the following parameters:
   - **Resource**: Tasks
   - **Operation**: Create Task
   - **Workspace ID**: Select your target workspace from the dropdown
   - **Title**: Enter the task title (e.g., "Review Q1 metrics")
   - **List ID** (optional): Select a list to organize the task
   - **Description** (optional): Add task details
   - **Status ID** (optional): Set initial status
   - **Priority** (optional): Set priority (low, medium, high, urgent)
   - **Due Date** (optional): Set a deadline
4. Execute the node

**Result:** The node returns the newly created task object with all its properties including the assigned task ID.

### Example 3: Automated Webhook Processing

This example shows how to receive real-time notifications from Arca when tasks are updated.

**Steps:**

1. Add the **Arca Trigger** node to your workflow
2. Copy the webhook URL shown in the node
3. In your Arca workspace:
   - Go to **Settings → Webhooks**
   - Click **Add Webhook**
   - Paste the webhook URL from step 2
   - Select the events you want to receive (e.g., task.created, task.updated)
   - Optionally set an auth token for security
4. (Optional) If you set an auth token in Arca, enter the same token in the **Auth Token** field of the Arca Trigger node
5. Activate your workflow

**Result:** When a task event occurs in your Arca workspace, the workflow automatically triggers and processes the webhook payload. The trigger node outputs the event data including the event type, workspace info, user who triggered the event, and before/after states of the changed resource.

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
