// Login Type
export type ILogin = {
	email: string;
	password: string;
};

export type IUpdateUser = {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	roleID?: number;
	isActive: boolean;
};

// Registration type
export type ISignup = {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
