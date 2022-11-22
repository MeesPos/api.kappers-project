import { Request, Response, NextFunction } from "express";

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json({
		hoi: true,
	});
};

export default { getIndex };
