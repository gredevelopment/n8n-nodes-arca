import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';
import { baseUrl } from '../../baseUrl';

export async function listLists(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
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

export async function createList(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		folderId?: number;
		icon?: string;
		color?: string;
	};
	const folderId = additionalFields.folderId as number | undefined;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/lists`,
		json: true,
		body: {
			workspace_id: workspaceId,
			name,
		},
	};

	if (folderId) {
		options.body.folder_id = folderId;
	}
	if (additionalFields.icon) {
		options.body.icon = additionalFields.icon;
	}
	if (additionalFields.color) {
		options.body.color = additionalFields.color;
	}

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function updateList(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const listId = this.getNodeParameter('listIdToModify', index) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		name?: string;
		folderId?: number;
		icon?: string;
		color?: string;
	};
	const folderId = additionalFields.folderId as number | undefined;

	const body: { [key: string]: any } = {};

	if (additionalFields.name) {
		body.name = additionalFields.name;
	}
	if (additionalFields.icon) {
		body.icon = additionalFields.icon;
	}
	if (additionalFields.color) {
		body.color = additionalFields.color;
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

export async function deleteList(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
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
