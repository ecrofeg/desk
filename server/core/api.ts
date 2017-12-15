import { Response } from 'express';

export const handleError = (response: Response, message: any) => {
	response.status(500);

	return response.json({
		error: {
			message: message,
			code: 500
		}
	});
};
