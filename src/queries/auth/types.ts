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

//Sigup Type
export type ISignup = {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
};
