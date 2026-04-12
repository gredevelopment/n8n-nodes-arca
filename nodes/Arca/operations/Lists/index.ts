import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';

const baseUrl = 'https://api.getarca.app/api/v1';

export async function listLists(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/lists`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createList(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const folderId = this.getNodeParameter('folderId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const icon = this.getNodeParameter('icon', index) as string;
	const color = this.getNodeParameter('color', index) as string;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/lists`,
		json: true,
		body: {
			workspace_id: workspaceId,
			folder_id: folderId,
			name,
		},
	};

	if (icon) {
		options.body.icon = icon;
	}
	if (color) {
		options.body.color = color;
	}

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function updateList(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const listId = this.getNodeParameter('listIdToModify', index) as number;
	const folderId = this.getNodeParameter('folderId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const icon = this.getNodeParameter('icon', index) as string;
	const color = this.getNodeParameter('color', index) as string;

	const body: { [key: string]: any } = {};

	if (name) {
		body.name = name;
	}
	if (icon) {
		body.icon = icon;
	}
	if (color) {
		body.color = color;
	}
	if (folderId) {
		body.folder_id = folderId;
	}

	const options: IHttpRequestOptions = {
		method: 'PATCH',
		url: `${baseUrl}/lists/${listId}`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function deleteList(this: IExecuteFunctions, index: number): Promise<INodeExecutionData> {
	const listId = this.getNodeParameter('listIdToModify', index) as number;

	const options: IHttpRequestOptions = {
		method: 'DELETE',
		url: `${baseUrl}/lists/${listId}`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response === '' || response === undefined ? { success: true } : response,
		pairedItem: { item: index },
	};
}
