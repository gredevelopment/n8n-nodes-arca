import { INodeProperties } from 'n8n-workflow';

export const tasksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Create Task',
				value: 'createTask',
				action: 'Create a new task',
				description: 'Create a new task in a list',
			},
			{
				name: 'Delete Task',
				value: 'deleteTask',
				action: 'Delete a task',
				description: 'Delete a task by ID',
			},
			{
				name: 'Get Task',
				value: 'getTask',
				action: 'Get a task',
				description: 'Get a task by ID',
			},
			{
				name: 'List Tasks',
				value: 'listTasks',
				action: 'List tasks in a workspace',
				description: 'List tasks in a workspace',
			},
			{
				name: 'Update Task',
				value: 'updateTask',
				action: 'Update an existing task',
				description: 'Update an existing task by ID',
			},
		],
		default: 'listTasks',
	},
];

export const tasksFields: INodeProperties[] = [
	{
		displayName: 'Workspace Name or ID',
		name: 'workspaceId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getWorkspaces',
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks', 'createTask', 'updateTask'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'number',
		default: undefined,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getTask', 'updateTask', 'deleteTask'],
			},
		},
		description: 'The numeric task ID',
	},
	{
		displayName: 'List Name or ID',
		name: 'listId',
		type: 'options',
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getLists',
			loadOptionsDependsOn: ['workspaceId'],
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks', 'createTask'],
			},
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask'],
			},
		},
		description: 'Task title',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Task description as HTML',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'string',
				default: '',
				description: 'Due date in ISO 8601 format',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'High', value: 'high' },
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'None', value: 'none' },
					{ name: 'Urgent', value: 'urgent' },
				],
				default: 'none',
				description: 'Task priority',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				default: '',
				description: 'Start date in ISO 8601 format',
			},
			{
				displayName: 'Status Name or ID',
				name: 'statusIdForTask',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getStatuses',
					loadOptionsDependsOn: ['workspaceId'],
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['updateTask'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Task description as HTML',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'string',
				default: '',
				description: 'Due date in ISO 8601 format',
			},
			{
				displayName: 'List Name or ID',
				name: 'listId',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getLists',
					loadOptionsDependsOn: ['workspaceId'],
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'High', value: 'high' },
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'None', value: 'none' },
					{ name: 'Urgent', value: 'urgent' },
				],
				default: 'none',
				description: 'Task priority',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				default: '',
				description: 'Start date in ISO 8601 format',
			},
			{
				displayName: 'Status Name or ID',
				name: 'statusIdForTask',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getStatuses',
					loadOptionsDependsOn: ['workspaceId'],
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
		],
	},

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks'],
			},
		},
		options: [
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: '',
				description: 'Page number for task listing',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
			},
		],
	},
];
