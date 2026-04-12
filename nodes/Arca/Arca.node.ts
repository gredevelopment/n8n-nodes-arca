import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	userOperations,
	userFields,
	workspacesOperations,
	workspacesFields,
	foldersOperations,
	foldersFields,
	listsOperations,
	listsFields,
	tasksOperations,
	tasksFields,
	statusesOperations,
	statusesFields,
	labelsOperations,
	labelsFields,
	commentsOperations,
	commentsFields,
} from './resources';

import {
	getCurrentUser,
	listWorkspaces,
	getWorkspace,
	listWorkspaceMembers,
	listFolders,
	createFolder,
	updateFolder,
	deleteFolder,
	listLists,
	createList,
	updateList,
	deleteList,
	listTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
	listStatuses,
	createStatus,
	updateStatus,
	deleteStatus,
	listLabels,
	createLabel,
	updateLabel,
	deleteLabel,
	listComments,
	createComment,
} from './operations';

export class Arca implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Arca',
		name: 'arca',
		icon: 'fa:server',
		group: ['transform'],
		version: 1,
		subtitle:
			'={{"Resource: " + $parameter["resource"] + ", Operation: " + $parameter["operation"]}}',
		description:
			'Interact with the Arca API to manage users, workspaces, folders, lists, tasks, statuses, labels, and comments.',
		defaults: {
			name: 'Arca',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				displayName: 'Arca API Key',
				name: 'arcaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Comment', value: 'comment' },
					{ name: 'Folder', value: 'folder' },
					{ name: 'Label', value: 'label' },
					{ name: 'List', value: 'list' },
					{ name: 'Status', value: 'status' },
					{ name: 'Task', value: 'task' },
					{ name: 'User', value: 'user' },
					{ name: 'Workspace', value: 'workspace' },
				],
				default: 'user',
			},
			...userOperations,
			...workspacesOperations,
			...foldersOperations,
			...listsOperations,
			...tasksOperations,
			...statusesOperations,
			...labelsOperations,
			...commentsOperations,
			...userFields,
			...workspacesFields,
			...foldersFields,
			...listsFields,
			...tasksFields,
			...statusesFields,
			...labelsFields,
			...commentsFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				let result: INodeExecutionData;

				if (resource === 'user') {
					if (operation === 'getCurrentUser') {
						result = await getCurrentUser.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown user operation: ${operation}`);
					}
				} else if (resource === 'workspaces') {
					if (operation === 'listWorkspaces') {
						result = await listWorkspaces.call(this, i);
					} else if (operation === 'getWorkspace') {
						result = await getWorkspace.call(this, i);
					} else if (operation === 'listWorkspaceMembers') {
						result = await listWorkspaceMembers.call(this, i);
					} else {
						throw new NodeOperationError(
							this.getNode(),
							`Unknown workspaces operation: ${operation}`,
						);
					}
				} else if (resource === 'folders') {
					if (operation === 'listFolders') {
						result = await listFolders.call(this, i);
					} else if (operation === 'createFolder') {
						result = await createFolder.call(this, i);
					} else if (operation === 'updateFolder') {
						result = await updateFolder.call(this, i);
					} else if (operation === 'deleteFolder') {
						result = await deleteFolder.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown folders operation: ${operation}`);
					}
				} else if (resource === 'lists') {
					if (operation === 'listLists') {
						result = await listLists.call(this, i);
					} else if (operation === 'createList') {
						result = await createList.call(this, i);
					} else if (operation === 'updateList') {
						result = await updateList.call(this, i);
					} else if (operation === 'deleteList') {
						result = await deleteList.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown lists operation: ${operation}`);
					}
				} else if (resource === 'tasks') {
					if (operation === 'listTasks') {
						result = await listTasks.call(this, i);
					} else if (operation === 'getTask') {
						result = await getTask.call(this, i);
					} else if (operation === 'createTask') {
						result = await createTask.call(this, i);
					} else if (operation === 'updateTask') {
						result = await updateTask.call(this, i);
					} else if (operation === 'deleteTask') {
						result = await deleteTask.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown tasks operation: ${operation}`);
					}
				} else if (resource === 'statuses') {
					if (operation === 'listStatuses') {
						result = await listStatuses.call(this, i);
					} else if (operation === 'createStatus') {
						result = await createStatus.call(this, i);
					} else if (operation === 'updateStatus') {
						result = await updateStatus.call(this, i);
					} else if (operation === 'deleteStatus') {
						result = await deleteStatus.call(this, i);
					} else {
						throw new NodeOperationError(
							this.getNode(),
							`Unknown statuses operation: ${operation}`,
						);
					}
				} else if (resource === 'labels') {
					if (operation === 'listLabels') {
						result = await listLabels.call(this, i);
					} else if (operation === 'createLabel') {
						result = await createLabel.call(this, i);
					} else if (operation === 'updateLabel') {
						result = await updateLabel.call(this, i);
					} else if (operation === 'deleteLabel') {
						result = await deleteLabel.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown labels operation: ${operation}`);
					}
				} else if (resource === 'comments') {
					if (operation === 'listComments') {
						result = await listComments.call(this, i);
					} else if (operation === 'createComment') {
						result = await createComment.call(this, i);
					} else {
						throw new NodeOperationError(
							this.getNode(),
							`Unknown comments operation: ${operation}`,
						);
					}
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
				}

				returnData.push(result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
