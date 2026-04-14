import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';
import { baseUrl } from '../../baseUrl';

export async function listFolders(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;

	const options: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/workspaces/${workspaceId}/folders`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function createFolder(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const workspaceId = this.getNodeParameter('workspaceId', index) as number;
	const name = this.getNodeParameter('name', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		icon?: string;
		color?: string;
	};

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/folders`,
		json: true,
		body: {
			workspace_id: workspaceId,
			name,
		},
	};

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

export async function updateFolder(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const folderId = this.getNodeParameter('folderIdToModify', index) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as {
		name?: string;
		icon?: string;
		color?: string;
	};

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

	const options: IHttpRequestOptions = {
		method: 'PATCH',
		url: `${baseUrl}/folders/${folderId}`,
		json: true,
		body,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response,
		pairedItem: { item: index },
	};
}

export async function deleteFolder(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const folderId = this.getNodeParameter('folderIdToModify', index) as number;

	const options: IHttpRequestOptions = {
		method: 'DELETE',
		url: `${baseUrl}/folders/${folderId}`,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'arcaApi', options);

	return {
		json: response === '' || response === undefined ? { success: true } : response,
		pairedItem: { item: index },
	};
}
