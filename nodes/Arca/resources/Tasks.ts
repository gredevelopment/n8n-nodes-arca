import { INodeProperties } from 'n8n-workflow';

export const tasksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create Task',
				value: 'createTask',
				action: 'Create a new task in a list',
				description: 'Create a new task in a list',
			},
			{
				name: 'Delete Task',
				value: 'deleteTask',
				action: 'Delete a task',
				description: 'Delete a task',
			},
			{
				name: 'Get Task',
				value: 'getTask',
				action: 'Return a single task by ID.',
				description: 'Return a single task by ID',
			},
			{
				name: 'List Tasks',
				value: 'listTasks',
				action: 'Return tasks in a workspace',
				description: 'Return tasks in a workspace',
			},
			{
				name: 'Update Task',
				value: 'updateTask',
				action: 'Update an existing task',
				description: 'Update an existing task',
			},
		],
		default: 'listTasks',
	},
];

export const tasksFields: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks', 'createTask'],
			},
		},
		description: 'Workspace ID for task operations',
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getTask', 'updateTask', 'deleteTask'],
			},
		},
		description: 'The numeric task ID',
	},
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks', 'createTask', 'updateTask'],
			},
		},
		description: 'List ID for task creation or filtering',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask', 'updateTask'],
			},
		},
		description: 'Task title',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask', 'updateTask'],
			},
		},
		description: 'Task description as HTML',
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
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask', 'updateTask'],
			},
		},
		description: 'Task priority',
	},
	{
		displayName: 'Status ID',
		name: 'statusIdForTask',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask', 'updateTask'],
			},
		},
		description: 'Status ID to assign to the task',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask', 'updateTask'],
			},
		},
		description: 'Due date in ISO 8601 format',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['createTask', 'updateTask'],
			},
		},
		description: 'Start date in ISO 8601 format',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks'],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['listTasks'],
			},
		},
		description: 'Max number of results to return',
	},
];
